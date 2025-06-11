import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Descriptions, Spin, Space, Typography, message } from 'antd';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import { orderService, OrderData } from '../../../../services/orderService';
import { format } from 'date-fns';

const { Title, Paragraph } = Typography;

interface ViewOrderProps {
  orderId: string;
  onBack: () => void;
  onEdit: (order: OrderData) => void;
}

const ViewOrder: React.FC<ViewOrderProps> = ({ orderId, onBack, onEdit }) => {
  const { getOrderById } = orderService;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        if (orderId) {
          const fetchedOrder = await getOrderById(orderId);
          setOrder(fetchedOrder);
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        message.error("Không thể tải chi tiết đơn hàng.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId, getOrderById]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        if (orderId) {
          message.success("Xóa đơn hàng thành công");
          onBack();
        }
      } catch (err) {
        message.error("Có lỗi xảy ra khi xóa đơn hàng");
        console.error(err);
      }
    }
  };

  const getOrderStatusInfo = (status: string) => {
    let color = '';
    switch (status) {
      case 'pending':
        color = 'orange';
        break;
      case 'completed':
        color = 'green';
        break;
      case 'cancelled':
        color = 'red';
        break;
      default:
        color = 'default';
    }
    return {
      color: color,
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

  if (!order) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
          >
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold">Không tìm thấy đơn hàng</h1>
        </div>
      </div>
    );
  }

  const orderStatusInfo = getOrderStatusInfo(order.status);

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
          <Title level={4} className="m-0">Chi Tiết Đơn Hàng #{order.id}</Title>
        </Space>
        <Space>
          {order && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(order)}
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
            Xóa Đơn Hàng
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <Card title={RenderBoldTitle("Thông Tin Đơn Hàng")} className="mb-6 shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("ID Đơn Hàng")}>#{order.id}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Ngày Đặt Hàng")}>{order.orderDate ? format(order.orderDate.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A'}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Trạng Thái Đơn Hàng")}>
                <Tag color={orderStatusInfo.color}>{orderStatusInfo.label}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Tổng Tiền")}>{order.totalPrice?.toLocaleString('vi-VN')} VNĐ</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Phương Thức Thanh Toán")}>{order.paymentMethod}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Ghi Chú")} className="mb-6 shadow-sm">
            <Paragraph className="mb-0">{order.customerInfo?.note || 'Không có ghi chú'}</Paragraph>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="mb-6 shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("Họ và Tên")}>{order.customerInfo?.fullName}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Email")}>{order.userId}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Số Điện Thoại")}>{order.customerInfo?.phone}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Địa Chỉ Giao Hàng")}>{order.customerInfo?.address}</Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder; 