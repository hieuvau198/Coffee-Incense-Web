import { MailOutlined, PhoneOutlined, SearchOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import { Input, Select, Space, Tag, Card, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

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

interface CustomerListProps {
  onViewCustomer: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onViewCustomer }) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const columns: ColumnsType<CustomerData> = [
    {
      title: 'Khách Hàng',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (text) => (
        <Space>
          <MailOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (text) => (
        <Space>
          <PhoneOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'green' : 'red'} className="text-center">
          {status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      ),
      filters: [
        { text: 'Đang Hoạt Động', value: 'active' },
        { text: 'Ngừng Hoạt Động', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Số Đơn Hàng',
      dataIndex: 'totalBookings',
      key: 'totalBookings',
      width: 120,
      sorter: (a, b) => a.totalBookings - b.totalBookings,
    },
    {
      title: 'Tổng Chi Tiêu',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      width: 150,
      render: (value) => `${value.toLocaleString('vi-VN')} VNĐ`,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'Đơn Hàng Gần Nhất',
      dataIndex: 'lastBooking',
      key: 'lastBooking',
      width: 150,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EyeOutlined className="text-lg" />} 
          onClick={() => onViewCustomer(record.key)}
        />
      ),
    },
  ];

  // Sample data
  const customers: CustomerData[] = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      status: 'active',
      totalBookings: 5,
      totalSpent: 2500000,
      lastBooking: '2024-04-15',
    },
    {
      key: '2',
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0909876543',
      status: 'inactive',
      totalBookings: 2,
      totalSpent: 980000,
      lastBooking: '2024-03-20',
    },
  ];

  const filteredCustomers = customers.filter(customer => 
    (statusFilter === 'all' || customer.status === statusFilter) &&
    (searchText === '' || 
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText))
  );

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Khách Hàng</h1>
      </div>

      <Card className="mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 max-w-full">
          <Input
            placeholder="Tìm kiếm khách hàng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Select
            placeholder="Trạng Thái"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'Tất Cả' },
              { value: 'active', label: 'Đang Hoạt Động' },
              { value: 'inactive', label: 'Ngừng Hoạt Động' },
            ]}
          />
        </div>
      </Card>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="key"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomRight'],
            showTotal: (total) => `Tổng số ${total} khách hàng`
          }}
          scroll={{ x: 1200 }}
          className="overflow-x-auto"
          size="middle"
          bordered={false}
          rowClassName={(record, index) => index % 2 === 0 ? 'bg-[#FAFAFA]' : ''}
        />
      </Card>
    </div>
  );
};

export default CustomerList; 