import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, Card, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface EditBookingProps {
  bookingId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  tourName: string;
  date: dayjs.Dayjs;
  adults: number;
  children: number;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

// Sample tours data for the dropdown
const availableTours = [
  { id: '1', name: 'Tour Du Lịch Đà Lạt', price: 2590000 },
  { id: '2', name: 'Tour Khám Phá Tokyo', price: 5990000 },
  { id: '3', name: 'Tour Khám Phá Hội An', price: 1990000 },
  { id: '4', name: 'Tour Du Lịch Phú Quốc', price: 3490000 },
];

const EditBooking: React.FC<EditBookingProps> = ({ bookingId, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm<BookingFormData>();

  // Disallow selecting dates in the past
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  useEffect(() => {
    // Simulate API call to fetch booking details
    setLoading(true);
    setTimeout(() => {
      // Sample data - in a real app, this would come from an API
      const bookingData = {
        customerName: bookingId === 'BK001' ? 'John Doe' : 'Jane Smith',
        tourName: bookingId === 'BK001' ? 'Tour Du Lịch Đà Lạt' : 'Tour Khám Phá Tokyo',
        date: bookingId === 'BK001' ? '15/04/2024' : '20/05/2024',
        status: bookingId === 'BK001' ? 'confirmed' : 'pending',
        paymentStatus: bookingId === 'BK001' ? 'paid' : 'pending',
        phone: bookingId === 'BK001' ? '0123456789' : '0987654321',
        email: bookingId === 'BK001' ? 'john.doe@example.com' : 'jane.smith@example.com',
        adults: bookingId === 'BK001' ? 2 : 1,
        children: bookingId === 'BK001' ? 1 : 0,
        specialRequests: bookingId === 'BK001' ? 'Yêu cầu phòng view biển và đưa đón tại sân bay' : '',
      };
      
      form.setFieldsValue({
        customerName: bookingData.customerName,
        tourName: bookingData.tourName,
        date: dayjs(bookingData.date, "DD/MM/YYYY"),
        status: bookingData.status as 'confirmed' | 'pending' | 'cancelled',
        paymentStatus: bookingData.paymentStatus as 'paid' | 'pending' | 'refunded',
        phone: bookingData.phone,
        email: bookingData.email,
        adults: bookingData.adults,
        children: bookingData.children,
        specialRequests: bookingData.specialRequests,
      });
      
      setLoading(false);
    }, 800);
  }, [bookingId, form]);

  const handleSubmit = (values: BookingFormData) => {
    console.log('Update booking values:', values);
    message.success('Đặt tour đã được cập nhật thành công!');
    onSuccess();
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card 
      title="Chỉnh Sửa Đặt Tour" 
      variant="borderless"
      extra={
        <Button 
          type="link" 
          color="primary"
          variant="text"
          icon={<ArrowLeftOutlined />} 
          onClick={onCancel}
        >
          Quay lại
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Tên Khách Hàng"
            name="customerName"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập email khách hàng" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Số Điện Thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder="Nhập số điện thoại khách hàng" />
          </Form.Item>
          
          <Form.Item
            label="Tour"
            name="tourName"
            rules={[{ required: true, message: 'Vui lòng chọn tour' }]}
          >
            <Select placeholder="Chọn tour">
              {availableTours.map(tour => (
                <Option key={tour.id} value={tour.name}>
                  {tour.name} ({tour.price.toLocaleString('vi-VN')} VNĐ)
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Ngày Đi"
            name="date"
            rules={[{ required: true, message: 'Vui lòng chọn ngày đi' }]}
            tooltip="Ngày đi phải từ ngày hiện tại trở đi"
          >
            <DatePicker 
              className="w-full" 
              format="DD/MM/YYYY" 
              placeholder="Chọn ngày đi" 
              disabledDate={disabledDate}
            />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Số Người Lớn"
              name="adults"
              rules={[{ required: true, message: 'Vui lòng nhập số người lớn' }]}
            >
              <InputNumber min={1} className="w-full" placeholder="Số người lớn" />
            </Form.Item>
            
            <Form.Item
              label="Số Trẻ Em"
              name="children"
              rules={[{ required: true, message: 'Vui lòng nhập số trẻ em' }]}
            >
              <InputNumber min={0} className="w-full" placeholder="Số trẻ em" />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Trạng Thái Đặt Tour"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select placeholder="Chọn trạng thái đặt tour">
              <Option value="confirmed">Đã Xác Nhận</Option>
              <Option value="pending">Đang Chờ</Option>
              <Option value="cancelled">Đã Hủy</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="Trạng Thái Thanh Toán"
            name="paymentStatus"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái thanh toán' }]}
          >
            <Select placeholder="Chọn trạng thái thanh toán">
              <Option value="paid">Đã Thanh Toán</Option>
              <Option value="pending">Chưa Thanh Toán</Option>
              <Option value="refunded">Đã Hoàn Tiền</Option>
            </Select>
          </Form.Item>
        </div>
        
        <Form.Item
          label="Yêu Cầu Đặc Biệt"
          name="specialRequests"
        >
          <TextArea rows={4} placeholder="Nhập yêu cầu đặc biệt của khách hàng" />
        </Form.Item>

        <Form.Item className="flex justify-end mt-6">
          <Button 
            type="primary" 
            color="primary"
            variant='solid'
            htmlType="submit" 
            icon={<SaveOutlined />}
          >
            Lưu Thay Đổi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditBooking; 