import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Product } from "../../../../models/product";
import { useProductCrud } from "../../../../hooks/generalCrud";
import { useCart } from "../../../../context/CartContext";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [quantity, setQuantity] = useState<number>(1);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const { getProduct } = useProductCrud();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      if (productId) {
        const foundProduct = await getProduct(productId);
        setProduct(foundProduct || null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id?.toString() || '',
        productTitle: product.title || '',
        productImage: product.image || '',
        price: product.price || 0,
        quantity: quantity,
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const tabs = [
    { id: 'description', label: 'Mô tả', icon: '📝' },
    { id: 'usage', label: 'Cách sử dụng', icon: '💡' },
    { id: 'reviews', label: 'Đánh giá', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F2EA] via-[#FFF8F0] to-[#E6D8C8] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#D4A017] border-t-[#3C2F2F] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-[#D4A017]/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-[#3C2F2F] font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9F2EA] via-[#FFF8F0] to-[#E6D8C8] flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-[#D4A017]/50">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#D4A017]/20 to-[#6B4E31]/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-[#3C2F2F] mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-[#6B4E31]">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F2EA] via-[#FFF8F0] to-[#E6D8C8]">
      {/* Header Gradient */}
      <div className="h-32 bg-gradient-to-r from-[#F9F2EA] via-[#FFF8F0] to-[#E6D8C8]"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48 -mt-16 relative z-10 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Product Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#D4A017]/50 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Product Image Section */}
              <div className="relative group">
                <div className="">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] to-[#E6D8C8] rounded-2xl">
                      <div className="w-12 h-12 border-3 border-[#D4A017] border-t-[#3C2F2F] rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={product.image || ''}
                    alt={product.title || 'Product image'}
                    className={`w-full h-full object-cover rounded-xl  `}
                    onLoad={() => setImageLoading(false)}
                  />
                  <div className=""></div>
                </div>
                
                {/* Image Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#3C2F2F] to-[#6B4E31] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.category === 'incense' ? '🕯️ Nhang hương' : '✨ Bột hương'}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="space-y-8">
                {/* Title and Price */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3C2F2F] to-[#6B4E31] bg-clip-text text-transparent leading-tight">
                    {product.title}
                  </h1>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl font-bold text-[#6B4E31]">
                      {formatPrice(product.price || 0)}
                    </span>
                    <span className="text-[#3C2F2F] line-through text-lg">
                      {formatPrice((product.price || 0) * 1.92307)}
                    </span>
                    <span className="bg-gradient-to-r from-[#D4A017] to-[#6B4E31] text-white px-3 py-1 rounded-full text-sm font-medium">
                      -48%
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 bg-gradient-to-br from-[#F9F2EA] to-[#E6D8C8] rounded-2xl border border-[#D4A017]/20">
                  <p className="text-[#3C2F2F] leading-relaxed">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-[#3C2F2F] uppercase tracking-wide">
                    Số lượng
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white border-2 border-[#D4A017] rounded-2xl overflow-hidden shadow-lg">
                      <button
                        onClick={handleDecreaseQuantity}
                        className="w-12 h-12 flex items-center justify-center text-[#3C2F2F] hover:bg-[#D4A017]/20 hover:text-[#6B4E31] transition-all duration-200 font-bold text-lg"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <div className="w-16 h-12 flex items-center justify-center border-x-2 border-[#D4A017] bg-[#FFF8F0] font-bold text-[#3C2F2F]">
                        {quantity}
                      </div>
                      <button
                        onClick={handleIncreaseQuantity}
                        className="w-12 h-12 flex items-center justify-center text-[#3C2F2F] hover:bg-[#D4A017]/20 hover:text-[#6B4E31] transition-all duration-200 font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[#6B4E31] text-sm">Có sẵn: 99+ sản phẩm</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full h-14 border-2 border-[#D4A017] text-[#6B4E31] hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-[#3C2F2F] hover:to-[#6B4E31] rounded-2xl font-semibold transition-all duration-300 hover:border-transparent hover:shadow-lg flex items-center justify-center space-x-3 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">🛒</span>
                  <span>Thêm vào giỏ hàng</span>
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#D4A017]/20">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-full flex items-center justify-center text-white text-xl">
                      ✓
                    </div>
                    <p className="text-xs text-[#3C2F2F] font-medium">Chất lượng cao</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-full flex items-center justify-center text-white text-xl">
                      🚚
                    </div>
                    <p className="text-xs text-[#3C2F2F] font-medium">Giao hàng nhanh</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-full flex items-center justify-center text-white text-xl">
                      🔄
                    </div>
                    <p className="text-xs text-[#3C2F2F] font-medium">Đổi trả dễ dàng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#D4A017]/50 p-8">
            {/* Tab Navigation */}
            <div className="flex space-x-2 mb-8 bg-[#FFF8F0] rounded-2xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#3C2F2F] to-[#6B4E31] text-white shadow-lg transform scale-105'
                      : 'text-[#3C2F2F] hover:text-[#6B4E31] hover:bg-[#D4A017]/20'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'description' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-2xl font-bold text-[#3C2F2F] mb-4 flex items-center space-x-3">
                      <span className="w-8 h-8 bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-lg flex items-center justify-center text-white">📋</span>
                      <span>Chi tiết sản phẩm</span>
                    </h3>
                    <div className="p-6 bg-gradient-to-br from-[#F9F2EA] to-[#E6D8C8] rounded-2xl border border-[#D4A017]/20">
                      <p className="text-[#3C2F2F] leading-relaxed text-lg">
                        {product.fullDescription || product.description}
                      </p>
                    </div>
                  </div>
                  
                  {product.specifications && (
                    <div>
                      <h3 className="text-2xl font-bold text-[#3C2F2F] mb-4 flex items-center space-x-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-lg flex items-center justify-center text-white">⚙️</span>
                        <span>Thông số kỹ thuật</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="p-4 bg-white rounded-xl border border-[#D4A017]/20 shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-[#3C2F2F]">{key}:</span>
                              <span className="text-[#6B4E31]">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-[#3C2F2F] mb-6 flex items-center space-x-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-lg flex items-center justify-center text-white">💡</span>
                    <span>Hướng dẫn sử dụng</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Đặt nhang vào khay nhang hoặc lư hương.",
                      "Nhẹ nhàng châm lửa ở đầu nhang, để lửa cháy trong vài giây rồi thổi tắt.",
                      "Để nhang tỏa hương ở nơi khô ráo, tránh gió lùa.",
                      "Mỗi que nhang có thể cháy từ 20-30 phút."
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#F9F2EA] to-[#E6D8C8] rounded-xl border border-[#D4A017]/20">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-[#3C2F2F] leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="animate-fade-in">
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#D4A017] to-[#6B4E31] rounded-full flex items-center justify-center text-4xl">
                      ⭐
                    </div>
                    <h3 className="text-2xl font-bold text-[#3C2F2F] mb-3">Chưa có đánh giá</h3>
                    <p className="text-[#6B4E31] mb-8">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                    <button
                      className="px-8 py-3 border-2 border-[#D4A017] text-[#6B4E31] hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-[#3C2F2F] hover:to-[#6B4E31] rounded-xl font-semibold transition-all duration-300 hover:border-transparent hover:shadow-lg"
                    >
                      Viết đánh giá
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;