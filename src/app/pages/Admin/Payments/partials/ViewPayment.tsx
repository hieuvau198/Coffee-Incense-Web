import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Tag, message, Select, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PaymentData } from '@/app/services/paymentService';
import { paymentService } from '@/app/services/paymentService';
import { format } from 'date-fns';

interface ViewPaymentProps {
  paymentId: string;
  onBack: () => void;
}

const ViewPayment: React.FC<ViewPaymentProps> = ({ paymentId, onBack }) => {
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchPaymentDetails();
  }, [paymentId]);

  const fetchPaymentDetails = async () => {
    try {
      const paymentData = await paymentService.getPaymentById(paymentId);
      setPayment(paymentData);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      message.error('Không thể tải thông tin thanh toán');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!payment) return;

    setUpdating(true);
    try {
      await paymentService.updatePaymentStatus(paymentId, newStatus);
      message.success('Cập nhật trạng thái thanh toán thành công');
      fetchPaymentDetails(); // Refresh payment details
    } catch (error) {
      console.error('Error updating payment status:', error);
      message.error('Không thể cập nhật trạng thái thanh toán');
    } finally {
      setUpdating(false);
    }
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
    return <div>Đang tải...</div>;
  }

  if (!payment) {
    return <div>Không tìm thấy thông tin thanh toán</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
        >
          Quay lại
        </Button>
        <Space>
          <span>Trạng thái:</span>
          <Select
            value={payment.status}
            onChange={handleStatusChange}
            loading={updating}
            style={{ width: 150 }}
            options={[
              { value: 'pending', label: 'Đang chờ' },
              { value: 'completed', label: 'Hoàn thành' },
              { value: 'failed', label: 'Thất bại' },
            ]}
          />
        </Space>
      </div>

      <Card className="shadow-sm">
        <Descriptions title="Thông Tin Thanh Toán" bordered>
          <Descriptions.Item label="ID Thanh Toán" span={3}>
            #{payment.id}
          </Descriptions.Item>
          <Descriptions.Item label="ID Đơn Hàng" span={3}>
            #{payment.orderId}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng Thái" span={3}>
            <Tag color={getStatusColor(payment.status)}>
              {getStatusText(payment.status)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Số Tiền" span={3}>
            {payment.amount.toLocaleString('vi-VN')} VNĐ
          </Descriptions.Item>
          <Descriptions.Item label="Ngày Thanh Toán" span={3}>
            {payment.paymentDate ? format(payment.paymentDate.toDate(), 'dd/MM/yyyy HH:mm') : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="shadow-sm">
        <Descriptions title="Thông Tin Khách Hàng" bordered>
          <Descriptions.Item label="Họ và Tên" span={3}>
            {payment.customerInfo.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số Điện Thoại" span={3}>
            {payment.customerInfo.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {payment.customerInfo.email}
          </Descriptions.Item>
          <Descriptions.Item label="Địa Chỉ" span={3}>
            {payment.customerInfo.address}
          </Descriptions.Item>
        </Descriptions>
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
    </div>
  );
};

export default ViewPayment; 