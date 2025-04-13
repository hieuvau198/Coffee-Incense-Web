import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Descriptions, Spin, Space, Typography } from 'antd';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { Title, Paragraph } = Typography;

interface ViewBookingProps {
  bookingId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

interface BookingData {
  bookingId: string;
  customerName: string;
  tourName: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  phone?: string;
  email?: string;
  adults?: number;
  children?: number;
  specialRequests?: string;
  tourImage?: string;
  departurePlace?: string;
  duration?: string;
}

const ViewBooking: React.FC<ViewBookingProps> = ({ bookingId, onBack, onEdit }) => {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    // Simulate API call to fetch booking details
    setTimeout(() => {
      // Sample data - in a real app, this would come from an API
      const bookingData: BookingData = {
        bookingId: bookingId,
        customerName: bookingId === 'BK001' ? 'John Doe' : 'Jane Smith',
        tourName: bookingId === 'BK001' ? 'Tour Du Lịch Đà Lạt' : 'Tour Khám Phá Tokyo',
        date: bookingId === 'BK001' ? '15/04/2024' : '20/05/2024',
        status: bookingId === 'BK001' ? 'confirmed' : 'pending',
        amount: bookingId === 'BK001' ? 2590000 : 5990000,
        paymentStatus: bookingId === 'BK001' ? 'paid' : 'pending',
        phone: bookingId === 'BK001' ? '0123456789' : '0987654321',
        email: bookingId === 'BK001' ? 'john.doe@example.com' : 'jane.smith@example.com',
        adults: bookingId === 'BK001' ? 2 : 1,
        children: bookingId === 'BK001' ? 1 : 0,
        specialRequests: bookingId === 'BK001' ? 'Yêu cầu phòng view biển và đưa đón tại sân bay' : '',
        tourImage: bookingId === 'BK001' 
          ? 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg' 
          : 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
        departurePlace: bookingId === 'BK001' ? 'Hồ Chí Minh' : 'Hà Nội',
        duration: bookingId === 'BK001' ? '3 ngày 2 đêm' : '5 ngày 4 đêm',
      };
      
      setBooking(bookingData);
      setLoading(false);
    }, 800);
  }, [bookingId]);

  // Status color and label mapping
  const getStatusInfo = (status: string, type: 'booking' | 'payment') => {
    if (type === 'booking') {
      const colors = {
        confirmed: 'green',
        pending: 'orange',
        cancelled: 'red',
      };
      const labels = {
        confirmed: 'Đã Xác Nhận',
        pending: 'Đang Chờ',
        cancelled: 'Đã Hủy',
      };
      return {
        color: colors[status as keyof typeof colors] || 'default',
        label: labels[status as keyof typeof labels] || status,
      };
    } else {
      const colors = {
        paid: 'green',
        pending: 'orange',
        refunded: 'red',
      };
      const labels = {
        paid: 'Đã Thanh Toán',
        pending: 'Chưa Thanh Toán',
        refunded: 'Đã Hoàn Tiền',
      };
      return {
        color: colors[status as keyof typeof colors] || 'default',
        label: labels[status as keyof typeof labels] || status,
      };
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <Spin size="large" />
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
          />
          <h1 className="text-2xl font-bold">Không tìm thấy đặt tour</h1>
        </div>
      </div>
    );
  }

  const bookingStatus = getStatusInfo(booking.status, 'booking');
  const paymentStatus = getStatusInfo(booking.paymentStatus, 'payment');

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <Button
          type="link"
          color="primary"
          variant="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="mb-2"
        >
          Quay lại danh sách
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card variant="borderless" className="sticky top-5">
            {booking.tourImage && (
              <img
                src={booking.tourImage}
                alt={booking.tourName}
                className="w-full h-auto object-cover rounded"
              />
            )}
            <div className="mt-4">
              <Title level={4} className="text-center">
                {booking.tourName}
              </Title>
              <Descriptions column={1} className="mt-4">
                <Descriptions.Item label={RenderBoldTitle("Mã Đặt Tour")}>#{booking.bookingId}</Descriptions.Item>
                <Descriptions.Item label={RenderBoldTitle("Trạng Thái Đặt Tour")}>
                  <Tag color={bookingStatus.color}>{bookingStatus.label}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label={RenderBoldTitle("Trạng Thái Thanh Toán")}>
                  <Tag color={paymentStatus.color}>{paymentStatus.label}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label={RenderBoldTitle("Tổng Giá Tiền")}>
                  {booking.amount.toLocaleString("vi-VN")} VNĐ
                </Descriptions.Item>
              </Descriptions>
              <div className="flex justify-center mt-4">
                <Space>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(bookingId)}
                  >
                    Chỉnh Sửa
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Hủy Đặt Tour
                  </Button>
                </Space>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="mb-6" variant="borderless">
            <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered>
              <Descriptions.Item label={RenderBoldTitle("Họ và Tên")}>{booking.customerName}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Email")}>{booking.email}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Số Điện Thoại")}>{booking.phone}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Thông Tin Tour")} className="mb-6" variant="borderless">
            <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered>
              <Descriptions.Item label={RenderBoldTitle("Tên Tour")}>{booking.tourName}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Ngày Khởi Hành")}>{booking.date}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Điểm Khởi Hành")}>{booking.departurePlace || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Thời Gian Tour")}>{booking.duration || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Số Người Lớn")}>{booking.adults}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Số Trẻ Em")}>{booking.children}</Descriptions.Item>
            </Descriptions>
          </Card>

          {booking.specialRequests && (
            <Card title={RenderBoldTitle("Yêu Cầu Đặc Biệt")} className="mb-6" variant="borderless">
              <Paragraph>{booking.specialRequests}</Paragraph>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBooking; 