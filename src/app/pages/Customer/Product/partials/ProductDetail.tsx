import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Tabs, Button, Divider, Spin } from "antd";
import { Product } from "../../../../models/product";
import { useProductCrud } from "../../../../hooks/generalCrud";

const { TabPane } = Tabs;

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [quantity, setQuantity] = useState<number>(1);
  const { getProduct } = useProductCrud();

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
    console.log("Added to cart:", product?.title, "Quantity:", quantity);
    // Add your cart logic here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[#2D2424]">Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F2EA] min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="mx-0 md:mx-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Image Section */}
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden">
                  <img
                    src={product.image || ''}
                    alt={product.title || 'Product image'}
                    className="w-[430px] h-[550px] object-cover rounded-lg border-2 border-[#8B7156] mx-auto"
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div>
                <h1 className="text-3xl font-bold text-[#2D2424] mb-4">{product.title}</h1>
                <p className="text-xl font-medium text-[#8B7156] mb-6">
                  {product.price?.toLocaleString('vi-VN')} đ
                </p>
                
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Danh mục: {product.category === 'incense' ? 'Nhang hương' : 'Bột hương'}</span>
                  </div>
                </div>
                
                <Divider className="my-6" />
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                  <div className="flex items-center">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-16 h-10 border-t border-b border-gray-300 text-center"
                    />
                    <button
                      onClick={handleIncreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-12 bg-[#8B7156] hover:bg-[#6A5540] text-white font-medium rounded-full border-0"
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
            
            {/* Product Details Tabs */}
            <div className="mt-12">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="product-details-tabs"
                type="card"
              >
                <TabPane tab="Mô tả" key="1">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-3">Chi tiết sản phẩm</h3>
                    <p className="text-gray-700">{product.fullDescription || product.description}</p>
                    
                    {product.specifications && (
                      <>
                        <h3 className="text-lg font-medium mt-6 mb-3">Thông số kỹ thuật</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </TabPane>
                <TabPane tab="Cách sử dụng" key="2">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-3">Hướng dẫn sử dụng</h3>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-3">
                      <li>Đặt nhang vào khay nhang hoặc lư hương.</li>
                      <li>Nhẹ nhàng châm lửa ở đầu nhang, để lửa cháy trong vài giây rồi thổi tắt.</li>
                      <li>Để nhang tỏa hương ở nơi khô ráo, tránh gió lùa.</li>
                      <li>Mỗi que nhang có thể cháy từ 20-30 phút.</li>
                    </ol>
                  </div>
                </TabPane>
                <TabPane tab="Đánh giá" key="3">
                  <div className="py-4 text-center">
                    <p className="text-gray-700">Chưa có đánh giá nào cho sản phẩm này.</p>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 