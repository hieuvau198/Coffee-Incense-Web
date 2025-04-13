import React, { useState } from "react";
import { Tag, Input, Select, DatePicker, Card, Table, Button, Space } from "antd";
import { SearchOutlined, EyeOutlined, PrinterOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import ActionButtons from '@/app/components/ActionButton';
import AdminTable from '@/app/components/AdminTable';

const { RangePicker } = DatePicker;

interface PaymentData {
  key: string;
  paymentId: string;
  customer: string;
  products: string;
  amount: number;
  date: string;
  method: "credit_card" | "paypal" | "bank_transfer" | "momo";
  status: "completed" | "pending" | "failed" | "refunded";
}

interface PaymentListProps {
  onViewPayment: (id: string) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ onViewPayment }) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [methodFilter, setMethodFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const [paymentData, setPaymentData] = useState<PaymentData[]>([
    {
      key: "1",
      paymentId: "PAY-001",
      customer: "Nguyễn Văn A",
      products: "Hương Cà Phê (2), Nụ Hương Cà Phê (1)",
      amount: 499000,
      date: "15/04/2024",
      method: "credit_card",
      status: "completed",
    },
    {
      key: "2",
      paymentId: "PAY-002",
      customer: "Trần Thị B",
      products: "Bột Hương Cà Phê (3), Nhang Vòng Cà Phê (2)",
      amount: 780000,
      date: "16/04/2024",
      method: "paypal",
      status: "pending",
    },
    {
      key: "3",
      paymentId: "PAY-003",
      customer: "Lê Văn C",
      products: "Hương Sào Cà Phê (4), Hương Khoanh Cà Phê (2)",
      amount: 650000,
      date: "17/04/2024",
      method: "bank_transfer",
      status: "failed",
    },
    {
      key: "4",
      paymentId: "PAY-004",
      customer: "Phạm Thị D",
      products: "Nhang Vòng Cà Phê (3), Hương Cà Phê (2)",
      amount: 529000,
      date: "18/04/2024",
      method: "momo",
      status: "refunded",
    },
  ]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleMethodFilter = (value: string) => {
    setMethodFilter(value);
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);
  };

  const handlePrintReceipt = (id: string) => {
    // In a real app, this would open a print dialog or generate a PDF
    console.log(`Đang in biên lai thanh toán #${id}`);
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: 'Mã Thanh Toán',
      dataIndex: 'paymentId',
      key: 'paymentId',
      width: 150,
    },
    {
      title: 'Khách Hàng',
      dataIndex: 'customer',
      key: 'customer',
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
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      render: (amount: number) => `${amount.toLocaleString("vi-VN")} VNĐ`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'date',
      key: 'date',
      width: 150,
    },
    {
      title: 'Phương Thức',
      dataIndex: 'method',
      key: 'method',
      width: 150,
      render: (method: string) => {
        const labels: Record<string, string> = {
          credit_card: "Thẻ tín dụng",
          paypal: "PayPal",
          bank_transfer: "Chuyển khoản",
          momo: "Ví MoMo",
        };
        return labels[method] || method;
      },
      filters: [
        { text: "Thẻ tín dụng", value: "credit_card" },
        { text: "PayPal", value: "paypal" },
        { text: "Chuyển khoản", value: "bank_transfer" },
        { text: "Ví MoMo", value: "momo" },
      ],
      onFilter: (value, record) => record.method === value,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => {
        const colors: Record<string, string> = {
          completed: "green",
          pending: "orange",
          failed: "red",
          refunded: "blue",
        };
        const labels: Record<string, string> = {
          completed: "HOÀN THÀNH",
          pending: "ĐANG XỬ LÝ",
          failed: "THẤT BẠI",
          refunded: "HOÀN TIỀN",
        };
        return (
          <Tag color={colors[status]} className="text-center">
            {labels[status]}
          </Tag>
        );
      },
      filters: [
        { text: "Hoàn thành", value: "completed" },
        { text: "Đang xử lý", value: "pending" },
        { text: "Thất bại", value: "failed" },
        { text: "Hoàn tiền", value: "refunded" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined className="text-lg" />} 
            onClick={() => onViewPayment(record.key)}
          />
          {record.status === "completed" && (
            <Button
              type="text"
              icon={<PrinterOutlined className="text-lg" />}
              onClick={() => handlePrintReceipt(record.paymentId)}
            />
          )}
        </Space>
      ),
    },
  ];

  const filteredData = paymentData.filter(payment => {
    const matchSearch = searchText === '' || 
      payment.paymentId.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.products.toLowerCase().includes(searchText.toLowerCase());
    
    const matchStatus = statusFilter === '' || payment.status === statusFilter;
    const matchMethod = methodFilter === '' || payment.method === methodFilter;
    
    // Date range filter logic would go here
    
    return matchSearch && matchStatus && matchMethod;
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
            placeholder="Trạng thái thanh toán"
            style={{ width: 200 }}
            allowClear
            value={statusFilter || undefined}
            onChange={handleStatusFilter}
            options={[
              { value: '', label: 'Tất cả trạng thái' },
              { value: "completed", label: "Hoàn thành" },
              { value: "pending", label: "Đang xử lý" },
              { value: "failed", label: "Thất bại" },
              { value: "refunded", label: "Hoàn tiền" },
            ]}
          />
          <Select
            placeholder="Phương thức thanh toán"
            style={{ width: 200 }}
            allowClear
            value={methodFilter || undefined}
            onChange={handleMethodFilter}
            options={[
              { value: '', label: 'Tất cả phương thức' },
              { value: "credit_card", label: "Thẻ tín dụng" },
              { value: "paypal", label: "PayPal" },
              { value: "bank_transfer", label: "Chuyển khoản" },
              { value: "momo", label: "Ví MoMo" },
            ]}
          />
          <RangePicker 
            placeholder={["Từ ngày", "Đến ngày"]} 
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
            showTotal: (total) => `Tổng số ${total} giao dịch`
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