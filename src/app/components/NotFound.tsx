import { Button } from "antd";
import { useNavigate } from "react-router";
import Header from "./Header/Header";
import Footer from "./Footer";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="pt-[90px]">
        <div className="h-[calc(100vh-370px)]">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Trang không tồn tại</h1>
            <p className="text-gray-500 my-2 text-lg">
              Trang bạn đang tìm kiếm hiện không tồn tại.
            </p>
            <Button type="primary" className="" onClick={() => navigate("/")}>
              Quay về trang chủ
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
