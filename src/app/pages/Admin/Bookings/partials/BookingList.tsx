import React from 'react';
import { Table, Button, Space, Tag, Input, Select, DatePicker, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { RangePicker } = DatePicker;

interface BookingDataType {
  key: string;
  bookingId: string;
  customerName: string;
  tourName: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

interface BookingListProps {
  onAddBooking: () => void;
  onViewBooking: (id: string) => void;
  onEditBooking: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ 
  onAddBooking, 
  onViewBooking, 
  onEditBooking 
}) => {
  const columns: ColumnsType<BookingDataType> = [
    {
      title: RenderBoldTitle('Mã Đặt Tour'),
      dataIndex: 'bookingId',
      key: 'bookingId',
      width: 100,
    },
    {
      title: RenderBoldTitle('Khách Hàng'),
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150,
    },
    {
      title: RenderBoldTitle('Tour'),
      dataIndex: 'tourName',
      key: 'tourName',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (tourName: string) => (
        <Tooltip placement="topLeft" title={tourName}>
          <span>{tourName}</span>
        </Tooltip>
      ),
    },
    {
      title: RenderBoldTitle('Ngày Đi'),
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: RenderBoldTitle('Trạng Thái'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: 'confirmed' | 'pending' | 'cancelled') => {
        const colors = {
          confirmed: 'green',
          pending: 'orange',
          cancelled: 'red',
        };
        return (
          <Tag color={colors[status]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: RenderBoldTitle('Giá Tiền (VNĐ)'),
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: RenderBoldTitle('Thao Tác'),
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="link"
              color="blue"
              variant="solid"
              icon={<EyeOutlined />}
              onClick={() => onViewBooking(record.bookingId)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              color="primary"
              variant="solid"
              icon={<EditOutlined />}
              onClick={() => onEditBooking(record.bookingId)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="link"
              color="danger"
              variant="solid"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: BookingDataType[] = [
    {
      key: '1',
      bookingId: 'BK001',
      customerName: 'John Doe',
      tourName: 'Bali Paradise Tour',
      date: '2024-04-15',
      status: 'confirmed',
      amount: 1299000,
      paymentStatus: 'paid',
    },
    {
      key: '2',
      bookingId: 'BK002',
      customerName: 'Jane Smith',
      tourName: 'Tokyo Explorer',
      date: '2024-05-20',
      status: 'pending',
      amount: 1499000,
      paymentStatus: 'pending',
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản Lý Đặt Tour</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAddBooking}
        >
          Tạo Đặt Tour
        </Button>
      </div>

      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Tìm kiếm đặt tour..."
          prefix={<SearchOutlined />}
          className="max-w-xs"
        />
        <Select
          placeholder="Trạng Thái Đặt Tour"
          style={{ width: 200 }}
          options={[
            { value: 'confirmed', label: 'Đã Xác Nhận' },
            { value: 'pending', label: 'Đang Chờ' },
            { value: 'cancelled', label: 'Đã Hủy' },
          ]}
        />
        <Select
          placeholder="Trạng Thái Thanh Toán"
          style={{ width: 200 }}
          options={[
            { value: 'paid', label: 'Đã Thanh Toán' },
            { value: 'pending', label: 'Chưa Thanh Toán' },
            { value: 'refunded', label: 'Đã Hoàn Tiền' },
          ]}
        />
        <RangePicker placeholder={['Từ Ngày', 'Đến Ngày']} />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} đặt tour`,
        }}
        scroll={{ x: 1100 }}
      />
    </div>
  );
};

export default BookingList; 