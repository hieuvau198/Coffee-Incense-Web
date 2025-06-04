import { useState, useEffect } from "react";
import { Button, Pagination, Tabs, Input, Select, Card, Row, Col, Typography, Divider, Badge } from "antd";
import { SearchOutlined, FilterOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { products, productCategories } from "../../../../mocks/product";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Filter products by search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
                         (product.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <div className="bg-[#F9F2EA] min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <Title level={2} className="text-[#2D2424]">
            <span className="relative">
              SẢN PHẨM TỪ CÀ PHÊ
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#8B7156]"></span>
            </span>
          </Title>
          <Text className="text-gray-600 block mt-6 max-w-2xl mx-auto">
            Khám phá bộ sưu tập sản phẩm thủ công tái chế từ bã cà phê, góp phần bảo vệ môi trường và mang lại không gian sống xanh, sạch.
          </Text>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Input 
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="md:max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
            />
            
            <div className="flex items-center gap-3">
              <FilterOutlined className="text-[#8B7156]" />
              <Select
                placeholder="Danh mục sản phẩm"
                className="min-w-[180px]"
                value={selectedCategory}
                onChange={handleCategoryChange}
                size="large"
              >
                <Option value="all">Tất cả sản phẩm</Option>
                {productCategories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        
        {/* Featured Tags */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <Badge.Ribbon text="HOT" color="#8B7156">
            <button className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium">
              Nhang hương
            </button>
          </Badge.Ribbon>
          <button className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium">
            Bột cà phê
          </button>
          <button className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium">
            Xà phòng
          </button>
          <button className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium">
            Nến thơm
          </button>
        </div>
        
        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <>
            <Row gutter={[24, 28]} className="mb-10">
              {currentProducts.map((product) => (
                <Col xs={24} sm={12} md={8} key={product.id}>
                  <Card 
                    hoverable 
                    className="overflow-hidden h-full flex flex-col border-none shadow-sm hover:shadow-md transition-all"
                    cover={
                      <div className="relative h-56 overflow-hidden group">
                        <img 
                          alt={product.title || 'Coffee Product'} 
                          src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.featured && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-[#8B7156] text-white text-xs font-bold px-2 py-1 rounded">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            type="primary" 
                            shape="circle" 
                            icon={<HeartOutlined />} 
                            className="bg-white text-[#8B7156] border-none hover:bg-[#8B7156] hover:text-white"
                          />
                          <Button 
                            type="primary" 
                            shape="circle" 
                            icon={<ShoppingCartOutlined />} 
                            className="bg-white text-[#8B7156] border-none hover:bg-[#8B7156] hover:text-white"
                          />
                        </div>
                      </div>
                    }
                    bodyStyle={{ padding: '16px' }}
                  >
                    <div className="text-center flex flex-col flex-grow">
                      <div className="flex-grow">
                        <div className="text-xs text-gray-500 mb-1">
                          {product.category === 'incense' ? 'NHANG HƯƠNG' : 'BỘT HƯƠNG'}
                        </div>
                        <Title level={5} className="mb-2 font-bold text-[#2D2424]">
                          {product.title}
                        </Title>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <Divider className="my-3" />
                      <div className="flex justify-between items-center">
                        <Text strong className="text-lg text-[#8B7156]">
                          {product.price?.toLocaleString('vi-VN')} đ
                        </Text>
                        <Button 
                          type="primary" 
                          className="bg-[#8B7156] hover:bg-[#6A553C] border-none"
                        >
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <Pagination
                current={currentPage}
                total={filteredProducts.length}
                pageSize={productsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <Title level={4} className="text-gray-500">
              Không tìm thấy sản phẩm nào
            </Title>
            <Text className="text-gray-400 block mt-2">
              Vui lòng thử lại với từ khóa hoặc bộ lọc khác
            </Text>
            <Button 
              type="primary" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-6 bg-[#8B7156] border-none hover:bg-[#6A553C]"
            >
              Xem tất cả sản phẩm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
