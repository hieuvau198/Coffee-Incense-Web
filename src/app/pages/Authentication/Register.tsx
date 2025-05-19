import React, { useState } from "react";
import { Button, Form, Input, Checkbox, Modal } from "antd";
import { Link } from "react-router";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            filter: "brightness(0.8)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/70 to-amber-900/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6 text-center">Bắt đầu hành trình tái chế</h1>
          <p className="text-xl mb-8 text-center max-w-md">
            Tạo tài khoản để khám phá và góp phần vào việc tái chế bã cà phê thành những sản phẩm hương thơm giá trị.
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg max-w-md">
            <p className="text-lg">
              "Mỗi làn khói hương từ bã cà phê tái chế là một lần chúng ta góp phần bảo vệ môi trường."
            </p>
            <p className="text-right mt-2 font-light">- Eco Incense</p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-y-auto max-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img 
            src="/src/assets/images/logo.png" 
            alt="Eco Brew Cycle Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng Ký Tài Khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-amber-700 hover:text-amber-600">
              đăng nhập
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              form={form}
              name="register"
              layout="vertical"
              scrollToFirstError
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ của bạn!",
                    },
                  ]}
                >
                  <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Họ" 
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên của bạn!",
                    },
                  ]}
                >
                  <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Tên" 
                    size="large"
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email" 
                  size="large"
                />
              </Form.Item>
              
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Số điện thoại" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu của bạn!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu của bạn!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu bạn nhập không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Xác nhận mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Vui lòng đồng ý với điều khoản và điều kiện!")
                          ),
                  },
                ]}
              >
                <Checkbox>
                  Tôi đã đọc và đồng ý với{" "}
                  <a 
                    href="#" 
                    className="text-amber-700 hover:text-amber-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                  >
                    điều khoản và điều kiện
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-5 bg-amber-700 hover:bg-amber-800"
                  size="large"
                >
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Modal cho điều khoản và điều kiện */}
      <Modal
        title="Điều khoản và Điều kiện"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Đóng
          </Button>,
          <Button 
            key="accept" 
            type="primary" 
            className="bg-amber-700 hover:bg-amber-800"
            onClick={() => {
              form.setFieldsValue({ agreement: true });
              setIsModalOpen(false);
            }}
          >
            Tôi đồng ý
          </Button>
        ]}
        width={800}
      >
        <div className="max-h-96 overflow-y-auto py-4">
          <h3 className="text-lg font-medium mb-4">Điều khoản sử dụng dịch vụ Eco Brew Cycle</h3>
          
          <h4 className="font-medium mt-4 mb-2">1. Giới thiệu</h4>
          <p>Chào mừng bạn đến với Eco Brew Cycle - dịch vụ cung cấp các sản phẩm nhang và hương thơm từ bã cà phê tái chế. Bằng việc truy cập và sử dụng trang web của chúng tôi, bạn đồng ý tuân theo các điều khoản và điều kiện được nêu dưới đây.</p>
          
          <h4 className="font-medium mt-4 mb-2">2. Tài khoản</h4>
          <p>Khi bạn tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. Bạn chịu trách nhiệm bảo mật tài khoản của mình, bao gồm mật khẩu, và tất cả hoạt động diễn ra thông qua tài khoản của bạn.</p>
          
          <h4 className="font-medium mt-4 mb-2">3. Quyền riêng tư</h4>
          <p>Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân mà bạn chia sẻ với chúng tôi. Vui lòng xem Chính sách Quyền riêng tư của chúng tôi để hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.</p>
          
          <h4 className="font-medium mt-4 mb-2">4. Sản phẩm và Dịch vụ</h4>
          <p>Eco Brew Cycle cung cấp các sản phẩm nhang và hương thơm được làm từ bã cà phê tái chế. Chúng tôi nỗ lực đảm bảo mô tả sản phẩm chính xác, tuy nhiên không đảm bảo rằng tất cả thông tin là hoàn toàn không có lỗi.</p>
          
          <h4 className="font-medium mt-4 mb-2">5. Mua hàng và Thanh toán</h4>
          <p>Khi đặt hàng với chúng tôi, bạn đồng ý cung cấp thông tin thanh toán chính xác và được ủy quyền để sử dụng phương thức thanh toán đó. Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì bất kỳ lý do gì.</p>
          
          <h4 className="font-medium mt-4 mb-2">6. Vận chuyển và Giao hàng</h4>
          <p>Chúng tôi sẽ nỗ lực giao hàng trong khung thời gian đã nêu, tuy nhiên không đảm bảo thời gian giao hàng chính xác. Rủi ro mất mát hoặc hư hỏng hàng hóa được chuyển cho bạn khi hàng được giao.</p>
          
          <h4 className="font-medium mt-4 mb-2">7. Hoàn trả và Hoàn tiền</h4>
          <p>Vui lòng xem Chính sách Hoàn trả của chúng tôi để biết thông tin về cách thức và điều kiện hoàn trả sản phẩm.</p>
          
          <h4 className="font-medium mt-4 mb-2">8. Quyền sở hữu trí tuệ</h4>
          <p>Tất cả nội dung trên trang web của chúng tôi, bao gồm văn bản, đồ họa, logo, biểu tượng, hình ảnh, và phần mềm, đều thuộc sở hữu của Eco Incense và được bảo vệ bởi luật sở hữu trí tuệ.</p>
          
          <h4 className="font-medium mt-4 mb-2">9. Giới hạn trách nhiệm</h4>
          <p>Eco Brew Cycle sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng trang web hoặc sản phẩm của chúng tôi.</p>
          
          <h4 className="font-medium mt-4 mb-2">10. Thay đổi điều khoản</h4>
          <p>Chúng tôi có thể sửa đổi các điều khoản này bất cứ lúc nào bằng cách đăng các điều khoản cập nhật. Việc bạn tiếp tục sử dụng trang web sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Register;