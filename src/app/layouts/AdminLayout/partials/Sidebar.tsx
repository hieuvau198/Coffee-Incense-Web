import { Menu } from "antd";
import Logo from "@/app/components/Logo";
import useAuthStore from "@/app/stores/authStore";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  HomeOutlined,
  GlobalOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
  CreditCardOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { role } = useAuthStore();
  
  const activeItemStyle = "!bg-emerald-600 !text-white hover:!bg-emerald-700";
  const itemStyle = "w-full flex hover:!bg-emerald-600 !text-zinc-600 hover:!text-white";
  
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  
  // Update selected key when location changes
  useEffect(() => {
    const path = location.pathname;
    
    // Match path to the correct menu item
    if (path.includes("/dashboard")) {
      setSelectedKey("/dashboard");
    } else if (path.includes("/tours")) {
      setSelectedKey("/tours");
    } else if (path.includes("/bookings")) {
      setSelectedKey("/bookings");
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
      label: "Quản Lý Tour",
      key: "/tours",
      path: "/tours",
      className: selectedKey === "/tours" ? activeItemStyle : itemStyle,
      icon: <GlobalOutlined />,
    },
    {
      label: "Đặt Tour",
      key: "/bookings",
      path: "/bookings",
      className: selectedKey === "/bookings" ? activeItemStyle : itemStyle,
      icon: <CalendarOutlined />,
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
