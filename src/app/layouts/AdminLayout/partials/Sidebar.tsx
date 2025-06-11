import { Menu } from "antd";
import Logo from "@/app/components/Logo";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  HomeOutlined,
  GlobalOutlined,
  TeamOutlined,
  SettingOutlined,
  CreditCardOutlined,
  CommentOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const activeItemStyle = "!bg-[#FFF5F3] !text-[#8B7156] hover:!bg-[#FFF5F3]";
  const itemStyle = "w-full flex hover:!bg-[#F9F2EA] !text-zinc-600 hover:!text-[#8B7156]";
  
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  
  // Update selected key when location changes
  useEffect(() => {
    const path = location.pathname;
    
    // Match path to the correct menu item
    if (path.includes("/dashboard")) {
      setSelectedKey("/dashboard");
    } else if (path.includes("/product")) {
      setSelectedKey("/product");
    } else if (path.includes("/orders")) {
      setSelectedKey("/orders");
    } else if (path.includes("/customers")) {
      setSelectedKey("/customers");
    } else if (path.includes("/payments")) {
      setSelectedKey("/payments");
    } else if (path.includes("/reviews")) {
      setSelectedKey("/reviews");
    } else if (path.includes("/settings")) {
      setSelectedKey("/settings");
    } else {
      setSelectedKey("/dashboard"); // Default
    }
  }, [location.pathname]);

  const navItems = [
    {
      label: "Trang Chủ",
      key: "/dashboard",
      path: "/dashboard",
      className: selectedKey === "/dashboard" ? activeItemStyle : itemStyle,
      icon: <HomeOutlined />,
    },
    {
      label: "Quản Lý Sản Phẩm",
      key: "/product",
      path: "/product",
      className: selectedKey === "/product" ? activeItemStyle : itemStyle,
      icon: <GlobalOutlined />,
    },
    {
      label: "Quản Lý Đơn Hàng",
      key: "/orders",
      path: "/orders",
      className: selectedKey === "/orders" ? activeItemStyle : itemStyle,
      icon: <ShoppingCartOutlined />,
    },
    {
      label: "Khách Hàng",
      key: "/customers",
      path: "/customers",
      className: selectedKey === "/customers" ? activeItemStyle : itemStyle,
      icon: <TeamOutlined />,
    },
    {
      label: "Thanh Toán",
      key: "/payments",
      path: "/payments",
      className: selectedKey === "/payments" ? activeItemStyle : itemStyle,
      icon: <CreditCardOutlined />,
    },
    {
      label: "Đánh Giá",
      key: "/reviews",
      path: "/reviews",
      className: selectedKey === "/reviews" ? activeItemStyle : itemStyle,
      icon: <CommentOutlined />,
    },
    {
      label: "Cài Đặt",
      key: "/settings",
      path: "/settings",
      className: selectedKey === "/settings" ? activeItemStyle : itemStyle,
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout.Sider
      collapsible
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
      className="!bg-white pt-4"
      width={250}
    >
      <div className="px-6 mb-6 flex justify-between items-center">
        <Logo collapsed={isCollapsed} className="!text-black" />
      </div>
      <Menu
        className="mt-4 px-2 bg-white"
        selectedKeys={[selectedKey]}
        mode="vertical"
        // items={items.filter((item) => item.allowedroles.includes(role))}
        items={navItems}
        onClick={({ key }) => navigate(key)}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
