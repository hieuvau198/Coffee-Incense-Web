import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, DatePicker, InputNumber, Typography, Spin, Space, Divider } from 'antd';
import dayjs from 'dayjs';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface OrderItem {
  id: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

interface EditBookingProps {
  orderId: string;
  onCancel: () => void;
  onSuccess: (data: any) => void;
}

const statusOptions = [
  { value: 'processing', label: 'Đang Xử Lý' },
  { value: 'completed', label: 'Hoàn Thành' },
  { value: 'cancelled', label: 'Đã Hủy' },
];

const paymentStatusOptions = [
  { value: 'pending', label: 'Chưa Thanh Toán' },
  { value: 'paid', label: 'Đã Thanh Toán' },
  { value: 'refunded', label: 'Đã Hoàn Tiền' },
];

const EditBooking: React.FC<EditBookingProps> = ({ orderId, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Simulate API call to fetch order data
    setTimeout(() => {
      // Sample data - in a real app, this would come from an API
      const orderData = {
        orderId: orderId,
        customerName: orderId === 'OR001' ? 'Nguyễn Văn A' : 'Trần Thị B',
        date: orderId === 'OR001' ? '2024-04-15' : '2024-05-20',
        status: orderId === 'OR001' ? 'completed' : 'processing',
        amount: orderId === 'OR001' ? 499000 : 780000,
        paymentStatus: orderId === 'OR001' ? 'paid' : 'pending',
        phone: orderId === 'OR001' ? '0987654321' : '0912345678',
        email: orderId === 'OR001' ? 'nguyenvana@gmail.com' : 'tranthib@gmail.com',
        address: orderId === 'OR001'
          ? 'Số 12, Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh'
          : 'Số 45, Đường Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội',
        note: orderId === 'OR001' ? 'Giao vào buổi sáng, gọi trước khi giao' : '',
        items: orderId === 'OR001'
          ? [
              { id: '1', productName: 'Hương Cà Phê', unitPrice: 150000, quantity: 2, total: 300000 },
              { id: '2', productName: 'Nụ Hương Cà Phê', unitPrice: 199000, quantity: 1, total: 199000 },
            ]
          : [
              { id: '3', productName: 'Bột Hương Cà Phê', unitPrice: 120000, quantity: 3, total: 360000 },
              { id: '4', productName: 'Nhang Vòng Cà Phê', unitPrice: 210000, quantity: 2, total: 420000 },
            ],
      };

      // Set form values
      form.setFieldsValue({
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        date: dayjs(orderData.date),
        status: orderData.status,
        paymentStatus: orderData.paymentStatus,
        phone: orderData.phone,
        email: orderData.email,
        address: orderData.address,
        note: orderData.note,
      });

      setItems(orderData.items);
      setLoading(false);
    }, 800);
  }, [orderId, form]);

  const handleFinish = (values: any) => {
    // Convert date to string and prepare data for API
    const formData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      items: items,
      amount: items.reduce((total, item) => total + item.total, 0),
    };
    
    onSuccess(formData);
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            total: item.unitPrice * quantity
          };
        }
        return item;
      })
    );
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
        <Title level={4} className="m-0">Chỉnh Sửa Đơn Hàng #{orderId}</Title>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title={RenderBoldTitle("Thông Tin Đơn Hàng")} className="shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="orderId"
                  label="Mã Đơn Hàng"
                  rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="date"
                  label="Ngày Đặt Hàng"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng' }]}
                >
                  <DatePicker className="w-full" format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Trạng Thái Đơn Hàng"
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}
                >
                  <Select>
                    {statusOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="paymentStatus"
                  label="Trạng Thái Thanh Toán"
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái thanh toán' }]}
                >
                  <Select>
                    {paymentStatusOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Card>

            <Card title={RenderBoldTitle("Chi Tiết Sản Phẩm")} className="shadow-sm">
              {items.map((item, index) => (
                <div key={item.id} className="mb-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 md:col-span-5">
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-gray-500 text-sm">
                        Đơn giá: {item.unitPrice.toLocaleString('vi-VN')} VNĐ
                      </div>
                    </div>
                    <div className="col-span-5 md:col-span-3">
                      <InputNumber
                        min={1}
                        defaultValue={item.quantity}
                        onChange={(value) => updateItemQuantity(item.id, value as number)}
                        className="w-full"
                        addonBefore="Số lượng"
                      />
                    </div>
                    <div className="col-span-7 md:col-span-4 text-right">
                      <div className="font-medium">Thành tiền:</div>
                      <div className="text-[#8B7156] font-bold">
                        {item.total.toLocaleString('vi-VN')} VNĐ
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Divider className="my-4" />}
                </div>
              ))}

              <div className="mt-4 text-right">
                <div className="text-lg font-medium">Tổng cộng:</div>
                <div className="text-xl text-[#8B7156] font-bold">
                  {items.reduce((sum, item) => sum + item.total, 0).toLocaleString('vi-VN')} VNĐ
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="shadow-sm">
              <Form.Item
                name="customerName"
                label="Họ và Tên"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
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
                label="Địa Chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item
                name="note"
                label="Ghi Chú"
              >
                <TextArea rows={3} />
              </Form.Item>
            </Card>

            <div className="flex justify-center">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                className="w-full bg-[#8B7156] hover:bg-[#64503C]"
              >
                Lưu Thay Đổi
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditBooking;
