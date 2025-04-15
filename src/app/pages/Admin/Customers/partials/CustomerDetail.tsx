import React, { useEffect, useState } from 'react';
import { Typography, Descriptions, Tag, Button, Card, Avatar, Table, Tooltip, Tabs, Empty, Statistic, Row, Col } from 'antd';
import { ArrowLeftOutlined, UserOutlined, DollarOutlined, ShoppingOutlined, CalendarOutlined } from '@ant-design/icons';
import Loading from '@/app/components/Loading';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Interface cho sản phẩm trong đơn hàng
interface OrderItem {
  id: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

// Interface cho đơn hàng
interface OrderData {
  key: string;
  orderId: string;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  items: OrderItem[];
}

// Interface cho dữ liệu khách hàng
interface CustomerData {
  key: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  orders: OrderData[];
}

interface CustomerDetailProps {
  customerId: string;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId, onBack }) => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data synced with CustomerList.tsx, with orders added
  useEffect(() => {
    setLoading(true);

    const mockData: Record<string, CustomerData> = {
      '1': {
        key: '1',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0901234567',
        status: 'active',
        totalBookings: 5,
        totalSpent: 2500000,
        lastBooking: '2024-04-15',
        orders: [
          {
            key: '1',
            orderId: 'OR001',
            date: '2024-04-15',
            status: 'completed',
            amount: 499000,
            paymentStatus: 'paid',
            items: [
              { id: '1', productName: 'Hương Cà Phê', unitPrice: 150000, quantity: 2, total: 300000 },
              { id: '2', productName: 'Nụ Hương Cà Phê', unitPrice: 199000, quantity: 1, total: 199000 },
            ],
          },
          {
            key: '2',
            orderId: 'OR002',
            date: '2024-03-10',
            status: 'processing',
            amount: 780000,
            paymentStatus: 'pending',
            items: [
              { id: '3', productName: 'Bột Hương Cà Phê', unitPrice: 120000, quantity: 3, total: 360000 },
              { id: '4', productName: 'Nhang Vòng Cà Phê', unitPrice: 210000, quantity: 2, total: 420000 },
            ],
          },
        ],
      },
      '2': {
        key: '2',
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        phone: '0909876543',
        status: 'inactive',
        totalBookings: 2,
        totalSpent: 980000,
        lastBooking: '2024-03-20',
        orders: [
          {
            key: '1',
            orderId: 'OR003',
            date: '2024-03-20',
            status: 'completed',
            amount: 600000,
            paymentStatus: 'paid',
            items: [
              { id: '5', productName: 'Hương Cà Phê', unitPrice: 150000, quantity: 4, total: 600000 },
            ],
          },
        ],
      },
    };

    // Mock API call with setTimeout
    const fetchData = setTimeout(() => {
      if (customerId && mockData[customerId]) {
        setCustomer(mockData[customerId]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, [customerId]);

  // Cột cho bảng Order History
  const orderColumns: ColumnsType<OrderData> = [
    {
      title: RenderBoldTitle('Mã Đơn Hàng'),
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
      render: (text: string) => `#${text}`,
    },
    {
      title: RenderBoldTitle('Ngày Đặt Hàng'),
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: RenderBoldTitle('Trạng Thái'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: 'completed' | 'processing' | 'cancelled') => {
        const colors = { completed: 'green', processing: 'orange', cancelled: 'red' };
        const labels = { completed: 'Hoàn Thành', processing: 'Đang Xử Lý', cancelled: 'Đã Hủy' };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: RenderBoldTitle('Thanh Toán'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 120,
      render: (status: 'paid' | 'pending' | 'refunded') => {
        const colors = { paid: 'green', pending: 'orange', refunded: 'red' };
        const labels = { paid: 'Đã Thanh Toán', pending: 'Chưa Thanh Toán', refunded: 'Đã Hoàn Tiền' };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: RenderBoldTitle('Tổng Giá Trị'),
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
  ];

  if (loading) {
    return <Loading />;
  }

  if (!customer) {
    return (
      <Card className="shadow-sm">
        <div className="mb-4">
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onBack}>
            Back to Customers
          </Button>
        </div>
        <Empty description="Customer not found" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onBack}>
          Back to Customers
        </Button>
      </div>

      {/* Customer Info Card */}
      <Card className="shadow-sm">
        <div className="flex items-start">
          <Avatar size={80} icon={<UserOutlined />} className="mr-6" />
          <div>
            <Title level={3}>{customer.name}</Title>
            <Tag color={customer.status === 'active' ? 'green' : 'red'}>
              {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </Tag>
            <div className="mt-2">
              <Text type="secondary">Customer Key: {customer.key}</Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Row gutter={16}>
        <Col span={8}>
          <Card className="shadow-sm">
            <Statistic
              title={RenderBoldTitle("Total Bookings")}
              value={customer.totalBookings}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-sm">
            <Statistic
              title={RenderBoldTitle("Total Spent")}
              value={customer.totalSpent}
              precision={0}
              formatter={(value) => `${value.toLocaleString('vi-VN')} VNĐ`}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-sm">
            <Statistic
              title={RenderBoldTitle("Last Booking")}
              value={customer.lastBooking}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Card className="shadow-sm">
        <Tabs defaultActiveKey="info" type="card">
          <TabPane tab="Customer Information" key="info">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Full Name">{customer.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={customer.status === 'active' ? 'green' : 'red'}>
                  {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab="Order History" key="orders">
            <Table
              columns={orderColumns}
              dataSource={customer.orders}
              rowKey="key"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default CustomerDetail;