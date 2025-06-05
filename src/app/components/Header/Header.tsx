// src\app\components\Header\Header.tsx

import { Button, Dropdown, Menu, Drawer, Input, Spin, Empty } from "antd";
import Logo from "../Logo";
import Navigation from "./Navigation";
import { FiSearch, FiShoppingCart, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ADJUST PATH as needed
import { doSignOut } from "../../modules/firebase/auth"; // for logout
import { UserOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { productService } from "../../services/productService";
import { Product } from "../../models/product";


const Header = () => {
  const navigate = useNavigate();
  const { user, userData, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<any>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setShowResults(false);
        setSearchValue("");
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // You can create a dropdown for user profile actions if desired
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link to="/orders">Đơn mua</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  // Menu items giống Navigation
  const menuItems = [
    { title: "TRANG CHỦ", href: "/" },
    { title: "VỀ CHÚNG TÔI", href: "/about" },
    { title: "SẢN PHẨM", href: "/products" },
    { title: "BLOGS", href: "/blogs" },
    { title: "LIÊN HỆ", href: "/contact" },
  ];

  // Search handler
  const handleSearch = async (value: string) => {
    setSearchValue(value);
    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    setSearchLoading(true);
    setShowResults(true);
    const allProducts = await productService.getAllProducts();
    const filtered = allProducts.filter(
      (p) =>
        (p.title?.toLowerCase().includes(value.toLowerCase()) ||
          p.description?.toLowerCase().includes(value.toLowerCase()))
    );
    setSearchResults(filtered);
    setSearchLoading(false);
  };

  const handleSearchIconClick = () => {
    setSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setShowResults(false);
    setSearchValue("");
    setSearchResults([]);
  };

  return (
    <header className="bg-white text-[#8B7156] shadow-sm fixed top-0 left-0 w-full z-[1000]">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 ml-0 md:ml-6 w-28 md:w-40">
            <Link to="/">
              <Logo className="text-[#8B7156] w-full" />
            </Link>
          </div>
          
          {/* Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <Navigation />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 md:space-x-5 mr-0 md:mr-6 relative">
            {/* Search Section */}
            <div ref={searchContainerRef} className="relative">
              {!searchOpen ? (
                /* Search Icon */
                <button
                  className="text-[#8B7156] hover:text-[#64503C] transition-colors"
                  onClick={handleSearchIconClick}
                >
                  <FiSearch className="w-6 h-6" />
                </button>
              ) : (
                /* Search Input Bar */
                <div className="flex items-center">
                  <div className="relative">
                    <Input
                      ref={searchInputRef}
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchValue}
                      onChange={e => handleSearch(e.target.value)}
                      className="w-64 md:w-80 h-10 pr-8 border-2 border-[#8B7156] focus:border-[#64503C] rounded-lg"
                      style={{ 
                        boxShadow: '0 4px 12px rgba(139, 113, 86, 0.15)',
                      }}
                    />
                    <button
                      onClick={closeSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#8B7156] transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Search Results Dropdown */}
              {searchOpen && showResults && (
                <div className="absolute top-full right-0 mt-2 w-64 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    {searchLoading ? (
                      <div className="flex justify-center items-center h-20">
                        <Spin size="small" />
                      </div>
                    ) : searchValue && searchResults.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Empty 
                          description="Không tìm thấy sản phẩm phù hợp" 
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          className="my-2"
                        />
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {searchResults.slice(0, 8).map((product) => (
                          <li key={product.id}>
                            <Link
                              to={`/product-detail?id=${product.id}`}
                              className="flex items-center gap-3 p-3 hover:bg-[#F9F2EA] transition-colors"
                              onClick={closeSearch}
                            >
                              <img 
                                src={product.image || ''} 
                                alt={product.title || ''} 
                                className="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0" 
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#2D2424] truncate text-sm">
                                  {product.title}
                                </div>
                                <div className="text-xs text-gray-500 line-clamp-1 mt-1">
                                  {product.description}
                                </div>
                                <div className="text-[#8B7156] font-semibold mt-1 text-sm">
                                  {product.price?.toLocaleString('vi-VN')} đ
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                        {searchResults.length > 8 && (
                          <li className="p-3 text-center">
                            <Link 
                              to={`/products?search=${encodeURIComponent(searchValue)}`}
                              className="text-[#8B7156] hover:text-[#64503C] font-medium text-sm"
                              onClick={closeSearch}
                            >
                              Xem tất cả {searchResults.length} kết quả →
                            </Link>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart Icon */}
            <button
              className="text-[#8B7156] hover:text-[#64503C] transition-colors relative"
              onClick={() => navigate('/cart')}
              aria-label="Giỏ hàng"
            >
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#8B7156] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* User Info or Sign In/Sign Up */}
            {!loading && user ? (
              <Dropdown overlay={menu} placement="bottomRight">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <UserOutlined className="text-lg" />
                  <span className="font-semibold">
                    {userData?.firstName
                      ? `${userData.firstName} ${userData.lastName || ""}`
                      : user.email}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-[#8B7156] hover:text-[#64503C] transition-colors text-lg font-medium">
                  Sign In
                </Link>
                <Button 
                  className="bg-[#8B7156] text-white border-0 hover:bg-[#64503C] rounded-md h-10 text-base font-medium px-4"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu button - shown only on mobile */}
            <button
              className="lg:hidden text-[#8B7156] hover:text-[#64503C] bg-white border border-[#8B7156] rounded-full shadow-md p-2 ml-2 z-10 focus:outline-none focus:ring-2 focus:ring-[#8B7156]"
              style={{ minWidth: 44, minHeight: 44 }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Drawer Menu */}
      <Drawer
        title={<Link to="/"><Logo className="text-[#8B7156] w-32" /></Link>}
        placement="left"
        closable={true}
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={260}
        className="lg:hidden"
        bodyStyle={{ padding: 0 }}
      >
        <nav className="flex flex-col space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="block px-6 py-3 text-lg font-semibold text-[#8B7156] hover:bg-[#F9F2EA] rounded transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t border-gray-200 my-2"></div>
          {!loading && user ? (
            <>
              <Link to="/profile" className="block px-6 py-3 text-[#8B7156]">Thông tin cá nhân</Link>
              <Link to="/orders" className="block px-6 py-3 text-[#8B7156]">Đơn mua</Link>
              <button onClick={handleLogout} className="block w-full text-left px-6 py-3 text-[#8B7156] hover:bg-[#F9F2EA]">Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-6 py-3 text-[#8B7156]">Sign In</Link>
              <Link to="/register" className="block px-6 py-3 text-[#8B7156]">Sign Up</Link>
            </>
          )}
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;