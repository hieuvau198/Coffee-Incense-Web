import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, Card, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface AddBookingProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  tourName: string;
  date: any; // Using any to avoid dayjs type issues
  adults: number;
  children: number;
  specialRequests?: string;
}

// Sample tours data for the dropdown
const availableTours = [
  { id: '1', name: 'Tour Du Lịch Đà Lạt', price: 2590000 },
  { id: '2', name: 'Tour Khám Phá Tokyo', price: 5990000 },
  { id: '3', name: 'Tour Khám Phá Hội An', price: 1990000 },
  { id: '4', name: 'Tour Du Lịch Phú Quốc', price: 3490000 },
];

const AddBooking: React.FC<AddBookingProps> = ({ onCancel, onSuccess }) => {
  const [form] = Form.useForm<BookingFormData>();

  // Disallow selecting dates in the past
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  const handleSubmit = (values: BookingFormData) => {
    console.log('Create booking values:', values);
    message.success('Đặt tour đã được tạo thành công!');
    onSuccess();
  };

  return (
    <Card 
      title="Thêm Đặt Tour Mới" 
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
        initialValues={{ adults: 1, children: 0 }}
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
        
        <Form.Item
          label="Yêu Cầu Đặc Biệt"
          name="specialRequests"
        >
          <TextArea rows={4} placeholder="Nhập yêu cầu đặc biệt của khách hàng" />
        </Form.Item>

        <Form.Item className="flex justify-end">
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
          >
            Tạo Đặt Tour
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBooking; 