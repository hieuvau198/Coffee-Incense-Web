import React, { useState, useEffect } from "react";
import { Typography, Descriptions, Tag, Button, Card, Space, message, Steps, Divider, Row, Col, Statistic, Select } from "antd";
import { ArrowLeftOutlined, PrinterOutlined, UserOutlined, BankOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Loading from "@/app/components/Loading";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import { PaymentData } from '@/app/services/paymentService';
import { paymentService } from '@/app/services/paymentService';
import { format } from 'date-fns';

const { Title } = Typography;

interface PaymentDetailProps {
  paymentId: string;
  onBack: () => void;
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ paymentId, onBack }) => {
  console.log("PaymentDetail.tsx - Component rendered with paymentId:", paymentId);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    console.log("PaymentDetail.tsx - useEffect triggered. paymentId:", paymentId);
    fetchPaymentDetails();
  }, [paymentId]);

  const fetchPaymentDetails = async () => {
    console.log("PaymentDetail.tsx - fetchPaymentDetails called for paymentId:", paymentId);
    setLoading(true);
    try {
      const paymentData = await paymentService.getPaymentById(paymentId);
      setPayment(paymentData);
      console.log("PaymentDetail.tsx - fetchPaymentDetails: Fetched data:", paymentData);
    } catch (error) {
      console.error('PaymentDetail.tsx - Error fetching payment details:', error);
      message.error('Không thể tải thông tin thanh toán');
    } finally {
      setLoading(false);
      console.log("PaymentDetail.tsx - fetchPaymentDetails: Loading set to false.");
    }
  };

  const handleStatusChange = async (newStatus: 'pending' | 'completed' | 'failed') => {
    if (!payment) return;

    setUpdating(true);
    try {
      await paymentService.updatePaymentStatus(paymentId, newStatus);
      message.success('Cập nhật trạng thái thanh toán thành công');
      fetchPaymentDetails();
    } catch (error) {
      console.error('Error updating payment status:', error);
      message.error('Không thể cập nhật trạng thái thanh toán');
    } finally {
      setUpdating(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
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

  if (loading) {
    console.log("PaymentDetail.tsx - Displaying Loading component.");
    return <Loading />;
  }

  if (!payment) {
    console.log("PaymentDetail.tsx - Payment data is null. Displaying 'Not found' message.");
    return (
      <div className="text-center p-8">
        <Title level={4}>Không tìm thấy thanh toán</Title>
        <Button type="primary" onClick={onBack} className="mt-4">
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const getPaymentMethodIcon = () => {
    return <BankOutlined />;
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "pending":
        return <ClockCircleOutlined />;
      case "failed":
        return <CloseCircleOutlined />;
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
      default:
        return "wait";
    }
  };

  const statusColors = {
    completed: "green",
    pending: "orange",
    failed: "red",
  };

  const statusLabels = {
    completed: "Hoàn thành",
    pending: "Đang xử lý",
    failed: "Thất bại",
  };

  const methodLabel = "Chuyển khoản ngân hàng";

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
                {getPaymentMethodIcon()} 
              </div>
              <Title level={4} className="mb-0 text-center">
                #{payment.id}
              </Title>
              <div className="mt-2">
                <Tag color={getStatusColor(payment.status)} className="px-3 py-1">
                  {getPaymentStatusIcon(payment.status)} {getStatusText(payment.status)}
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
                {methodLabel}
              </Descriptions.Item>
              <Descriptions.Item label="Mã Đơn Hàng">
                #{payment.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Thanh Toán">
                {payment.paymentDate ? format(payment.paymentDate.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A'}
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
                    onClick={() => handleStatusChange("completed")}
                    block
                  >
                    Xác Nhận Thanh Toán
                  </Button>
                )}
                {payment.status === "completed" && (
                  <Button 
                    danger 
                    icon={<BankOutlined />} 
                    onClick={() => handleStatusChange("failed")}
                    block
                  >
                    Hủy Thanh Toán
                  </Button>
                )}
                {payment.status === "failed" && (
                  <Button 
                    type="primary" 
                    icon={<ClockCircleOutlined />} 
                    onClick={() => handleStatusChange("pending")}
                    block
                  >
                    Đánh dấu chờ xử lý
                  </Button>
                )}
              </Space>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title={RenderBoldTitle("Thông Tin Chuyển Khoản")} className="mb-6" variant="borderless">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Ngân Hàng">
                {payment.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tài Khoản">
                {payment.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Tên Tài Khoản">
                {payment.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Nội Dung Chuyển Khoản">
                {payment.transferContent}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Thông Tin Khách Hàng")} className="mb-6" variant="borderless">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Họ và tên">
                <UserOutlined className="mr-2" /> {payment.customerInfo.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {payment.customerInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {payment.customerInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {payment.customerInfo.address}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Tiến Trình Thanh Toán")} className="mb-6" variant="borderless">
            <Steps
              direction="horizontal"
              current={payment.status === "failed" ? 1 : (payment.status === "pending" ? 1 : 2)}
              status={getStepStatus(payment.status)}
              items={[
                {
                  title: 'Khởi Tạo',
                  description: payment.paymentDate ? format(payment.paymentDate.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A',
                  icon: <ClockCircleOutlined />
                },
                {
                  title: 'Xử Lý',
                  description: payment.status === "pending" ? "Đang chờ xác nhận" : "Đã xử lý",
                  icon: <ClockCircleOutlined />
                },
                {
                  title: 'Hoàn Thành',
                  description: payment.status === "completed" ? "Thành công" : (payment.status === "failed" ? "Thất bại" : "Chờ xử lý"),
                  icon: payment.status === "completed" ? <CheckCircleOutlined /> : <CloseCircleOutlined />
                },
              ]}
            />
          </Card>

          <Card className="shadow-sm">
            <Descriptions title="Thông Tin Chuyển Khoản" bordered>
              <Descriptions.Item label="Ngân Hàng" span={3}>
                {payment.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số Tài Khoản" span={3}>
                {payment.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Tên Tài Khoản" span={3}>
                {payment.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Nội Dung Chuyển Khoản" span={3}>
                {payment.transferContent}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <div className="print-only">
            <Divider />
            <div className="text-center">
              <h2>BIÊN LAI THANH TOÁN</h2>
              <p>Ngày: {payment.paymentDate ? format(payment.paymentDate.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A'}</p>
              <p>Mã thanh toán: #{payment.id}</p>
              <p>Mã đơn hàng: #{payment.orderId}</p>
              <p>Số tiền: {payment.amount.toLocaleString('vi-VN')} VNĐ</p>
              <p>Trạng thái: {getStatusText(payment.status)}</p>
              <Divider />
              <p>Thông tin khách hàng:</p>
              <p>Họ và tên: {payment.customerInfo.fullName}</p>
              <p>Số điện thoại: {payment.customerInfo.phone}</p>
              <p>Email: {payment.customerInfo.email}</p>
              <p>Địa chỉ: {payment.customerInfo.address}</p>
              <Divider />
              <p>Thông tin chuyển khoản:</p>
              <p>Ngân hàng: {payment.bankName}</p>
              <p>Số tài khoản: {payment.accountNumber}</p>
              <p>Tên tài khoản: {payment.accountName}</p>
              <p>Nội dung: {payment.transferContent}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail; 