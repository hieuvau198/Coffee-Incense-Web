import { Progress } from "antd";

const ProductFeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-0 md:mx-6">
          <h2 className="text-3xl font-bold text-center text-[#2D2424] mb-16">
            ĐẶC TRƯNG CỦA SẢN PHẨM
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#8B7156] mb-2">
                  HƯƠNG CÀ PHÊ SERENITY
                </h3>
                <p className="text-gray-700 mb-2">
                  Hương thơm dịu, giảm căng thẳng, giúp thiền
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
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
            </div>

            {/* Right image */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://s3-alpha-sig.figma.com/img/593d/97ae/05b47ccb48e09d0b7b2b5c62c8888623?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XtGjWQoFxHZlWdMBcR-ZDXu1E6zdlbLECn4SCKhrr05O2bLAepMLkAP-iA~yQX~56udxk7QZ4hn2MIm0n38qdeV6wGD-lhGf1jjrQ~SKwzM7VZM0iuSEDt8jVFjX8FsA9~T3fFNJ8~-nlZeJL78NztyuAA3KohFxtEcH1GU6KmgE2bUsVqENe2CIyNEcMIc1gRngtuNgbnBFsmo8hvT~UM8j4oXEzwoMBfyy9MBf2hNgz0IiPfDGk~mZfQNEWjVSvKuM8HcFmdbHv-PnfdgGBEDvXZsOtlgjcJC0NYY260B4rSRlqP86EUn3aIcoyML6zyV-msjyxlUnizvGeklwDQ__"
                  alt="Coffee incense product"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection; 