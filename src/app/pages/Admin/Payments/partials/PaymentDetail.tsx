import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Descriptions, 
  Tag, 
  Button, 
  Card, 
  Space, 
  message, 
  Steps, 
  Divider,
  Row,
  Col,
  Statistic,
  Tabs
} from "antd";
import {
  ArrowLeftOutlined,
  CreditCardOutlined,
  BankOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  PrinterOutlined,
  UserOutlined,
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined
} from "@ant-design/icons";
import Loading from "@/app/components/Loading";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const { Title, Paragraph, Text } = Typography;

interface PaymentData {
  key: string;
  paymentId: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  tour: string;
  tourId: string;
  amount: number;
  date: string;
  method: "credit_card" | "paypal" | "bank_transfer";
  status: "completed" | "pending" | "failed" | "refunded";
  cardInfo?: {
    cardType: string;
    lastFourDigits: string;
  };
  bankInfo?: {
    bankName: string;
    accountNumber: string;
  };
  transactionId: string;
  bookingDetails: {
    bookingId: string;
    bookingDate: string;
    participants: number;
    departureDate: string;
  };
  refundInfo?: {
    refundDate: string;
    refundAmount: number;
    reason: string;
  };
}

interface PaymentDetailProps {
  paymentId: string;
  onBack: () => void;
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ paymentId, onBack }) => {
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would be an API call
  useEffect(() => {
    setLoading(true);
    // Simulating API fetch
    const mockData: Record<string, PaymentData> = {
      "1": {
        key: "1",
        paymentId: "PAY-001",
        customer: "Nguyễn Văn A",
        customerEmail: "nguyenvana@example.com",
        customerPhone: "0901234567",
        tour: "TOUR DU LỊCH ĐÀ LẠT",
        tourId: "TOUR-001",
        amount: 2590000,
        date: "15/04/2024",
        method: "credit_card",
        status: "completed",
        cardInfo: {
          cardType: "Visa",
          lastFourDigits: "4567",
        },
        transactionId: "TXN123456789",
        bookingDetails: {
          bookingId: "BK001",
          bookingDate: "10/04/2024",
          participants: 2,
          departureDate: "20/05/2024",
        },
      },
      "2": {
        key: "2",
        paymentId: "PAY-002",
        customer: "Trần Thị B",
        customerEmail: "tranthib@example.com",
        customerPhone: "0912345678",
        tour: "TOUR DU LỊCH PHÚ QUỐC",
        tourId: "TOUR-002",
        amount: 4990000,
        date: "16/04/2024",
        method: "paypal",
        status: "pending",
        transactionId: "TXN234567890",
        bookingDetails: {
          bookingId: "BK002",
          bookingDate: "12/04/2024",
          participants: 3,
          departureDate: "25/05/2024",
        },
      },
      "3": {
        key: "3",
        paymentId: "PAY-003",
        customer: "Lê Văn C",
        customerEmail: "levanc@example.com",
        customerPhone: "0923456789",
        tour: "TOUR DU LỊCH ĐÀ NẴNG",
        tourId: "TOUR-003",
        amount: 6500000,
        date: "17/04/2024",
        method: "bank_transfer",
        status: "failed",
        bankInfo: {
          bankName: "Vietcombank",
          accountNumber: "****7890",
        },
        transactionId: "TXN345678901",
        bookingDetails: {
          bookingId: "BK003",
          bookingDate: "14/04/2024",
          participants: 4,
          departureDate: "30/05/2024",
        },
      },
      "4": {
        key: "4",
        paymentId: "PAY-004",
        customer: "Phạm Thị D",
        customerEmail: "phamthid@example.com",
        customerPhone: "0934567890",
        tour: "TOUR DU LỊCH NHA TRANG",
        tourId: "TOUR-004",
        amount: 5290000,
        date: "18/04/2024",
        method: "credit_card",
        status: "refunded",
        cardInfo: {
          cardType: "Mastercard",
          lastFourDigits: "1234",
        },
        transactionId: "TXN456789012",
        bookingDetails: {
          bookingId: "BK004",
          bookingDate: "15/04/2024",
          participants: 2,
          departureDate: "05/06/2024",
        },
        refundInfo: {
          refundDate: "20/04/2024",
          refundAmount: 5290000,
          reason: "Hủy tour do khách không thể tham gia",
        },
      },
    };

    // Mock API call with setTimeout
    const fetchData = setTimeout(() => {
      if (paymentId && mockData[paymentId]) {
        setPayment(mockData[paymentId]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, [paymentId]);

  const handlePrintReceipt = () => {
    if (payment) {
      message.success(`Đang in biên lai thanh toán #${payment.paymentId}`);
      // In a real app, this would open a print dialog or generate a PDF
    }
  };

  const handleApprovePayment = () => {
    if (payment && payment.status === "pending") {
      setPayment({ ...payment, status: "completed" });
      message.success("Thanh toán đã được xác nhận thành công");
    }
  };

  const handleRefundPayment = () => {
    if (payment && payment.status === "completed") {
      const refundDate = new Date().toLocaleDateString("vi-VN");
      setPayment({
        ...payment,
        status: "refunded",
        refundInfo: {
          refundDate,
          refundAmount: payment.amount,
          reason: "Hoàn tiền theo yêu cầu của quản trị viên",
        },
      });
      message.success("Đã hoàn tiền thành công");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!payment) {
    return (
      <div className="text-center p-8">
        <Title level={4}>Không tìm thấy thanh toán</Title>
        <Button type="primary" onClick={onBack} className="mt-4">
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCardOutlined />;
      case "bank_transfer":
        return <BankOutlined />;
      case "paypal":
        return <DollarOutlined />;
      default:
        return <DollarOutlined />;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "pending":
        return <ClockCircleOutlined />;
      case "failed":
        return <CloseCircleOutlined />;
      case "refunded":
        return <DollarOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStepStatus = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "completed":
        return "finish";
      case "pending":
        return "process";
      case "failed":
        return "error";
      case "refunded":
        return "finish";
      default:
        return "wait";
    }
  };

  const statusColors = {
    completed: "green",
    pending: "orange",
    failed: "red",
    refunded: "blue",
  };

  const statusLabels = {
    completed: "Hoàn thành",
    pending: "Đang xử lý",
    failed: "Thất bại",
    refunded: "Hoàn tiền",
  };

  const methodLabels = {
    credit_card: "Thẻ tín dụng",
    paypal: "PayPal",
    bank_transfer: "Chuyển khoản",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <Button
          type="link"
          color="primary"
          variant="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
        >
          Quay lại danh sách
        </Button>
      </div>

      <Title level={3}>Chi Tiết Thanh Toán</Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card variant="borderless" className="sticky top-5">
            <div className="flex flex-col items-center mb-4">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                {getPaymentMethodIcon(payment.method)}
              </div>
              <Title level={4} className="mb-0 text-center">
                {payment.paymentId}
              </Title>
              <div className="mt-2">
                <Tag color={statusColors[payment.status as keyof typeof statusColors]} className="px-3 py-1">
                  {getPaymentStatusIcon(payment.status)} {statusLabels[payment.status as keyof typeof statusLabels]}
                </Tag>
              </div>
            </div>
            
            <Divider />
            
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Statistic 
                  title="Tổng Tiền" 
                  value={payment.amount} 
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  suffix="VNĐ"
                  formatter={(value) => `${value.toLocaleString("vi-VN")}`} 
                />
              </Col>
            </Row>

            <Divider />

            <Descriptions column={1} size="small">
              <Descriptions.Item label="Phương thức">
                {methodLabels[payment.method as keyof typeof methodLabels]}
              </Descriptions.Item>
              <Descriptions.Item label="Mã giao dịch">
                {payment.transactionId}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày giao dịch">
                {payment.date}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-6">
              <Space direction="vertical" style={{ width: '100%' }}>
                {payment.status === "completed" && (
                  <Button 
                    type="primary" 
                    icon={<PrinterOutlined />} 
                    onClick={handlePrintReceipt}
                    block
                  >
                    In Biên Lai
                  </Button>
                )}
                {payment.status === "pending" && (
                  <Button 
                    type="primary" 
                    icon={<CheckCircleOutlined />} 
                    onClick={handleApprovePayment}
                    block
                  >
                    Xác Nhận Thanh Toán
                  </Button>
                )}
                {payment.status === "completed" && (
                  <Button 
                    danger 
                    icon={<DollarOutlined />} 
                    onClick={handleRefundPayment}
                    block
                  >
                    Hoàn Tiền
                  </Button>
                )}
              </Space>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title={RenderBoldTitle("Thông Tin Giao Dịch")} className="mb-6" variant="borderless">
            <Tabs
              defaultActiveKey="booking"
              items={[
                {
                  key: 'booking',
                  label: RenderBoldTitle('Đặt Tour'),
                  children: (
                    <Descriptions column={1} bordered>
                      <Descriptions.Item label="Mã đặt tour">
                        {payment.bookingDetails.bookingId}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tour">
                        <div className="flex items-center">
                          <GlobalOutlined className="mr-2" /> {payment.tour} (#{payment.tourId})
                        </div>
                      </Descriptions.Item>
                      <Descriptions.Item label="Ngày khởi hành">
                        <CalendarOutlined className="mr-2" /> {payment.bookingDetails.departureDate}
                      </Descriptions.Item>
                      <Descriptions.Item label="Số người tham gia">
                        <TeamOutlined className="mr-2" /> {payment.bookingDetails.participants} người
                      </Descriptions.Item>
                    </Descriptions>
                  ),
                },
                {
                  key: 'payment',
                  label: RenderBoldTitle('Thanh Toán'),
                  children: (
                    <Steps
                      direction="horizontal"
                      current={payment.status === "failed" ? 1 : 2}
                      status={getStepStatus(payment.status)}
                      items={[
                        {
                          title: 'Đặt Tour',
                          description: payment.bookingDetails.bookingDate,
                        },
                        {
                          title: 'Thanh Toán',
                          description: payment.date,
                          status: payment.status === "failed" ? "error" : "finish",
                        },
                        {
                          title: payment.status === "refunded" ? "Hoàn Tiền" : "Hoàn Tất",
                          description: payment.status === "refunded" 
                            ? payment.refundInfo?.refundDate 
                            : (payment.status === "completed" ? "Giao dịch thành công" : "Chờ xử lý"),
                          status: payment.status === "pending" ? "wait" : 
                                  payment.status === "failed" ? "wait" : "finish",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />

            <Divider />

            <Title level={5}>Thông Tin Chi Tiết</Title>
            <Descriptions column={1} bordered>
              {payment.cardInfo && (
                <Descriptions.Item label="Thông Tin Thẻ">
                  {payment.cardInfo.cardType} **** **** **** {payment.cardInfo.lastFourDigits}
                </Descriptions.Item>
              )}
              {payment.bankInfo && (
                <Descriptions.Item label="Thông Tin Ngân Hàng">
                  {payment.bankInfo.bankName} - Tài khoản: {payment.bankInfo.accountNumber}
                </Descriptions.Item>
              )}
              {payment.refundInfo && (
                <>
                  <Descriptions.Item label="Ngày Hoàn Tiền">
                    {payment.refundInfo.refundDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số Tiền Hoàn">
                    {payment.refundInfo.refundAmount.toLocaleString("vi-VN")} VNĐ
                  </Descriptions.Item>
                  <Descriptions.Item label="Lý Do Hoàn Tiền">
                    {payment.refundInfo.reason}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Thông Tin Đặt Tour")} className="mb-6" variant="borderless">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Mã đặt tour">
                {payment.bookingDetails.bookingId}
              </Descriptions.Item>
              <Descriptions.Item label="Tour">
                <div className="flex items-center">
                  <GlobalOutlined className="mr-2" /> {payment.tour} (#{payment.tourId})
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày khởi hành">
                <CalendarOutlined className="mr-2" /> {payment.bookingDetails.departureDate}
              </Descriptions.Item>
              <Descriptions.Item label="Số người tham gia">
                <TeamOutlined className="mr-2" /> {payment.bookingDetails.participants} người
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="mb-6" variant="borderless">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Họ và tên">
                <UserOutlined className="mr-2" /> {payment.customer}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {payment.customerEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {payment.customerPhone}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail; 