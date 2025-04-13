import Header from "../components/Header/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-[80px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
