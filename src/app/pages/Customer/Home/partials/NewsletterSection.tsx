import { Button } from "antd";

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-[#8B7156] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="mx-0 md:mx-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Đăng ký nhận thông tin mới nhất từ chúng tôi
            </h2>
            <p className="mb-8">
              Nhận thông tin mới nhất về các sản phẩm mới, các ưu đãi độc quyền và các
              mẹo sử dụng sản phẩm từ chúng tôi. Hãy tham gia cộng đồng Eco Brew Cycle ngay hôm nay!
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Button className="h-full px-8 py-3 bg-white text-gray-600 rounded-full font-semibold hover:bg-[#8B7156] transition-colors">
                Đăng ký
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
