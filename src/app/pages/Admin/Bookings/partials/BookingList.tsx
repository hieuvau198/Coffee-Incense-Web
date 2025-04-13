import React, { useState } from 'react';
import { Button, Tag, Input, Select, DatePicker, Space, Table, Card, message } from 'antd';
import { SearchOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import ActionButtons from '@/app/components/ActionButton';
import AdminTable from '@/app/components/AdminTable';

const { RangePicker } = DatePicker;

interface BookingData {
  key: string;
  orderId: string;
  customerName: string;
  products: string;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

interface BookingListProps {
  onAddOrder: () => void;
  onViewOrder: (id: string) => void;
  onEditOrder: (id: string) => void;
  handleDelete: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ 
  onAddOrder, 
  onViewOrder, 
  onEditOrder,
  handleDelete
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [paymentFilter, setPaymentFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handlePaymentFilter = (value: string) => {
    setPaymentFilter(value);
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      handleDelete(id);
    }
  };

  const columns: ColumnsType<BookingData> = [
    {
      title: 'Mã Đơn Hàng',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 150,
    },
    {
      title: 'Khách Hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 180,
    },
    {
      title: 'Sản Phẩm',
      dataIndex: 'products',
      key: 'products',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: 'completed' | 'processing' | 'cancelled') => {
        const colors = {
          completed: 'green',
          processing: 'orange',
          cancelled: 'red',
        };
        const labels = {
          completed: 'HOÀN THÀNH',
          processing: 'ĐANG XỬ LÝ',
          cancelled: 'ĐÃ HỦY',
        };
        return (
          <Tag color={colors[status]} className="text-center">
            {labels[status]}
          </Tag>
        );
      },
      filters: [
        { text: 'Hoàn Thành', value: 'completed' },
        { text: 'Đang Xử Lý', value: 'processing' },
        { text: 'Đã Hủy', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Thanh Toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 130,
      render: (status: 'paid' | 'pending' | 'refunded') => {
        const colors = {
          paid: 'green',
          pending: 'orange',
          refunded: 'blue',
        };
        const labels = {
          paid: 'ĐÃ THANH TOÁN',
          pending: 'CHƯA THANH TOÁN',
          refunded: 'ĐÃ HOÀN TIỀN',
        };
        return (
          <Tag color={colors[status]}>
            {labels[status]}
          </Tag>
        );
      },
      filters: [
        { text: 'Đã Thanh Toán', value: 'paid' },
        { text: 'Chưa Thanh Toán', value: 'pending' },
        { text: 'Đã Hoàn Tiền', value: 'refunded' },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EyeOutlined className="text-lg" />} 
          onClick={() => onViewOrder(record.orderId)}
        />
      ),
    },
  ];

  const data: BookingData[] = [
    {
      key: '1',
      orderId: 'OR001',
      customerName: 'Nguyễn Văn A',
      products: 'Hương Cà Phê (2), Nụ Hương Cà Phê (1)',
      date: '2024-04-15',
      status: 'completed',
      amount: 499000,
      paymentStatus: 'paid',
    },
    {
      key: '2',
      orderId: 'OR002',
      customerName: 'Trần Thị B',
      products: 'Bột Hương Cà Phê (3), Nhang Vòng Cà Phê (2)',
      date: '2024-05-20',
      status: 'processing',
      amount: 780000,
      paymentStatus: 'pending',
    }
  ];

  // Filter data based on search and filters
  const filteredData = data.filter(item => {
    const matchSearch = searchText === '' || 
      item.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.products.toLowerCase().includes(searchText.toLowerCase());
    
    const matchStatus = statusFilter === '' || item.status === statusFilter;
    const matchPayment = paymentFilter === '' || item.paymentStatus === paymentFilter;
    
    // Date range filter logic would go here
    
    return matchSearch && matchStatus && matchPayment;
  });

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Đơn Hàng</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAddOrder}
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
            value={statusFilter || undefined}
            onChange={handleStatusFilter}
            options={[
              { value: '', label: 'Tất cả trạng thái' },
              { value: 'completed', label: 'Hoàn Thành' },
              { value: 'processing', label: 'Đang Xử Lý' },
              { value: 'cancelled', label: 'Đã Hủy' },
            ]}
          />
          
          <Select
            placeholder="Trạng Thái Thanh Toán"
            style={{ width: 200 }}
            allowClear
            value={paymentFilter || undefined}
            onChange={handlePaymentFilter}
            options={[
              { value: '', label: 'Tất cả thanh toán' },
              { value: 'paid', label: 'Đã Thanh Toán' },
              { value: 'pending', label: 'Chưa Thanh Toán' },
              { value: 'refunded', label: 'Đã Hoàn Tiền' },
            ]}
          />
          
          <RangePicker 
            placeholder={['Từ Ngày', 'Đến Ngày']}
            onChange={handleDateRangeChange}
          />
        </div>
      </Card>
      
      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
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