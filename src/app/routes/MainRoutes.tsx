import { Navigate, Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Bookings from "../pages/Admin/Bookings/Bookings";
import Customers from "../pages/Admin/Customers/Customers";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Payments from "../pages/Admin/Payments/Payments";
import Reviews from "../pages/Admin/Reviews/Reviews";
import Settings from "../pages/Admin/Settings/Settings";
import NotFound from "../components/NotFound";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/Customer/Home/Home";
import ProductList from "../pages/Customer/Product/partials/ProductList";
import ProductDetail from "../pages/Customer/Product/partials/ProductDetail";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Contact from "../pages/Customer/Contact/Contact";
import Products from "../pages/Admin/Products/Products";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product-detail" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Route>

      {/* Authentication routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Admin routes */}
      <Route path="" element={<AdminLayout />}>
        <Route path="" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="product" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
    

