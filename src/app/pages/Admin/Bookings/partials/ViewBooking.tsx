import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Descriptions, Spin, Space, Typography, Table } from 'antd';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { Title, Paragraph } = Typography;

interface OrderItem {
  id: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

interface ViewBookingProps {
  orderId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

interface OrderData {
  orderId: string;
  customerName: string;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  items: OrderItem[];
}

const ViewBooking: React.FC<ViewBookingProps> = ({ orderId, onBack, onEdit }) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Simulate API call to fetch order details
    setTimeout(() => {
      // Sample data - in a real app, this would come from an API
      const orderData: OrderData = {
        orderId: orderId,
        customerName: orderId === 'OR001' ? 'Nguyễn Văn A' : 'Trần Thị B',
        date: orderId === 'OR001' ? '15/04/2024' : '20/05/2024',
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
      
      setOrder(orderData);
      setLoading(false);
    }, 800);
  }, [orderId]);

  // Status color and label mapping
  const getStatusInfo = (status: string, type: 'order' | 'payment') => {
    if (type === 'order') {
      const colors = {
        completed: 'green',
        processing: 'orange',
        cancelled: 'red',
      };
      const labels = {
        completed: 'Hoàn Thành',
        processing: 'Đang Xử Lý',
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

  const orderColumns = [
    {
      title: RenderBoldTitle('Sản Phẩm'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: RenderBoldTitle('Đơn Giá'),
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `${price.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: RenderBoldTitle('Số Lượng'),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: RenderBoldTitle('Thành Tiền'),
      dataIndex: 'total',
      key: 'total',
      render: (price: number) => `${price.toLocaleString('vi-VN')} VNĐ`,
    },
  ];

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
          />
          <h1 className="text-2xl font-bold">Không tìm thấy đơn hàng</h1>
        </div>
      </div>
    );
  }

  const orderStatus = getStatusInfo(order.status, 'order');
  const paymentStatus = getStatusInfo(order.paymentStatus, 'payment');

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
          <Title level={4} className="m-0">Chi Tiết Đơn Hàng #{order.orderId}</Title>
        </Space>
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(orderId)}
            className="bg-[#8B7156] hover:bg-[#64503C]"
          >
            Chỉnh Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            Hủy Đơn Hàng
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title={RenderBoldTitle("Thông Tin Đơn Hàng")} className="mb-6 shadow-sm">
            <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered>
              <Descriptions.Item label={RenderBoldTitle("Mã Đơn Hàng")}>#{order.orderId}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Ngày Đặt Hàng")}>{order.date}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Trạng Thái Đơn Hàng")}>
                <Tag color={orderStatus.color}>{orderStatus.label}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Trạng Thái Thanh Toán")}>
                <Tag color={paymentStatus.color}>{paymentStatus.label}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Tổng Giá Trị")}>
                {order.amount.toLocaleString('vi-VN')} VNĐ
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Chi Tiết Sản Phẩm")} className="mb-6 shadow-sm">
            <Table 
              dataSource={order.items} 
              columns={orderColumns} 
              pagination={false}
              rowKey="id"
              summary={(pageData) => {
                const total = pageData.reduce((total, item) => total + item.total, 0);
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3} className="text-right font-medium">
                        Tổng Cộng:
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <span className="font-bold text-[#8B7156]">
                          {total.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="mb-6 shadow-sm">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("Họ và Tên")}>{order.customerName}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Email")}>{order.email}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Số Điện Thoại")}>{order.phone}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Địa Chỉ")}>{order.address}</Descriptions.Item>
            </Descriptions>
          </Card>

          {order.note && (
            <Card title={RenderBoldTitle("Ghi Chú")} className="mb-6 shadow-sm">
              <Paragraph className="mb-0">{order.note}</Paragraph>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBooking; 