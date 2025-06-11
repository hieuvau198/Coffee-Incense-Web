import React, { useState, useEffect } from 'react';
import {
  Tag,
  Input,
  Select,
  DatePicker,
  Card,
  Table,
  Button,
  Space,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { PaymentData } from '@/app/services/paymentService';
import { paymentService } from '@/app/services/paymentService';
import { format } from 'date-fns';

const { RangePicker } = DatePicker;

interface PaymentListProps {
  onViewPayment: (paymentId: string) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ onViewPayment }) => {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const fetchedPayments = await paymentService.getPayments();
      console.log("PaymentList.tsx - fetchedPayments:", fetchedPayments);
      setPayments(fetchedPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      message.error('Không thể tải danh sách thanh toán');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'completed':
        return 'green';
      case 'failed':
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
      case 'failed':
        return 'Thất bại';
      default:
        return status;
    }
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: 'ID Thanh Toán',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => `#${text}`,
    },
    {
      title: 'ID Đơn Hàng',
      dataIndex: 'orderId',
      key: 'orderId',
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
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Ngân Hàng',
      dataIndex: 'bankName',
      key: 'bankName',
      width: 150,
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      width: 150,
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      width: 150,
      render: (date: any) => date ? format(date.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A',
      sorter: (a, b) => (a.paymentDate?.toDate()?.getTime() || 0) - (b.paymentDate?.toDate()?.getTime() || 0),
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
        { text: 'Thất bại', value: 'failed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_text: any, record: PaymentData) => {
        console.log("PaymentList.tsx - Action column render: Full record object:", record);
        console.log("PaymentList.tsx - Action column render: record.id", record.id);
        return (
          <Space size="middle">
            <Button 
              type="text" 
              icon={<EyeOutlined className="text-lg" />} 
              onClick={() => onViewPayment(record.id as string)}
            />
          </Space>
        );
      },
    },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchSearch = !searchText 
      || payment.customerInfo.fullName.toLowerCase().includes(searchText.toLowerCase())
      || payment.customerInfo.phone.toLowerCase().includes(searchText.toLowerCase())
      || payment.orderId.toLowerCase().includes(searchText.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    const matchDate = !dateRange || (
      (payment.paymentDate?.toDate() >= new Date(dateRange[0]) && payment.paymentDate?.toDate() <= new Date(dateRange[1]))
    );
    
    return matchSearch && matchStatus && matchDate;
  });

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Thanh Toán</h1>
      </div>

      <Card className="mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 max-w-full">
          <Input
            placeholder="Tìm kiếm thanh toán..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            placeholder="Trạng Thái Thanh Toán"
            style={{ width: 200 }}
            allowClear
            value={statusFilter}
            onChange={handleStatusFilter}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'pending', label: 'Đang chờ' },
              { value: 'completed', label: 'Hoàn thành' },
              { value: 'failed', label: 'Thất bại' },
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
          dataSource={filteredPayments}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomRight'],
            showTotal: (total) => `Tổng số ${total} thanh toán`
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

export default PaymentList;
