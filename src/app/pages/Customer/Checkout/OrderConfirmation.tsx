import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F2EA] py-10 pt-20 flex items-center justify-center">
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Đơn hàng của bạn đã được tiếp nhận và đang chờ xử lý. Chúng tôi sẽ gửi email xác nhận chi tiết đơn hàng đến bạn sớm nhất."
        extra={[
          <Button 
            type="primary" 
            key="console"
            className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C]"
            onClick={() => navigate('/')}
          >
            Quay về trang chủ
          </Button>,
          <Button 
            key="buy"
            onClick={() => navigate('/products')}
          >
            Tiếp tục mua sắm
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderConfirmation; 