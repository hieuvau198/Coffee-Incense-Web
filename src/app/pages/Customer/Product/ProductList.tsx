import { useState, useEffect } from "react";
import { Button, Pagination, Spin, Empty } from "antd";
import { useNavigate } from "react-router";
import { useProductCrud } from "../../../hooks/generalCrud";
import { Product } from "../../../models/product";

const ProductList = () => {
  const navigate = useNavigate();
  const { subscribeToProducts, getAllProducts } = useProductCrud();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [subscribeToProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allProducts = await getAllProducts();
        const uniqueCategories = Array.from(new Set(allProducts
          .map(p => p.category)
          .filter((cat): cat is string => cat !== null && cat !== undefined)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [getAllProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleProductClick = (productId: string | null | undefined) => {
    if (productId) {
      navigate(`/product-detail?id=${productId}`);
    }
  };

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3C2F2F] via-[#6B4E31] to-[#D4A017] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-lg rounded-full mb-6">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L13.8 10.2M22 2L15 22L11 10L2 6L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            TẤT CẢ SẢN PHẨM
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Khám phá bộ sưu tập đa dạng các sản phẩm chất lượng cao
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48 -mt-10 relative z-10">
        {/* Category Filters */}
        <div className="mb-12 flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-[#3C2F2F] to-[#6B4E31] text-white shadow-lg"
                    : "text-gray-600 hover:text-[#6B4E31] hover:bg-[#D4A017]/10"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                Tất cả
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[#3C2F2F] to-[#6B4E31] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#6B4E31] hover:bg-[#D4A017]/10"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'incense' ? 'Nhang hương' : 
                   cat === 'powder' ? 'Bột hương' : 
                   cat === 'accessories' ? 'Phụ kiện' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#D4A017] border-t-[#3C2F2F] rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#6B4E31] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-gray-600 font-medium mt-4">Đang tải sản phẩm...</p>
          </div>
        ) : (
          <>
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#D4A017] transform hover:-translate-y-2"
                    onClick={() => handleProductClick(product.id?.toString())}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={product.image || ''} 
                        alt={product.title || 'Product image'}
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Im0xNSAxMC01IDUtNS01IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Hover Icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                          <svg className="w-5 h-5 text-[#6B4E31]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#6B4E31] transition-colors duration-300 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {product.description}
                      </p>
                      
                      {/* Action Button */}
                      <div className="flex justify-center">
                        <Button 
                          className="border-2 border-[#D4A017] text-[#6B4E31] hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-[#3C2F2F] hover:to-[#6B4E31] px-8 py-2 h-auto rounded-xl font-semibold transition-all duration-300 hover:border-transparent hover:shadow-lg transform hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product.id?.toString());
                          }}
                        >
                          <span className="flex items-center gap-2">
                            Đọc Thêm
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 text-center max-w-md">Thử thay đổi bộ lọc danh mục để xem thêm sản phẩm khác nhau</p>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center mt-12">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <Pagination
                    current={currentPage}
                    total={filteredProducts.length}
                    onChange={handlePageChange}
                    pageSize={productsPerPage}
                    showSizeChanger={false}
                    showTotal={(total, range) => (
                      <div className="text-gray-600 font-medium mb-4 text-center">
                        Hiển thị {range[0]}-{range[1]} trong tổng số {total} sản phẩm
                      </div>
                    )}
                    className="flex justify-center"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;