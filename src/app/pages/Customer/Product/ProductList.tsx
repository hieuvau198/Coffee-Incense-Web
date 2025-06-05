import { useState } from "react";
import { Button, Pagination } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { products } from "../../../../mocks/product";

const ProductList = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    window.scrollTo(0, 0);
  };
  
  const handleProductClick = (productId: string | number | null | undefined) => {
    if (productId) {
      navigate(`/product-detail?id=${productId}`);
    }
  };

  // Filter products by category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-[#F9F2EA] min-h-screen pb-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="mx-0 md:mx-6">
          {/* Page Title */}
          <div className="pt-10 pb-8 text-center">
            <h1 className="text-3xl font-bold text-[#2D2424] mb-2 flex items-center justify-center">
              TẤT CẢ SẢN PHẨM
              <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L13.8 10.2M22 2L15 22L11 10L2 6L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </h1>
          </div>

          {/* Category filters */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex gap-4">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-[#8B7156] text-white"
                    : "bg-white text-[#8B7156] border border-[#8B7156]"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                Tất cả
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === "incense"
                    ? "bg-[#8B7156] text-white"
                    : "bg-white text-[#8B7156] border border-[#8B7156]"
                }`}
                onClick={() => setActiveCategory("incense")}
              >
                Nhang hương
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === "powder"
                    ? "bg-[#8B7156] text-white"
                    : "bg-white text-[#8B7156] border border-[#8B7156]"
                }`}
                onClick={() => setActiveCategory("powder")}
              >
                Bột hương
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image || ''} 
                    alt={product.title || 'Product image'}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-[#2D2424] mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#8B7156]">
                      {product.price?.toLocaleString('vi-VN')} đ
                    </span>
                    <Button 
                      className="bg-[#C9AC8C] hover:bg-[#8B7156] text-white border-0 rounded-full px-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                    >
                      Chi Tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              defaultCurrent={1}
              total={products.length}
              onChange={handlePageChange}
              defaultPageSize={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList; 