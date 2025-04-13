import React, { useState } from "react";
import { Table, Button, Space, Tag, Input, Select, DatePicker, Tooltip, message } from "antd";
import { SearchOutlined, EyeOutlined, PrinterOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { RangePicker } = DatePicker;

interface PaymentData {
  key: string;
  paymentId: string;
  customer: string;
  tour: string;
  amount: number;
  date: string;
  method: "credit_card" | "paypal" | "bank_transfer";
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
      tour: "TOUR DU LỊCH ĐÀ LẠT",
      amount: 2590000,
      date: "15/04/2024",
      method: "credit_card",
      status: "completed",
    },
    {
      key: "2",
      paymentId: "PAY-002",
      customer: "Trần Thị B",
      tour: "TOUR DU LỊCH PHÚ QUỐC",
      amount: 4990000,
      date: "16/04/2024",
      method: "paypal",
      status: "pending",
    },
    {
      key: "3",
      paymentId: "PAY-003",
      customer: "Lê Văn C",
      tour: "TOUR DU LỊCH ĐÀ NẴNG",
      amount: 6500000,
      date: "17/04/2024",
      method: "bank_transfer",
      status: "failed",
    },
    {
      key: "4",
      paymentId: "PAY-004",
      customer: "Phạm Thị D",
      tour: "TOUR DU LỊCH NHA TRANG",
      amount: 5290000,
      date: "18/04/2024",
      method: "credit_card",
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
      title: RenderBoldTitle('Tour'),
      dataIndex: 'tour',
      key: 'tour',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (tour: string) => (
        <Tooltip placement="topLeft" title={tour}>
          <span>{tour}</span>
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
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="link"
              color="blue"
              variant="solid"
              icon={<EyeOutlined />}
              onClick={() => onViewPayment(record.key)}
            />
          </Tooltip>
          <Tooltip title="In biên lai">
            <Button
              type="link"
              color="green"
              variant="solid"
              icon={<PrinterOutlined />}
              onClick={() => handlePrintReceipt(record.paymentId)}
              disabled={record.status !== "completed"}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Thanh Toán</h1>

      <div className="mb-6 flex flex-wrap gap-4">
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
          ]}
        />
        <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
      </div>

      <Table
        columns={columns}
        dataSource={paymentData}
        pagination={{
          total: paymentData.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} giao dịch`,
        }}
        scroll={{ x: 1100 }}
      />
    </div>
  );
};

export default PaymentList; 