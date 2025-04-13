import React from 'react';
import { Button, Space, Tag, Input, Select, DatePicker, Tooltip, Card } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
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
  const columns: ColumnsType<BookingData> = [
    {
      title: RenderBoldTitle('Mã Đơn Hàng'),
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
    },
    {
      title: RenderBoldTitle('Khách Hàng'),
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150,
    },
    {
      title: RenderBoldTitle('Sản Phẩm'),
      dataIndex: 'products',
      key: 'products',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (products: string) => (
        <Tooltip placement="topLeft" title={products}>
          <span>{products}</span>
        </Tooltip>
      ),
    },
    {
      title: RenderBoldTitle('Ngày Đặt'),
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
          <Tag color={colors[status]}>
            {labels[status]}
          </Tag>
        );
      },
    },
    {
      title: RenderBoldTitle('Giá Tiền'),
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
        <ActionButtons
          onView={() => onViewOrder(record.orderId)}
          onEdit={() => onEditOrder(record.orderId)}
          onDelete={() => handleDelete(record.orderId)}
          deleteTooltip="Xóa đơn hàng"
          deleteDescription="Bạn có chắc chắn muốn xóa đơn hàng này?"
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
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

      <Card className="shadow-sm">
        <div className="mb-4 flex gap-4">
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
          />
          <Select
            placeholder="Trạng Thái Đơn Hàng"
            className="min-w-[150px]"
            options={[
              { value: 'completed', label: 'Hoàn Thành' },
              { value: 'processing', label: 'Đang Xử Lý' },
              { value: 'cancelled', label: 'Đã Hủy' },
            ]}
          />
          <Select
            placeholder="Trạng Thái Thanh Toán"
            className="min-w-[150px]"
            options={[
              { value: 'paid', label: 'Đã Thanh Toán' },
              { value: 'pending', label: 'Chưa Thanh Toán' },
              { value: 'refunded', label: 'Đã Hoàn Tiền' },
            ]}
          />
          <RangePicker placeholder={['Từ Ngày', 'Đến Ngày']} />
        </div>

        <AdminTable
          columns={columns}
          dataSource={data}
          rowKey="key"
          itemsName="đơn hàng"
        />
      </Card>
    </div>
  );
};

export default BookingList; 