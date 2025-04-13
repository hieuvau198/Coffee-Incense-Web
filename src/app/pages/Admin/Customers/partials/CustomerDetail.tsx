import React, { useEffect, useState } from 'react';
import {Typography,Descriptions,Tag,Button,Card,Avatar,Table,Tooltip,Tabs,Empty,Statistic,Row,Col} from 'antd';
import {ArrowLeftOutlined,UserOutlined,DollarOutlined,ShoppingOutlined} from '@ant-design/icons';
import Loading from '@/app/components/Loading';
import type { ColumnsType } from 'antd/es/table';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface BookingHistory {
  key: string;
  id: string;
  tourName: string;
  bookingDate: string;
  departureDate: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: number;
  participants: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

interface ReviewHistory {
  key: string;
  id: string;
  tourName: string;
  reviewDate: string;
  rating: number;
  comment: string;
}

interface CustomerData {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  address?: string;
  dob?: string;
  registrationDate: string;
  bookingHistory: BookingHistory[];
  reviewHistory: ReviewHistory[];
}

interface CustomerDetailProps {
  customerId: string;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId, onBack }) => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  // In a real app, this would be an API call
  useEffect(() => {
    setLoading(true);

    // Mock customer data with booking and review history
    const mockData: Record<string, CustomerData> = {
      '1': {
        key: '1',
        id: 'CUS001',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123 456 789',
        status: 'active',
        totalBookings: 3,
        totalSpent: 3897000,
        lastBooking: '15/03/2024',
        address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        dob: '15/05/1985',
        registrationDate: '10/01/2024',
        bookingHistory: [
          {
            key: '1',
            id: 'BK001',
            tourName: 'TOUR DU LỊCH ĐÀ LẠT',
            bookingDate: '10/03/2024',
            departureDate: '15/03/2024',
            status: 'completed',
            amount: 1599000,
            participants: 2,
            paymentMethod: 'Thẻ tín dụng',
            paymentStatus: 'paid',
          },
          {
            key: '2',
            id: 'BK005',
            tourName: 'TOUR DU LỊCH PHÚ QUỐC',
            bookingDate: '25/02/2024',
            departureDate: '01/03/2024',
            status: 'completed',
            amount: 1799000,
            participants: 1,
            paymentMethod: 'Chuyển khoản',
            paymentStatus: 'paid',
          },
          {
            key: '3',
            id: 'BK009',
            tourName: 'TOUR DU LỊCH NHA TRANG',
            bookingDate: '10/01/2024',
            departureDate: '15/05/2024',
            status: 'confirmed',
            amount: 499000,
            participants: 1,
            paymentMethod: 'PayPal',
            paymentStatus: 'paid',
          },
        ],
        reviewHistory: [
          {
            key: '1',
            id: 'RV001',
            tourName: 'TOUR DU LỊCH ĐÀ LẠT',
            reviewDate: '18/03/2024',
            rating: 5,
            comment: 'Tour rất tuyệt vời! Hướng dẫn viên nhiệt tình, chương trình tham quan hợp lý.',
          },
          {
            key: '2',
            id: 'RV002',
            tourName: 'TOUR DU LỊCH PHÚ QUỐC',
            reviewDate: '05/03/2024',
            rating: 4,
            comment: 'Cảnh đẹp, đồ ăn ngon. Tuy nhiên thời gian tham quan hơi gấp.',
          },
        ],
      },
      '2': {
        key: '2',
        id: 'CUS002',
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0987 654 321',
        status: 'active',
        totalBookings: 2,
        totalSpent: 2998000,
        lastBooking: '20/02/2024',
        address: '456 Lê Lợi, Quận 3, TP.HCM',
        dob: '20/07/1990',
        registrationDate: '15/01/2024',
        bookingHistory: [
          {
            key: '1',
            id: 'BK002',
            tourName: 'TOUR DU LỊCH HẠ LONG',
            bookingDate: '15/02/2024',
            departureDate: '20/02/2024',
            status: 'completed',
            amount: 1999000,
            participants: 2,
            paymentMethod: 'Thẻ tín dụng',
            paymentStatus: 'paid',
          },
          {
            key: '2',
            id: 'BK006',
            tourName: 'TOUR DU LỊCH SÀI GÒN',
            bookingDate: '05/01/2024',
            departureDate: '10/01/2024',
            status: 'completed',
            amount: 999000,
            participants: 1,
            paymentMethod: 'Chuyển khoản',
            paymentStatus: 'paid',
          },
        ],
        reviewHistory: [
          {
            key: '1',
            id: 'RV003',
            tourName: 'TOUR DU LỊCH HẠ LONG',
            reviewDate: '25/02/2024',
            rating: 5,
            comment: 'Hạ Long thật đẹp, tour tổ chức rất chu đáo. Nhất định sẽ quay lại!',
          },
        ],
      },
      '3': {
        key: '3',
        id: 'CUS003',
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        phone: '0912 345 678',
        status: 'inactive',
        totalBookings: 1,
        totalSpent: 1499000,
        lastBooking: '05/01/2024',
        registrationDate: '01/01/2024',
        bookingHistory: [
          {
            key: '1',
            id: 'BK003',
            tourName: 'TOUR DU LỊCH ĐÀ NẴNG',
            bookingDate: '01/01/2024',
            departureDate: '05/01/2024',
            status: 'cancelled',
            amount: 1499000,
            participants: 1,
            paymentMethod: 'Thẻ tín dụng',
            paymentStatus: 'refunded',
          },
        ],
        reviewHistory: [],
      },
      '4': {
        key: '4',
        id: 'CUS004',
        name: 'Phạm Thị D',
        email: 'phamthid@example.com',
        phone: '0923 456 789',
        status: 'active',
        totalBookings: 4,
        totalSpent: 5297000,
        lastBooking: '10/04/2024',
        address: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
        dob: '10/09/1988',
        registrationDate: '05/01/2024',
        bookingHistory: [
          {
            key: '1',
            id: 'BK004',
            tourName: 'TOUR DU LỊCH NHA TRANG',
            bookingDate: '05/04/2024',
            departureDate: '10/04/2024',
            status: 'completed',
            amount: 1799000,
            participants: 2,
            paymentMethod: 'PayPal',
            paymentStatus: 'paid',
          },
          {
            key: '2',
            id: 'BK007',
            tourName: 'TOUR DU LỊCH MỸ THO',
            bookingDate: '25/03/2024',
            departureDate: '30/03/2024',
            status: 'completed',
            amount: 699000,
            participants: 3,
            paymentMethod: 'Thẻ tín dụng',
            paymentStatus: 'paid',
          },
          {
            key: '3',
            id: 'BK008',
            tourName: 'TOUR DU LỊCH CẦN THƠ',
            bookingDate: '15/03/2024',
            departureDate: '20/03/2024',
            status: 'completed',
            amount: 799000,
            participants: 2,
            paymentMethod: 'Chuyển khoản',
            paymentStatus: 'paid',
          },
          {
            key: '4',
            id: 'BK010',
            tourName: 'TOUR DU LỊCH ĐÀ LẠT',
            bookingDate: '20/04/2024',
            departureDate: '01/05/2024',
            status: 'pending',
            amount: 2000000,
            participants: 2,
            paymentMethod: 'Chuyển khoản',
            paymentStatus: 'pending',
          },
        ],
        reviewHistory: [
          {
            key: '1',
            id: 'RV004',
            tourName: 'TOUR DU LỊCH NHA TRANG',
            reviewDate: '15/04/2024',
            rating: 4,
            comment: 'Biển đẹp, thời tiết tốt. Rất đáng để đi.',
          },
          {
            key: '2',
            id: 'RV005',
            tourName: 'TOUR DU LỊCH MỸ THO',
            reviewDate: '02/04/2024',
            rating: 5,
            comment: 'Tour miền Tây rất thú vị, được thưởng thức nhiều món ăn đặc sản.',
          },
          {
            key: '3',
            id: 'RV006',
            tourName: 'TOUR DU LỊCH CẦN THƠ',
            reviewDate: '22/03/2024',
            rating: 3,
            comment: 'Tour ổn, nhưng thời gian di chuyển hơi dài.',
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

  const bookingColumns: ColumnsType<BookingHistory> = [
    {
      title: RenderBoldTitle('Mã Tour'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: RenderBoldTitle('Tour Du Lịch'),
      dataIndex: 'tourName',
      key: 'tourName',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (tour: string) => (
        <Tooltip placement="topLeft" title={tour}>
          <span>{tour}</span>
        </Tooltip>
      ),
    },
    {
      title: RenderBoldTitle('Ngày Đặt'),
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      width: 120,
    },
    {
      title: RenderBoldTitle('Ngày Khởi Hành'),
      dataIndex: 'departureDate',
      key: 'departureDate',
      width: 120,
    },
    {
      title: RenderBoldTitle('Thanh Toán'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 120,
      render: (status: string) => {
        const colors = {
          paid: 'green',
          pending: 'orange',
          refunded: 'red',
        };
        const labels = {
          paid: 'Đã thanh toán',
          pending: 'Chưa thanh toán',
          refunded: 'Đã hoàn tiền',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {labels[status as keyof typeof labels]}
          </Tag>
        );
      },
    },
    {
      title: RenderBoldTitle('Số Người'),
      dataIndex: 'participants',
      key: 'participants',
      width: 100,
    },
    {
      title: RenderBoldTitle('Giá Tiền'),
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
  ];

  if (loading) {
    return (
      <Loading />
    );
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
      <div className="flex justify-end mb-4">
        <Button type="primary" color="primary" variant="text" icon={<ArrowLeftOutlined />} onClick={onBack}>
          Back to Customers
        </Button>
      </div>
      <Card className="shadow-sm">
        <div className="flex items-start">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            className="mr-6"
          />
          <div>
            <Title level={3}>{customer.name}</Title>
            <Tag color={customer.status === 'active' ? 'green' : 'red'}>
              {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </Tag>
            <div className="mt-2">
              <Text type="secondary">Customer ID: {customer.id}</Text>
            </div>
          </div>
        </div>
      </Card>

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
              title={RenderBoldTitle("Joined Date")}
              value={customer.registrationDate}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

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
              <Descriptions.Item label="Address" span={2}>
                {customer.address || 'Not provided'}
              </Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab="Booking History" key="bookings">
            <Table
              columns={bookingColumns}
              dataSource={customer.bookingHistory}
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