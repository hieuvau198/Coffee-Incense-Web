import { Progress } from "antd";

const ProductFeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="mx-0 md:mx-6">
          <h2 className="text-4xl font-bold text-center text-[#2D2424] mb-16">
            ĐẶC TRƯNG CỦA SẢN PHẨM
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#8B7156] mb-2">
                  HƯƠNG CÀ PHÊ SERENITY
                </h3>
                <p className="text-gray-700 mb-2">
                  Hương thơm dịu, giảm căng thẳng, giúp thiền
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 text-lg">
                  <strong>HƯƠNG CÀ PHÊ SERENITY</strong> là loại hương được làm từ bã cà phê rang là một giải pháp sáng tạo, thân thiện với môi trường. Bằng cách tận dụng bã cà phê sau khi đã chiết xuất hương thơm từ cà phê nguyên chất, thứ giúp tâm thần, cảm xúc hồng bình & tăng tự động cho không gian nhà bạn.
                </p>
                <p className="text-gray-700">
                  ≫ Thành phần, đã có phê luôn chế sợ gỗ tự nhiên, tinh dầu thảo mộc.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full bg-[#8B7156]"
                  />
                ))}
                <div className="ml-2">
                  <Progress
                    percent={100}
                    showInfo={false}
                    strokeColor="#8B7156"
                    trailColor="#E5DDD3"
                  />
                </div>
              </div>

              {/* Added tagline and benefit */}
              <p className="text-gray-600 italic mt-4">
                "Tận hưởng không gian sống xanh với hương thơm tự nhiên."
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Lợi ích:</strong> Cải thiện tâm trạng, giảm căng thẳng, và mang lại sự thư giãn tuyệt vời mỗi ngày.
              </p>
            </div>

            {/* Right image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://i.postimg.cc/L4Cpb2S5/13.jpg"
                alt="Coffee incense product"
                className="w-[460px] h-[550px] object-cover rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>

          {/* Added CTA text */}
          <div className="text-center mt-12">
            <p className="text-xl font-semibold text-[#8B7156] px-6 py-2">
              Khám phá ngay sản phẩm và trải nghiệm sự khác biệt!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;