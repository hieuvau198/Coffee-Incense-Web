import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  InputNumber, 
  Divider, 
  Empty, 
  Badge, 
  Tag, 
  Input, 
  Radio, 
  Space, 
  Tooltip,
  message,
  Rate
} from 'antd';
import { 
  ShoppingCartOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  CreditCardOutlined,
  TruckOutlined,
  GiftOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { CartItem } from '../../../models/cart';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity: updateCartQuantity, removeFromCart } = useCart();

  const [promoCode, setPromoCode] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId: string, newQuantity: number | null) => {
    if (newQuantity !== null) {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const applyPromoCode = () => {
    if (promoCode) {
      message.success('Áp dụng mã giảm giá thành công!');
    } else {
      message.error('Vui lòng nhập mã giảm giá');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = shippingMethod === 'express' ? 50000 : (subtotal > 200000 ? 0 : 25000);
  const discount = promoCode === 'WELCOME10' ? subtotal * 0.1 : 0;
  const total = subtotal + shippingFee - discount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F2EA] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 160 }}
              description={
                <span className="text-[#8B7156] text-lg">
                  Giỏ hàng của bạn đang trống
                </span>
              }
            >
              <Button 
                type="primary" 
                size="large"
                className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C] h-12 px-8 text-lg"
                onClick={() => navigate('/products')}
              >
                Tiếp tục mua sắm
              </Button>
            </Empty>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F2EA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            className="text-[#8B7156] hover:text-[#64503C] hover:bg-[#F9F2EA] mb-4 h-10 px-4"
            onClick={() => navigate('/products')}
          >
            Tiếp tục mua sắm
          </Button>
          <div className="flex items-center mb-2">
            <ShoppingCartOutlined className="text-3xl text-[#8B7156] mr-3" />
            <h1 className="text-3xl font-bold text-[#2D2424]">Giỏ hàng của bạn</h1>
          </div>
          <p className="text-[#8B7156]/80">
            <Badge count={cartItems.length} className="mr-2" />
            {cartItems.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card 
                key={item.productId}
                className="bg-white shadow-md border-0 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                styles={{ body: { background: '#fff' } }}
              >
                <div className="flex items-center space-x-4 p-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productTitle}
                      className="w-24 h-24 object-cover rounded-lg border border-[#8B7156]/10"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2D2424] mb-1">
                          {item.productTitle}
                        </h3>
                        {/* <p className="text-[#8B7156]/80 text-sm mb-2 line-clamp-2"> */}
                        {/* Description is not in CartItem model, remove if not needed */}
                        {/* </p> */}
                        {/* <Tag color="green">Còn hàng</Tag> */}
                      </div>
                      <Tooltip title="Xóa sản phẩm">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveItem(item.productId)}
                          className="hover:bg-red-50 p-2"
                        />
                      </Tooltip>
                    </div>
                    
                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-[#8B7156]">Số lượng:</span>
                        <InputNumber
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(value) => handleUpdateQuantity(item.productId, value)}
                          className="w-20"
                          size="small"
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#8B7156]">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-500">
                            {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Shipping Options */}
            <Card 
              title={
                <div className="flex items-center">
                  <TruckOutlined className="mr-2 text-[#8B7156]" />
                  <span className="text-[#2D2424]">Phương thức vận chuyển</span>
                </div>
              }
              className="bg-white shadow-md border-0 rounded-xl"
              styles={{ body: { background: '#fff' } }}
            >
              <Radio.Group 
                value={shippingMethod} 
                onChange={(e) => setShippingMethod(e.target.value)}
                className="w-full"
              >
                <Space direction="vertical" className="w-full">
                  <Radio value="standard" className="w-full py-2">
                    <div className="flex justify-between items-center w-full pr-4">
                      <div>
                        <div className="font-medium text-[#2D2424]">Giao hàng tiêu chuẩn</div>
                        <div className="text-sm text-gray-500">3-5 ngày làm việc</div>
                      </div>
                      <Tag color={subtotal > 200000 ? "green" : "blue"}>
                        {subtotal > 200000 ? "Miễn phí" : "25.000đ"}
                      </Tag>
                    </div>
                  </Radio>
                  <Radio value="express" className="w-full py-2">
                    <div className="flex justify-between items-center w-full pr-4">
                      <div>
                        <div className="font-medium text-[#2D2424]">Giao hàng nhanh</div>
                        <div className="text-sm text-gray-500">1-2 ngày làm việc</div>
                      </div>
                      <Tag color="orange">50.000đ</Tag>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Summary Card */}
              <Card 
                title={
                  <span className="text-[#2D2424] text-xl font-semibold">
                    Tóm tắt đơn hàng
                  </span>
                }
                className="bg-white shadow-md border-0 rounded-xl"
                styles={{ body: { background: '#fff' } }}
              >
                <div className="space-y-4">
                  {/* Order Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#2D2424]">
                      <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                      <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-[#2D2424]">
                      <span>Phí vận chuyển</span>
                      <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
                        {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString('vi-VN')}đ`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá</span>
                        <span>-{discount.toLocaleString('vi-VN')}đ</span>
                      </div>
                    )}
                    {shippingFee === 0 && subtotal > 200000 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center text-green-700">
                          <GiftOutlined className="mr-2" />
                          <span className="text-sm">Bạn đã được miễn phí vận chuyển!</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Divider className="my-4" />

                  <div className="flex justify-between text-lg font-bold text-[#2D2424]">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString('vi-VN')}đ</span>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Mã giảm giá"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                        size="large"
                      />
                      <Button 
                        type="default"
                        onClick={applyPromoCode}
                        className="bg-[#8B7156]/10 text-[#8B7156] border-[#8B7156]/30 hover:bg-[#8B7156]/20"
                        size="large"
                      >
                        Áp dụng
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Thử mã: <Tag className="text-sm">WELCOME10</Tag> để được giảm 10%
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<CreditCardOutlined />}
                    className="w-full h-12 bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C] text-lg font-semibold rounded-xl"
                    disabled={total === 0}
                    onClick={() => navigate('/checkout')}
                  >
                    Tiến hành thanh toán
                  </Button>

                  {/* Security Info */}
                  <div className="text-center pt-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-[#8B7156]/80">
                      <SafetyOutlined className="text-green-500" />
                      <span>Thanh toán an toàn & bảo mật</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Customer Reviews */}
              <Card 
                title={
                  <span className="text-[#2D2424]">Khách hàng nói gì</span>
                }
                className="bg-white shadow-md border-0 rounded-xl"
                styles={{ body: { background: '#fff' } }}
              >
                <div className="space-y-4">
                  <div className="border-l-4 border-[#8B7156] pl-4">
                    <div className="flex items-center mb-2">
                      <Rate disabled defaultValue={5} className="text-xs" />
                    </div>
                    <p className="text-sm text-[#2D2424] italic mb-2">
                      "Nhang hương từ bã cà phê thơm tự nhiên, rất hài lòng với chất lượng!"
                    </p>
                    <p className="text-xs text-gray-500">- Nguyễn Thị A</p>
                  </div>
                  <div className="border-l-4 border-[#8B7156] pl-4">
                    <div className="flex items-center mb-2">
                      <Rate disabled defaultValue={5} className="text-xs" />
                    </div>
                    <p className="text-sm text-[#2D2424] italic mb-2">
                      "Sản phẩm thân thiện môi trường, sẽ ủng hộ lâu dài."
                    </p>
                    <p className="text-xs text-gray-500">- Trần Văn B</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;