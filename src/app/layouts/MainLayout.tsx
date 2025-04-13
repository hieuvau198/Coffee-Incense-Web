import { Header } from "../components/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-[90px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
