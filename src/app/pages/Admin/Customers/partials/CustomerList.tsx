import { MailOutlined, PhoneOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Select, Space, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import ActionButtons from '@/app/components/ActionButton';
import AdminTable from '@/app/components/AdminTable';

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
      title: RenderBoldTitle('Khách Hàng'),
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
      title: RenderBoldTitle('Email'),
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
      title: RenderBoldTitle('Số Điện Thoại'),
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
      title: RenderBoldTitle('Trạng Thái'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      ),
    },
    {
      title: RenderBoldTitle('Số Đơn Hàng'),
      dataIndex: 'totalBookings',
      key: 'totalBookings',
      width: 120,
    },
    {
      title: RenderBoldTitle('Tổng Chi Tiêu'),
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      width: 150,
      render: (value) => `${value.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: RenderBoldTitle('Đơn Hàng Gần Nhất'),
      dataIndex: 'lastBooking',
      key: 'lastBooking',
      width: 150,
    },
    {
      title: RenderBoldTitle('Thao Tác'),
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <ActionButtons
          onView={() => onViewCustomer(record.key)}
          hideEdit
          hideDelete
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Khách Hàng</h1>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4 flex gap-4">
          <Input
            placeholder="Tìm kiếm khách hàng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-xs"
          />
          <Select
            placeholder="Trạng Thái"
            value={statusFilter}
            onChange={setStatusFilter}
            className="min-w-[150px]"
            options={[
              { value: 'all', label: 'Tất Cả' },
              { value: 'active', label: 'Đang Hoạt Động' },
              { value: 'inactive', label: 'Ngừng Hoạt Động' },
            ]}
          />
        </div>

        <AdminTable
          columns={columns}
          dataSource={filteredCustomers}
          loading={loading}
          rowKey="key"
          itemsName="khách hàng"
        />
      </Card>
    </div>
  );
};

export default CustomerList; 