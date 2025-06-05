// @ts-nocheck
import React, { useState } from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, CreditCard, Truck } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nhang Hương Cà Phê Robusta",
      price: 45000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      description: "Nhang hương tự nhiên từ bã cà phê Robusta"
    },
    {
      id: 2,
      name: "Nhang Hương Cà Phê Arabica",
      price: 65000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0d9?w=400&h=400&fit=crop",
      description: "Nhang hương cao cấp từ bã cà phê Arabica"
    },
    {
      id: 3,
      name: "Combo Nhang Hương Tết",
      price: 120000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      description: "Bộ combo đặc biệt cho dịp Tết"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 200000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-amber-800 hover:text-amber-900 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tiếp tục mua sắm
          </button>
          <h1 className="text-3xl font-bold text-amber-900 flex items-center">
            <ShoppingBag className="w-8 h-8 mr-3" />
            Giỏ hàng của bạn
          </h1>
          <p className="text-amber-700 mt-2">
            {cartItems.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-amber-100">
                <h2 className="text-xl font-semibold text-amber-900">
                  Sản phẩm đã chọn
                </h2>
              </div>
              
              <div className="divide-y divide-amber-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-amber-25 transition-colors">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-amber-100"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-amber-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-amber-600 text-sm mb-3">
                          {item.description}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-amber-700">Số lượng:</span>
                            <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-amber-100 transition-colors"
                              >
                                <Minus className="w-4 h-4 text-amber-700" />
                              </button>
                              <span className="px-4 py-2 text-amber-900 font-medium min-w-12 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-amber-100 transition-colors"
                              >
                                <Plus className="w-4 h-4 text-amber-700" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-xl font-bold text-amber-900">
                              {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Truck className="w-6 h-6 text-amber-700 mr-3" />
                <h3 className="text-lg font-semibold text-amber-900">
                  Thông tin giao hàng
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-amber-200 rounded-xl hover:border-amber-300 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-amber-900">Giao hàng tiêu chuẩn</h4>
                      <p className="text-sm text-amber-600">3-5 ngày làm việc</p>
                    </div>
                    <span className="text-amber-700 font-medium">25.000đ</span>
                  </div>
                </div>
                <div className="p-4 border-2 border-amber-500 bg-amber-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-amber-900">Miễn phí giao hàng</h4>
                      <p className="text-sm text-amber-600">Đơn hàng từ 200.000đ</p>
                    </div>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <div className="p-6 border-b border-amber-100">
                <h2 className="text-xl font-semibold text-amber-900">
                  Tóm tắt đơn hàng
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Order Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-amber-700">
                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-amber-700">
                    <span>Phí vận chuyển</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString('vi-VN')}đ`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      🎉 Bạn đã được miễn phí vận chuyển!
                    </div>
                  )}
                  <div className="border-t border-amber-100 pt-3">
                    <div className="flex justify-between text-lg font-bold text-amber-900">
                      <span>Tổng cộng</span>
                      <span>{total.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="pt-4 border-t border-amber-100">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Mã giảm giá"
                      className="flex-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                      Áp dụng
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Tiến hành thanh toán</span>
                </button>

                {/* Security Info */}
                <div className="text-center pt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-amber-600">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Thanh toán an toàn & bảo mật</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">
                Khách hàng nói gì
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <p className="text-sm text-amber-700 italic">
                    "Nhang hương từ bã cà phê thơm tự nhiên, rất hài lòng với chất lượng!"
                  </p>
                  <p className="text-xs text-amber-600 mt-1">⭐⭐⭐⭐⭐ - Nguyễn Thị A</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <p className="text-sm text-amber-700 italic">
                    "Sản phẩm thân thiện môi trường, sẽ ủng hộ lâu dài."
                  </p>
                  <p className="text-xs text-amber-600 mt-1">⭐⭐⭐⭐⭐ - Trần Văn B</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;