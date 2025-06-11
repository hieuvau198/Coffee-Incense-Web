import React, { useState, useEffect } from 'react';
import { Button, Tag, Input, Select, DatePicker, Table, Card, Popconfirm, Space, message } from 'antd';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Booking, BookingStatus } from '../../../../models/booking';
import { useBookingCrud } from '../../../../hooks/useBookingCrud';

const { RangePicker } = DatePicker;

interface BookingListProps {
  onAddBooking: () => void;
  onViewBooking: (bookingId: string) => void;
  onEditBooking: (booking: Booking) => void;
}

const BookingList: React.FC<BookingListProps> = ({
  onAddBooking,
  onViewBooking,
  onEditBooking,
}) => {
  const { bookings, loading, error, subscribeToBookings, deleteBooking } = useBookingCrud();
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | '' | undefined>('');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToBookings((updatedBookings) => {
    });
    return () => unsubscribe();
  }, [subscribeToBookings]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: BookingStatus | '' | undefined) => {
    setStatusFilter(value);
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      message.success("Xóa đặt chỗ thành công");
    } catch (err) {
      message.error("Có lỗi xảy ra khi xóa đặt chỗ");
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchSearch = !searchText 
      || booking.userName.toLowerCase().includes(searchText.toLowerCase())
      || booking.userEmail.toLowerCase().includes(searchText.toLowerCase())
      || booking.notes?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchStatus = !statusFilter || booking.status === statusFilter;
    
    const matchDate = !dateRange || (
      booking.bookingDate >= dateRange[0] && booking.bookingDate <= dateRange[1]
    );
    
    return matchSearch && matchStatus && matchDate;
  });

  const columns: ColumnsType<Booking> = [
    {
      title: 'ID Đặt Chỗ',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'userName',
      key: 'userName',
      width: 180,
    },
    {
      title: 'Email Khách Hàng',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: 200,
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      width: 120,
      sorter: (a, b) => a.bookingDate.localeCompare(b.bookingDate),
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'notes',
      key: 'notes',
      width: 250,
      ellipsis: true,
      render: (text) => text || 'Không có ghi chú',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: BookingStatus) => {
        const colors: Record<BookingStatus, string> = {
          [BookingStatus.Pending]: 'orange',
          [BookingStatus.Confirmed]: 'green',
          [BookingStatus.Cancelled]: 'red',
          [BookingStatus.Completed]: 'blue',
        };
        return (
          <Tag color={colors[status]} className="text-center">
            {status}
          </Tag>
        );
      },
      filters: Object.values(BookingStatus).map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined className="text-lg" />} 
            onClick={() => onViewBooking(record.id as string)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined className="text-lg" />} 
            onClick={() => onEditBooking(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa đặt chỗ này?"
            onConfirm={() => handleDelete(record.id as string)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" danger icon={<DeleteOutlined className="text-lg" />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Đặt Chỗ</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAddBooking}
          className="bg-[#8B7156] hover:bg-[#64503C]"
        >
          Tạo Đặt Chỗ
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 max-w-full">
          <Input
            placeholder="Tìm kiếm đặt chỗ..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            placeholder="Trạng Thái Đặt Chỗ"
            style={{ width: 200 }}
            allowClear
            value={statusFilter}
            onChange={handleStatusFilter}
            options={[
              { value: '', label: 'Tất cả trạng thái' },
              ...Object.values(BookingStatus).map(status => ({ value: status, label: status }))
            ]}
          />
          
          <RangePicker
            style={{ width: 250 }}
            onChange={handleDateRangeChange}
            format="YYYY-MM-DD"
          />
        </div>
      </Card>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomRight'],
            showTotal: (total) => `Tổng số ${total} đặt chỗ`
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

export default BookingList; 