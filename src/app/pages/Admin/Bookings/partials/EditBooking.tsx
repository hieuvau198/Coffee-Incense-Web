import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, DatePicker, Typography, Spin, Space, message } from 'antd';
import dayjs from 'dayjs';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import { useBookingCrud } from '../../../../hooks/useBookingCrud';
import { Booking, BookingStatus } from '../../../../models/booking';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface EditBookingProps {
  booking: Booking; // Pass the whole booking object
  onCancel: () => void;
  onSuccess: () => void;
}

const EditBooking: React.FC<EditBookingProps> = ({ booking, onCancel, onSuccess }) => {
  const [form] = Form.useForm<Booking>();
  const { getBooking, updateBookingStatus } = useBookingCrud();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAndSetBooking = async () => {
      if (booking.id) {
        try {
          setLoading(true);
          const fetchedBooking = await getBooking(booking.id);
          if (fetchedBooking) {
            form.setFieldsValue({
              ...fetchedBooking,
              bookingDate: dayjs(fetchedBooking.bookingDate).format("YYYY-MM-DD"), // Convert string to Dayjs object
            });
          }
        } catch (error) {
          console.error("Error fetching booking:", error);
          message.error("Không thể tải thông tin đặt chỗ.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAndSetBooking();
  }, [booking, form, getBooking]);

  const handleFinish = async (values: any) => {
    setSubmitting(true);
    try {
      if (booking.id) {
        const updatedStatus = values.status as BookingStatus;
        await updateBookingStatus(booking.id, updatedStatus);
        message.success("Cập nhật đặt chỗ thành công!");
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      message.error("Không thể cập nhật đặt chỗ.");
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
        <Title level={4} className="m-0">Chỉnh Sửa Đặt Chỗ #{booking.id}</Title>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card title={RenderBoldTitle("Thông Tin Đặt Chỗ")} className="shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="id"
                  label="ID Đặt Chỗ"
                  rules={[{ required: true, message: 'ID đặt chỗ không được để trống' }]}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="bookingDate"
                  label="Ngày Đặt Chỗ"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày đặt chỗ' }]}
                >
                  <DatePicker className="w-full" format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Trạng Thái Đặt Chỗ"
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái đặt chỗ' }]}
                >
                  <Select>
                    {Object.values(BookingStatus).map(status => (
                      <Option key={status} value={status}>{status}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="shadow-sm">
              <Form.Item
                name="userName"
                label="Họ và Tên"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="userEmail"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
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
            Cập Nhật Đặt Chỗ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBooking;
