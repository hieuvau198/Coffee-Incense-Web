import { useState } from "react";
import { Button, Pagination, Spin, Empty } from "antd";
import { useEffect } from "react";
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
  const [productsPerPage] = useState(6); // 6 products per page as per UI

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

  // Filter products by category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#8B7156] text-white"
                      : "bg-white text-[#8B7156] border border-[#8B7156]"
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

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {currentProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleProductClick(product.id?.toString())}
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
                        <div className="flex justify-center">
                          <Button 
                            className="border-[#C9AC8C] text-[#C9AC8C] hover:text-[#8B7156] bg-transparent hover:bg-transparent px-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product.id?.toString());
                            }}
                          >
                            Đọc Thêm
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty description="Không tìm thấy sản phẩm nào" />
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <Pagination
                  defaultCurrent={1}
                  total={filteredProducts.length}
                  onChange={handlePageChange}
                  defaultPageSize={productsPerPage}
                  showSizeChanger={false}
                  showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList; 