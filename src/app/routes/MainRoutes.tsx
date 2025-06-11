// src\app\routes\MainRoutes.tsx

import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Orders from "../pages/Admin/Orders/Orders";
import Customers from "../pages/Admin/Customers/Customers";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Payments from "../pages/Admin/Payments/Payments";
import Reviews from "../pages/Admin/Reviews/Reviews";
import Settings from "../pages/Admin/Settings/Settings";
import NotFound from "../components/NotFound";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/Customer/Home/Home";
import ProductList from "../pages/Customer/Product/ProductList";
import ProductDetail from "../pages/Customer/Product/partials/ProductDetail";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Contact from "../pages/Customer/Contact/Contact";
import Products from "../pages/Admin/Products/Products";
import Blog from "../pages/Customer/Blog/Blog";
import AboutUs from "../pages/Customer/AboutUs/AboutUs";
import ForgetPassword from "../pages/Authentication/ForgetPassword/ForgetPassword";
import CartPage from "../pages/Customer/Cart/Cart";
import Profile from "../pages/Customer/Profile/Profile";
import CheckoutPage from "../pages/Customer/Checkout/Checkout";
import OrderConfirmation from "../pages/Customer/Checkout/OrderConfirmation";
import OrderSuccess from '../pages/Customer/Checkout/OrderSuccess';

const MainRoutes = () => {
  return (
    <Routes>
      {/* Customer routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="product-detail" element={<ProductDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-success" element={<OrderSuccess />} /> 
      </Route>

      {/* Authentication routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forget-password" element={<ForgetPassword />} /> 

      {/* Admin routes */}
      <Route path="" element={<AdminLayout />}>
        <Route path="" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="product" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
    

