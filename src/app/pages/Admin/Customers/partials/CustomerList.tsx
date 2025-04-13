import { EyeOutlined, MailOutlined, PhoneOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { Title } = Typography;
const { Option } = Select;

// CustomerData interface
interface CustomerData {
  key: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
}

// Props interface
interface CustomerListProps {
  onViewCustomer: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onViewCustomer }) => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  // Fetch customer data
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);

      // Mock data
      const mockData: CustomerData[] = [
        {
          key: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          status: 'active',
          totalBookings: 8,
          totalSpent: 1240.50,
          lastBooking: '2023-09-15',
        },
        {
          key: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 987-6543',
          status: 'active',
          totalBookings: 12,
          totalSpent: 2340.75,
          lastBooking: '2023-10-20',
        },
        {
          key: '3',
          name: 'Robert Johnson',
          email: 'robert.j@example.com',
          phone: '+1 (555) 456-7890',
          status: 'inactive',
          totalBookings: 3,
          totalSpent: 450.25,
          lastBooking: '2023-04-10',
        },
        {
          key: '4',
          name: 'Emily Wilson',
          email: 'emily.w@example.com',
          phone: '+1 (555) 321-8765',
          status: 'active',
          totalBookings: 6,
          totalSpent: 890.30,
          lastBooking: '2023-09-30',
        },
        {
          key: '5',
          name: 'Michael Brown',
          email: 'michael.b@example.com',
          phone: '+1 (555) 234-5678',
          status: 'inactive',
          totalBookings: 2,
          totalSpent: 320.15,
          lastBooking: '2023-02-22',
        },
      ];

      setTimeout(() => {
        setCustomers(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Filter customers based on search text and status filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText);

    const matchesStatus =
      statusFilter === 'all' ||
      customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Define table columns
  const columns: ColumnsType<CustomerData> = [
    {
      title: RenderBoldTitle('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: RenderBoldTitle('Email'),
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <Space>
          <MailOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: RenderBoldTitle('Phone'),
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => (
        <Space>
          <PhoneOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: RenderBoldTitle('Total Bookings'),
      dataIndex: 'totalBookings',
      key: 'totalBookings',
      sorter: (a, b) => a.totalBookings - b.totalBookings,
    },
    {
      title: RenderBoldTitle('Total Spent'),
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value) => `$${value.toFixed(2)}`,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: RenderBoldTitle('Last Booking'),
      dataIndex: 'lastBooking',
      key: 'lastBooking',
      sorter: (a, b) => new Date(a.lastBooking).getTime() - new Date(b.lastBooking).getTime(),
    },
    {
      title: RenderBoldTitle('Actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              type="primary"
              color="blue"
              variant="solid"
              icon={<EyeOutlined />}
              onClick={() => onViewCustomer(record.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="shadow-sm">
      <div className="mb-6">
        <Title level={3}>Customers</Title>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3">
            <Input
              placeholder="Search customers..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCustomers}
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} customers`,
        }}
        rowKey="key"
      />
    </div>
  );
};

export default CustomerList; 