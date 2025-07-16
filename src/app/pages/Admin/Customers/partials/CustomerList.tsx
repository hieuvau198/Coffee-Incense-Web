// src/app/pages/Admin/Customers/partials/CustomerList.tsx

import { MailOutlined, PhoneOutlined, SearchOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Select, Space, Tag, Card, Table, Popconfirm, Tooltip, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useUserCrud } from '../../../../hooks/useUserCrud';
import { User } from '../../../../models/user';
import { useNavigate } from 'react-router-dom';
import * as userApi from '../../../../modules/firebase/user'; // <--- Make sure you have delete function here

interface CustomerListProps {}

const CustomerList: React.FC<CustomerListProps> = ({ }) => {
  const { users, loading } = useUserCrud();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  // ---- EDIT/DELETE handler ----
  const handleEdit = (user: User) => {
    navigate(`/customers/edit/${user.id}`);
  };

  const handleDelete = async (user: User) => {
    setDeleting(user.id!);
    try {
      await userApi.deleteUser(user.id!); // You must implement this in your modules/firebase/user.ts
      message.success('Xóa người dùng thành công!');
    } catch (err) {
      message.error('Xóa thất bại, thử lại sau!');
    } finally {
      setDeleting(null);
    }
  };

  // ---- TABLE columns ----
  const columns: ColumnsType<User> = [
    {
      title: 'Tên',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 80,
      render: (text, record) => (
        <Space>
          <UserOutlined />
          {record.firstName || ''}{record.lastName || ''}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
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
      width: 60,
      render: (text) => (
        <Space>
          <PhoneOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role === 'admin' ? 'Admin' : 'Khách hàng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 90,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa khách hàng này?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true, loading: deleting === record.id }}
            disabled={deleting !== null}
          >
            <Tooltip title="Xóa">
              <DeleteOutlined
                className="text-red-500 hover:text-red-700 cursor-pointer"
                style={{ marginLeft: 8 }}
                onClick={e => e.stopPropagation()}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // FILTER
  const filteredUsers = users.filter(user =>
    (statusFilter === 'all' || user.role === statusFilter) &&
    (searchText === '' ||
      (user.firstName && user.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.phone && user.phone.includes(searchText)))
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
            placeholder="Vai trò"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'Tất Cả' },
              { value: 'customer', label: 'Khách hàng' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
        </div>
      </Card>
      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomRight'],
            showTotal: (total) => `Tổng số ${total} người dùng`
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
