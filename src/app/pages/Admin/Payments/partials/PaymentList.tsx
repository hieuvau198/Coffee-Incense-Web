import React, { useState } from "react";
import { Button, Space, Tag, Input, Select, DatePicker, Tooltip, message, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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

  const handlePrintReceipt = (id: string) => {
    message.success(`Đang in biên lai thanh toán #${id}`);
    // In a real app, this would open a print dialog or generate a PDF
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: RenderBoldTitle('Mã Thanh Toán'),
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: RenderBoldTitle('Khách Hàng'),
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: RenderBoldTitle('Sản Phẩm'),
      dataIndex: 'products',
      key: 'products',
      width: 200,
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
      title: RenderBoldTitle('Số Tiền'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toLocaleString("vi-VN")} VNĐ`,
    },
    {
      title: RenderBoldTitle('Ngày Thanh Toán'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: RenderBoldTitle('Phương Thức'),
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => {
        const labels = {
          credit_card: "Thẻ tín dụng",
          paypal: "PayPal",
          bank_transfer: "Chuyển khoản",
          momo: "Ví MoMo",
        };
        return labels[method as keyof typeof labels];
      },
    },
    {
      title: RenderBoldTitle('Trạng Thái'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          completed: "green",
          pending: "orange",
          failed: "red",
          refunded: "blue",
        };
        const labels = {
          completed: "Hoàn thành",
          pending: "Đang xử lý",
          failed: "Thất bại",
          refunded: "Hoàn tiền",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {labels[status as keyof typeof labels]}
          </Tag>
        );
      },
    },
    {
      title: RenderBoldTitle('Thao Tác'),
      key: 'actions',
      render: (_, record) => (
        <ActionButtons
          onView={() => onViewPayment(record.key)}
          onPrint={() => handlePrintReceipt(record.paymentId)}
          hideEdit
          hideDelete
          hidePrint={false}
          disablePrint={record.status !== "completed"}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Thanh Toán</h1>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4 flex gap-4">
          <Input
            placeholder="Tìm kiếm thanh toán..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
          />
          <Select
            placeholder="Trạng thái thanh toán"
            className="min-w-[150px]"
            options={[
              { value: "completed", label: "Hoàn thành" },
              { value: "pending", label: "Đang xử lý" },
              { value: "failed", label: "Thất bại" },
              { value: "refunded", label: "Hoàn tiền" },
            ]}
          />
          <Select
            placeholder="Phương thức thanh toán"
            className="min-w-[150px]"
            options={[
              { value: "credit_card", label: "Thẻ tín dụng" },
              { value: "paypal", label: "PayPal" },
              { value: "bank_transfer", label: "Chuyển khoản" },
              { value: "momo", label: "Ví MoMo" },
            ]}
          />
          <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
        </div>

        <AdminTable
          columns={columns}
          dataSource={paymentData}
          rowKey="key"
          itemsName="giao dịch"
        />
      </Card>
    </div>
  );
};

export default PaymentList; 