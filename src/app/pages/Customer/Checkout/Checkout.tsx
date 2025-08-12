import React, { useEffect, useState } from "react";
import {
  Button,
  Steps,
  Form,
  Input,
  Select,
  Checkbox,
  Space,
  message,
  Card,
  Radio,
  Divider,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../../services/orderService";
import { useAuth } from "../../../context/AuthContext";
import { paymentService, PaymentData } from "../../../services/paymentService";
import { Timestamp } from "firebase/firestore";

const { Option } = Select;

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [form] = Form.useForm();
  const { user, userData, loading: authLoading } = useAuth();
  const [orderPlacedSuccessfully, setOrderPlacedSuccessfully] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("cod");

  console.log(
    "CheckoutPage - Initial Render: currentStep",
    currentStep,
    "selectedPaymentMethod",
    selectedPaymentMethod
  );

  useEffect(() => {
    console.log("CheckoutPage - useEffect: user", user, "userData", userData);
    if (user && userData) {
      form.setFieldsValue({
        fullName: `${userData.firstName || ""} ${
          userData.lastName || ""
        }`.trim(),
        phone: userData.phone || "",
        address: userData.address || "",
      });
      console.log(
        "CheckoutPage - Form fields set in useEffect:",
        form.getFieldsValue()
      );
    }
  }, [user, userData, form]);

  const onNext = async () => {
    console.log("onNext called. currentStep before validation:", currentStep);
    try {
      if (currentStep === 0) {
        await form.validateFields(["fullName", "phone", "address", "note"]);
        setCurrentStep(currentStep + 1); // Move to next step (step 1)
        console.log("onNext: Moved to step 1");
      } else if (currentStep === 1) {
        await form.validateFields(["paymentMethod"]);
        const values = form.getFieldsValue();
        setSelectedPaymentMethod(values.paymentMethod);
        console.log(
          "onNext: Validated payment method, selected:",
          values.paymentMethod
        );
        // IMPORTANT: Do NOT advance step here. onFinish will handle final step advancement.
      }
    } catch (info) {
      console.error("CheckoutPage - Validate Failed in onNext:", info);
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
    }
  };

  const onPrev = () => {
    console.log("onPrev called. currentStep before decrement:", currentStep);
    setCurrentStep(currentStep - 1);
    console.log("onPrev: Moved to step", currentStep - 1);
  };

  const onFinish = async (values: any) => {
    console.log(
      "onFinish called. All form values:",
      values,
      "currentStep:",
      currentStep
    );

    if (!user || !user.uid) {
      message.error("Vui lòng đăng nhập để đặt hàng.");
      setOrderPlacedSuccessfully(false);
      setCurrentStep(steps.length - 1);
      console.log("onFinish: User not logged in.");
      return;
    }

    if (cartItems.length === 0) {
      message.error("Giỏ hàng của bạn đang trống.");
      setOrderPlacedSuccessfully(false);
      setCurrentStep(steps.length - 1);
      console.log("onFinish: Cart is empty.");
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        customerInfo: {
          fullName: values.fullName,
          phone: values.phone,
          address: values.address,
          note: values.note,
        },
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          productTitle: item.productTitle,
          productImage: item.productImage,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: totalPrice,
        paymentMethod: values.paymentMethod,
      };

      console.log("onFinish: Attempting to add order with data:", orderData);
      const orderId = await orderService.addOrder(orderData as any); // Get the ID of the newly added order
      console.log("onFinish: Order added successfully with ID:", orderId);

      // If payment method is bank transfer, save payment details to payments collection
      if (values.paymentMethod === "bank_transfer") {
        console.log(
          "onFinish: Payment method is bank_transfer. Preparing payment details."
        );
        const paymentDetails: PaymentData = {
          id: "", // This will be set by Firestore
          orderId: orderId,
          amount: totalPrice,
          status: "pending",
          paymentDate: Timestamp.now(),
          customerInfo: {
            fullName: values.fullName,
            phone: values.phone,
            email: userData?.email || "", // Assuming email is available in userData
            address: values.address,
          },
          bankName: "MB Bank",
          accountNumber: "07072972779",
          accountName: "CÔNG TY TNHH COFFEE INCENSE (Hoanvngoc)",
          transferContent: `${values.fullName} - ${values.phone} - Thanh toán đơn hàng`,
        };
        console.log(
          "onFinish: Attempting to add payment with data:",
          paymentDetails
        );
        await paymentService.addPayment(paymentDetails);
        console.log("onFinish: Payment details added successfully.");
      }

      message.success("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
      clearCart();
      setOrderPlacedSuccessfully(true);
      setCurrentStep(steps.length - 1);
      console.log("onFinish: Order placed successfully. Moving to final step.");
    } catch (error) {
      console.error("onFinish: Error placing order:", error);
      message.error("Đặt hàng thất bại. Vui lòng thử lại.");
      setOrderPlacedSuccessfully(false);
      setCurrentStep(steps.length - 1);
      console.log("onFinish: Order placement failed. Moving to final step.");
    }
  };

  const steps = [
    {
      title: "Thông tin giao hàng",
      icon: <HomeOutlined />,
      content: null,
    },
    {
      title: "Xác nhận đơn hàng",
      icon: <ShoppingCartOutlined />,
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#2D2424]">
            Thông tin đơn hàng của bạn:
          </h3>
          <Card className="mb-4 shadow-sm border-0">
            <h4 className="font-bold mb-2 text-[#8B7156]">Sản phẩm:</h4>
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-[#2D2424]">
                  {item.productTitle} x {item.quantity}
                </span>
                <span className="font-medium text-[#8B7156]">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </span>
              </div>
            ))}
            <Divider className="my-3" />
            <div className="flex justify-between items-center text-lg font-bold text-[#2D2424]">
              <span>Tổng cộng:</span>
              <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
            </div>
          </Card>
          <h3 className="text-xl font-semibold mb-4 text-[#2D2424]">
            Phương thức thanh toán:
          </h3>
        </div>
      ),
    },
    {
      title: "Hoàn tất",
      icon: <DollarCircleOutlined />,
      content: (
        <div className="text-center py-10">
          {orderPlacedSuccessfully ? (
            <>
              <h3 className="text-2xl font-bold text-[#2D2424] mb-4">
                Cảm ơn bạn đã đặt hàng!
              </h3>
              <p className="text-gray-700 mb-6">
                Đơn hàng của bạn đã được tiếp nhận và đang chờ xử lý.
              </p>
              <Button
                type="primary"
                size="large"
                className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C]"
                onClick={() => navigate("/")}
              >
                Quay về trang chủ
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                Đặt hàng thất bại!
              </h3>
              <p className="text-gray-700 mb-6">
                Đã có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại.
              </p>
              <Button
                type="primary"
                size="large"
                className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C]"
                onClick={() => setCurrentStep(0)}
              >
                Thử lại
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const isSubmitDisabled =
    authLoading || !user || !userData || cartItems.length === 0;

  return (
    <div className="min-h-screen bg-[#F9F2EA] py-10 pt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <h1 className="text-4xl font-bold text-center text-[#2D2424] mb-8">
          Thanh toán
        </h1>
        <Card className="shadow-lg rounded-xl p-6">
          <Steps
            current={currentStep}
            items={steps.map((step) => ({
              title: step.title,
              icon: step.icon,
            }))}
            className="mb-8"
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ paymentMethod: "cod" }}
          >
            <div className="steps-content min-h-[300px]">
              <div
                style={{ display: currentStep === 0 ? "block" : "none" }}
                className="grid grid-cols-1 gap-4"
              >
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên của bạn!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Nguyễn Văn A"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại của bạn!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="09xx xxx xxx" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ của bạn!",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={2}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  />
                </Form.Item>
                <Form.Item
                  name="note"
                  label="Ghi chú (tùy chọn)"
                  initialValue="Giao hàng giờ hành chính"
                >
                  <Input.TextArea
                    rows={1}
                    placeholder="Ví dụ: Giao hàng giờ hành chính"
                  />
                </Form.Item>
              </div>

              <div style={{ display: currentStep === 1 ? "block" : "none" }}>
                {steps[1].content}
                <Form.Item
                  name="paymentMethod"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương thức thanh toán!",
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    value={selectedPaymentMethod}
                  >
                    <Space direction="vertical">
                      <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                      <Radio value="bank_transfer">
                        Chuyển khoản ngân hàng
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                {selectedPaymentMethod === "bank_transfer" && (
                  <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <h4 className="font-bold mb-2 text-[#2D2424]">
                      Thông tin chuyển khoản:
                    </h4>
                    <p className="mb-1">Ngân hàng: MB Bank</p>
                    <p className="mb-1">Số tài khoản: 07072972779 </p>
                    <p className="mb-1">
                      Tên tài khoản: CÔNG TY TNHH COFFEE INCENSE (Hoanvngoc){" "}
                    </p>
                    <p className="mb-1">
                      Nội dung chuyển khoản: [Tên của bạn] - [Số điện thoại] -
                      Thanh toán đơn hàng
                    </p>
                    <img
                      src="https://i.postimg.cc/fy4PkRsf/QR.jpg"
                      alt="QR Code"
                      className="w-48 h-48 mx-auto mt-4"
                    />
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Vui lòng chuyển khoản và nhấn "Hoàn tất đơn hàng" để xác
                      nhận.
                    </p>
                  </div>
                )}
              </div>

              <div style={{ display: currentStep === 2 ? "block" : "none" }}>
                {steps[2].content}
              </div>
            </div>

            <div className="steps-action text-right mt-6">
              {currentStep < steps.length - 1 && (
                <>
                  {currentStep === 0 && (
                    <Button
                      type="primary"
                      className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C]"
                      onClick={onNext} // Calls onNext to validate and move to step 1
                    >
                      Tiếp theo
                    </Button>
                  )}
                  {currentStep === 1 &&
                    selectedPaymentMethod !== "bank_transfer" && (
                      <Button
                        type="primary"
                        className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C]"
                        htmlType="submit" // This will trigger the onFinish of the Form
                        disabled={false}
                      >
                        Xác nhận và đặt hàng
                      </Button>
                    )}
                  {currentStep === 1 &&
                    selectedPaymentMethod === "bank_transfer" && (
                      <Button
                        type="primary"
                        className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C] ml-3"
                        htmlType="submit" // This will also trigger the onFinish of the Form
                        disabled={false}
                      >
                        Hoàn tất đơn hàng
                      </Button>
                    )}
                </>
              )}
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <Button style={{ margin: "0 8px" }} onClick={onPrev}>
                  Quay lại
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C]"
                  onClick={() => navigate("/")}
                >
                  Quay về trang chủ
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
