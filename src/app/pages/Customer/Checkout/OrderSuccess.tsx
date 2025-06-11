import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F2EA] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Result
          icon={<CheckCircleOutlined style={{ color: '#8B7156' }} />}
          status="success"
          title="Đặt hàng thành công!"
          subTitle="Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất."
          extra={[
            <Button 
              key="home" 
              type="primary" 
              onClick={() => navigate('/')}
              className="bg-[#8B7156] hover:bg-[#64503C]"
            >
              Về trang chủ
            </Button>,
            <Button 
              key="orders" 
              onClick={() => navigate('/orders')}
            >
              Xem đơn hàng
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default OrderSuccess; 