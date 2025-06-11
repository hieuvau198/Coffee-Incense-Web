import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Descriptions, Spin, Space, Typography, message } from 'antd';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import { useBookingCrud } from '../../../../hooks/useBookingCrud';
import { Booking, BookingStatus } from '../../../../models/booking';

const { Title, Paragraph } = Typography;

interface ViewBookingProps {
  bookingId: string;
  onBack: () => void;
  onEdit: (booking: Booking) => void; // Pass the full booking object
}

const ViewBooking: React.FC<ViewBookingProps> = ({ bookingId, onBack, onEdit }) => {
  const { getBooking, loading, error, deleteBooking } = useBookingCrud();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const fetchedBooking = await getBooking(bookingId);
        setBooking(fetchedBooking);
      } catch (err) {
        console.error("Error fetching booking details:", err);
        message.error("Không thể tải chi tiết đặt chỗ.");
      }
    };
    fetchBookingDetails();
  }, [bookingId, getBooking]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đặt chỗ này?")) {
      try {
        if (bookingId) {
          await deleteBooking(bookingId);
          message.success("Xóa đặt chỗ thành công");
          onBack(); // Go back to list after deletion
        }
      } catch (err) {
        message.error("Có lỗi xảy ra khi xóa đặt chỗ");
        console.error(err);
      }
    }
  };

  // Status color and label mapping for BookingStatus
  const getBookingStatusInfo = (status: BookingStatus) => {
    const colors: Record<BookingStatus, string> = {
      [BookingStatus.Pending]: 'orange',
      [BookingStatus.Confirmed]: 'green',
      [BookingStatus.Cancelled]: 'red',
      [BookingStatus.Completed]: 'blue',
    };
    return {
      color: colors[status] || 'default',
      label: status,
    };
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <h2 className="text-2xl font-bold">Đã xảy ra lỗi: {error}</h2>
        <Button onClick={onBack} className="mt-4">Quay lại</Button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
          >
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold">Không tìm thấy đặt chỗ</h1>
        </div>
      </div>
    );
  }

  const bookingStatusInfo = getBookingStatusInfo(booking.status);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
          >
            Quay lại danh sách
          </Button>
          <Title level={4} className="m-0">Chi Tiết Đặt Chỗ #{booking.id}</Title>
        </Space>
        <Space>
          {booking && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(booking)}
              className="bg-[#8B7156] hover:bg-[#64503C]"
            >
              Chỉnh Sửa
            </Button>
          )}
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            Xóa Đặt Chỗ
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <Card title={RenderBoldTitle("Thông Tin Đặt Chỗ")} className="mb-6 shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("ID Đặt Chỗ")}>#{booking.id}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Ngày Đặt Chỗ")}>{booking.bookingDate}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Trạng Thái Đặt Chỗ")}>
                <Tag color={bookingStatusInfo.color}>{bookingStatusInfo.label}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Ghi Chú")} className="mb-6 shadow-sm">
            <Paragraph className="mb-0">{booking.notes || 'Không có ghi chú'}</Paragraph>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="mb-6 shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("Họ và Tên")}>{booking.userName}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Email")}>{booking.userEmail}</Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking; 