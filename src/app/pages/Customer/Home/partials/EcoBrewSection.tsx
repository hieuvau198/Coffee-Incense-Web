import { Button } from "antd";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imageList = [
  "https://i.postimg.cc/RhHjNMBv/1.jpg",
  "https://i.postimg.cc/mkWG3cVP/2.jpg",
  "https://i.postimg.cc/ydZHShhq/3.jpg",
];

const EcoBrewSection = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNextImage = () => {
  setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
};


  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="flex flex-col md:flex-row items-center gap-8 mx-0 md:mx-6">
          {/* Left content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="mb-4">
              <h2 className="text-8xl md:text-7xl font-bold">
                <span className="text-[#8B7156]">ECO BREW</span> 
                <br />
                Cycle
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              EcoBrewCycle là dự án khởi nghiệp xanh, tiên phong trong việc tái chế bã cà phê thành nhang sạch, an toàn cho sức khỏe và thân thiện với môi trường. Chúng tôi thu gom bã cà phê từ các quán cà phê địa phương, sau đó xử lý theo quy trình tự nhiên, không sử dụng hóa chất, mang đến sản phẩm nhang với hương thơm dịu nhẹ, dễ chịu, tinh khiết giúp thư giãn tinh thần, tạo không gian an lành và góp phần giảm thiểu lượng rác thải ra môi trường. Với mỗi que nhang được thắp lên, bạn không chỉ tận hưởng mùi hương tinh khiết mà còn cùng chúng tôi lan tỏa lối sống xanh, bền vững và ý nghĩa hơn cho cộng đồng.
            </p>
            
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/about')}
                className="text-lg bg-transparent hover:bg-transparent border-[#8B7156] text-[#8B7156] px-8 rounded-full"
              >
                Xem chi tiết
              </Button>
            </div>

            <div className="pt-4">
              <img 
                src="https://i.postimg.cc/x8ccqjnx/image-78.png" 
                alt="Leaf decoration" 
                className="w-28 ml-16 mt-4"
              />
            </div>
          </div>

          {/* Right slider image */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-full rounded-lg overflow-hidden md:ml-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={imageList[currentImageIndex]}
                  alt="EcoBrew showcase"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="w-[460px] h-[600px] object-cover mx-auto rounded-lg shadow-lg"
                />
              </AnimatePresence>

              {/* Nút chuyển ảnh */}
              <button
                onClick={handleNextImage}
                className="absolute bottom-4 right-4 bg-[#8B7156] hover:bg-[#a88d74] text-white rounded-full p-3 shadow-lg transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoBrewSection;
