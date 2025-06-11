import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, DatePicker, Typography, Spin, Space, message, InputNumber } from 'antd';
import dayjs from 'dayjs';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import { orderService, OrderData } from '../../../../services/orderService';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface EditOrderProps {
  order: OrderData;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ order, onCancel, onSuccess }) => {
  const [form] = Form.useForm<OrderData>();
  const { getOrderById, updateOrder } = orderService;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAndSetOrder = async () => {
      if (order.id) {
        try {
          setLoading(true);
          const fetchedOrder = await getOrderById(order.id);
          if (fetchedOrder) {
            form.setFieldsValue({
              ...fetchedOrder,
              fullName: fetchedOrder.customerInfo?.fullName,
              phone: fetchedOrder.customerInfo?.phone,
              address: fetchedOrder.customerInfo?.address,
              notes: fetchedOrder.customerInfo?.note,
              orderDate: fetchedOrder.orderDate ? dayjs(fetchedOrder.orderDate.toDate()) : undefined,
              totalPrice: fetchedOrder.totalPrice,
              paymentMethod: fetchedOrder.paymentMethod,
            });
          }
        } catch (error) {
          console.error("Error fetching order:", error);
          message.error("Không thể tải thông tin đơn hàng.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAndSetOrder();
  }, [order, form, getOrderById]);

  const handleFinish = async (values: any) => {
    setSubmitting(true);
    try {
      if (order.id) {
        const updatedOrder: OrderData = {
          ...order,
          customerInfo: {
            fullName: values.fullName,
            phone: values.phone,
            address: values.address,
            note: values.notes,
          },
          totalPrice: values.totalPrice,
          paymentMethod: values.paymentMethod,
          orderDate: values.orderDate.toDate(),
          status: values.status,
        };
        await updateOrder(order.id, updatedOrder);
        message.success("Cập nhật đơn hàng thành công!");
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      message.error("Không thể cập nhật đơn hàng.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Space className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onCancel}
        >
          Quay lại
        </Button>
        <Title level={4} className="m-0">Chỉnh Sửa Đơn Hàng #{order.id}</Title>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card title={RenderBoldTitle("Thông Tin Đơn Hàng")} className="shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="id"
                  label="ID Đơn Hàng"
                  rules={[{ required: true, message: 'ID đơn hàng không được để trống' }]}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="orderDate"
                  label="Ngày Đặt Hàng"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng' }]}
                >
                  <DatePicker className="w-full" format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }} />
                </Form.Item>
                <Form.Item
                  name="totalPrice"
                  label="Tổng Tiền"
                  rules={[{ required: true, message: 'Vui lòng nhập tổng tiền' }]}
                >
                  <InputNumber className="w-full" min={0} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value!.replace(/\s?|(,*)/g, '') as any} />
                </Form.Item>
                <Form.Item
                  name="paymentMethod"
                  label="Phương Thức Thanh Toán"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                >
                  <Select>
                    <Option value="cod">Thanh toán khi nhận hàng (COD)</Option>
                    <Option value="bank_transfer">Chuyển khoản ngân hàng</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Trạng Thái Đơn Hàng"
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}
                >
                  <Select>
                    <Option value="pending">Đang chờ</Option>
                    <Option value="completed">Hoàn thành</Option>
                    <Option value="cancelled">Đã hủy</Option>
                  </Select>
                </Form.Item>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="shadow-sm">
              <Form.Item
                name="fullName"
                label="Họ và Tên"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số Điện Thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa Chỉ Giao Hàng"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng' }]}
              >
                <Input />
              </Form.Item>
            </Card>
          </div>
        </div>

        <Form.Item
          label="Ghi Chú"
          name="notes"
        >
          <TextArea rows={2} placeholder="Nhập ghi chú nếu có" />
        </Form.Item>

        <Form.Item className="flex justify-end mt-6">
          <Button 
            type="default" 
            onClick={onCancel}
            className="mr-2"
          >
            Hủy Bỏ
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            className="bg-[#8B7156] hover:bg-[#64503C]"
            loading={submitting}
          >
            Cập Nhật Đơn Hàng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditOrder;
