import { Link, useLocation } from "react-router";

const Navigation = () => {
  const location = useLocation();

    
  const menuItems = [
    {
      title: "TRANG CHỦ",
      href: "/",
    },
    {
      title: "VỀ CHÚNG TÔI",
      href: "/about",
    },
    {
      title: "SẢN PHẨM",
      href: "/products",
    },
    {
      title: "BLOGS",
      href: "/blogs",
    },
    {
      title: "LIÊN HỆ",
      href: "/contact",
    },
  ];


  return (
    <nav className="flex items-center justify-center space-x-8">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={`relative px-2 py-2 text-lg font-medium transition-colors ${
            location.pathname === item.href || 
            (item.href === "/products" && location.pathname.startsWith("/products"))
              ? "text-[#8B7156] font-semibold" 
              : "text-[#8B7156]/80 hover:text-[#8B7156]"
          }`}
        >
          {item.title}
          {(location.pathname === item.href || 
           (item.href === "/products" && location.pathname.startsWith("/products"))) && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B7156]"></span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
