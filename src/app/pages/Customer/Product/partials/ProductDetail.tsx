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
    if (product && quantity < (product.stock || 0)) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && (product.stock || 0) > 0) {
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

  const isOutOfStock = !product || (product.stock || 0) < 1;
  const availableStock = product?.stock || 0;

  const tabs = [
    { id: 'description', label: 'Mô tả', icon: '📝' },
    { id: 'usage', label: 'Cách sử dụng', icon: '💡' },
    { id: 'reviews', label: 'Đánh giá', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-3 border-amber-200 border-t-amber-800 rounded-full animate-spin"></div>
          <p className="text-amber-900 font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-amber-700">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      
      <div className="w-full">
        <div className="w-full">
          {/* Main Product Section */}
          <div className="w-full bg-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
              
              {/* Product Image Section - Full Height */}
              <div className="relative bg-amber-100 flex items-center justify-center ml-10">
                <div className="w-full h-full relative">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-amber-100">
                      <div className="w-8 h-8 border-2 border-amber-300 border-t-amber-800 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={product.image || ''}
                    alt={product.title || 'Product image'}
                    className={`w-full h-full object-cover ${isOutOfStock ? 'opacity-60 grayscale' : ''}`}
                    onLoad={() => setImageLoading(false)}
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="bg-red-600 text-white px-6 py-3 rounded font-bold text-lg">
                        HẾT HÀNG
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6 bg-amber-900 text-amber-50 px-4 py-2 rounded text-sm font-medium">
                  {product.category === 'incense' ? '🕯️ Nhang hương' : '✨ Bột hương'}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="flex flex-col justify-center px-8 lg:px-12 py-8 lg:py-16 space-y-8 bg-stone-50">
                {/* Title and Price */}
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 leading-tight">
                    {product.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className={`text-3xl font-bold ${isOutOfStock ? 'text-gray-400' : 'text-amber-900'}`}>
                      {formatPrice(product.price || 0)}
                    </span>
                    <span className={`line-through text-xl ${isOutOfStock ? 'text-gray-400' : 'text-amber-600'}`}>
                      {formatPrice((product.price || 0) * 1.92307)}
                    </span>
                    <span className={`px-3 py-1 text-sm font-bold ${
                      isOutOfStock 
                        ? 'bg-gray-200 text-gray-500' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      -48%
                    </span>
                  </div>
                </div>

                {/* Out of Stock Warning */}
                {isOutOfStock && (
                  <div className="p-4 bg-red-50 border border-red-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-red-800">Sản phẩm hết hàng</h3>
                        <p className="text-red-600 text-sm">Sản phẩm này hiện tại không có sẵn để mua. Vui lòng quay lại sau.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="py-6 border-t border-amber-200">
                  <p className="text-amber-800 text-lg leading-relaxed">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-amber-900 uppercase tracking-wider">
                    Số lượng
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className={`flex items-center bg-white border-2 overflow-hidden ${
                      isOutOfStock 
                        ? 'border-gray-200 opacity-50' 
                        : 'border-amber-300'
                    }`}>
                      <button
                        onClick={handleDecreaseQuantity}
                        disabled={quantity <= 1 || isOutOfStock}
                        className={`w-12 h-12 flex items-center justify-center font-bold text-lg transition-colors ${
                          isOutOfStock || quantity <= 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-amber-900 hover:bg-amber-50'
                        }`}
                      >
                        −
                      </button>
                      <div className={`w-16 h-12 flex items-center justify-center border-x-2 font-bold ${
                        isOutOfStock 
                          ? 'border-gray-200 bg-gray-50 text-gray-400'
                          : 'border-amber-300 bg-white text-amber-900'
                      }`}>
                        {quantity}
                      </div>
                      <button
                        onClick={handleIncreaseQuantity}
                        disabled={quantity >= availableStock || isOutOfStock}
                        className={`w-12 h-12 flex items-center justify-center font-bold text-lg transition-colors ${
                          isOutOfStock || quantity >= availableStock
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-amber-900 hover:bg-amber-50'
                        }`}
                      >
                        +
                      </button>
                    </div>
                    <span className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-amber-700'}`}>
                      {isOutOfStock ? 'Hết hàng' : `Có sẵn: ${availableStock} sản phẩm`}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`w-full h-14 font-bold text-lg transition-all duration-200 ${
                      isOutOfStock
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-900 text-amber-50 hover:bg-amber-800'
                    }`}
                  >
                    {isOutOfStock ? '❌ Hết hàng' : '🛒 Thêm vào giỏ hàng'}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-amber-200">
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 mx-auto bg-amber-900 flex items-center justify-center text-amber-50">
                      ✓
                    </div>
                    <p className="text-xs text-amber-700 font-medium">Chất lượng cao</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 mx-auto bg-amber-900 flex items-center justify-center text-amber-50">
                      🚚
                    </div>
                    <p className="text-xs text-amber-700 font-medium">Giao hàng nhanh</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 mx-auto bg-amber-900 flex items-center justify-center text-amber-50">
                      🔄
                    </div>
                    <p className="text-xs text-amber-700 font-medium">Đổi trả dễ dàng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="w-full bg-stone-50 px-8 lg:px-12 py-12">
            {/* Tab Navigation */}
            <div className="flex space-x-0 mb-12 border-b border-amber-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-amber-900 text-amber-900'
                      : 'border-transparent text-amber-600 hover:text-amber-800'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl">
              {activeTab === 'description' && (
                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-6">
                      Chi tiết sản phẩm
                    </h3>
                    <div className="bg-amber-50 p-6">
                      <p className="text-amber-800 leading-relaxed text-lg">
                        {product.fullDescription || product.description}
                      </p>
                    </div>
                  </div>
                  
                  {product.specifications && (
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-6">
                        Thông số kỹ thuật
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-4 border-b border-amber-200">
                            <span className="font-medium text-amber-900">{key}</span>
                            <span className="text-amber-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'usage' && (
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-8">
                    Hướng dẫn sử dụng
                  </h3>
                  <div className="space-y-6">
                    {[
                      "Đặt nhang vào khay nhang hoặc lư hương.",
                      "Nhẹ nhàng châm lửa ở đầu nhang, để lửa cháy trong vài giây rồi thổi tắt.",
                      "Để nhang tỏa hương ở nơi khô ráo, tránh gió lùa.",
                      "Mỗi que nhang có thể cháy từ 20-30 phút."
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-6 p-6 bg-amber-50">
                        <div className="w-10 h-10 bg-amber-900 text-amber-50 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-amber-800 leading-relaxed text-lg pt-2">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 flex items-center justify-center text-4xl">
                    ⭐
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">Chưa có đánh giá</h3>
                  <p className="text-amber-700 mb-8 text-lg">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                  <button className="px-8 py-3 bg-amber-900 text-amber-50 font-semibold hover:bg-amber-800 transition-colors">
                    Viết đánh giá
                  </button>
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