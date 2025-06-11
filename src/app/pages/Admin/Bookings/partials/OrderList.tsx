import React, { useState, useEffect } from 'react';
import { Button, Tag, Input, Select, DatePicker, Table, Card, Popconfirm, Space, message } from 'antd';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { OrderData } from '../../../../services/orderService';
import { orderService } from '../../../../services/orderService';
import { format } from 'date-fns';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface BookingListProps {
  onAddBooking: () => void;
  onViewBooking: (orderId: string) => void;
  onEditBooking: (order: OrderData) => void;
}

const BookingList: React.FC<BookingListProps> = ({
  onAddBooking,
  onViewBooking,
  onEditBooking,
}) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);
  };

  const handleDelete = async (id: string) => {
    try {
      await orderService.deleteOrder(id);
      message.success("Đã xóa đơn hàng thành công");
      fetchOrders();
    } catch (err) {
      message.error("Có lỗi xảy ra khi xóa đơn hàng");
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const columns: ColumnsType<OrderData> = [
    {
      title: 'ID Đơn Hàng',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => `#${text}`,
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: ['customerInfo', 'fullName'],
      key: 'fullName',
      width: 180,
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: ['customerInfo', 'phone'],
      key: 'phone',
      width: 150,
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 150,
      render: (price: number) => `${price.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Ngày Đặt Hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 150,
      render: (date: any) => date ? format(date.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A',
      sorter: (a, b) => (a.orderDate?.toDate()?.getTime() || 0) - (b.orderDate?.toDate()?.getTime() || 0),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: 'Đang chờ', value: 'pending' },
        { text: 'Hoàn thành', value: 'completed' },
        { text: 'Đã hủy', value: 'cancelled' },
      ],
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
            title="Bạn có chắc chắn muốn xóa đơn hàng này?"
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

  const filteredOrders = orders.filter(order => {
    const matchSearch = !searchText 
      || order.customerInfo.fullName.toLowerCase().includes(searchText.toLowerCase())
      || order.customerInfo.phone.toLowerCase().includes(searchText.toLowerCase())
      || order.customerInfo.address.toLowerCase().includes(searchText.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    
    const matchDate = !dateRange || (
      (order.orderDate?.toDate() >= new Date(dateRange[0]) && order.orderDate?.toDate() <= new Date(dateRange[1]))
    );
    
    return matchSearch && matchStatus && matchDate;
  });

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Đơn Hàng</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAddBooking}
          className="bg-[#8B7156] hover:bg-[#64503C]"
        >
          Tạo Đơn Hàng
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 max-w-full">
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            placeholder="Trạng Thái Đơn Hàng"
            style={{ width: 200 }}
            allowClear
            value={statusFilter}
            onChange={handleStatusFilter}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'pending', label: 'Đang chờ' },
              { value: 'completed', label: 'Hoàn thành' },
              { value: 'cancelled', label: 'Đã hủy' },
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
          dataSource={filteredOrders}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomRight'],
            showTotal: (total) => `Tổng số ${total} đơn hàng`
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