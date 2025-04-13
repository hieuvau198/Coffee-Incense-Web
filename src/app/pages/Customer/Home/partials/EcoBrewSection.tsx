import { Button } from "antd";
import { useNavigate } from "react-router";

const EcoBrewSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col md:flex-row items-center gap-8 mx-0 md:mx-6">
          {/* Left content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="mb-4">
              <img 
                src="/assets/images/fbc-logo.png" 
                alt="FBC Logo" 
                className="h-16 md:h-20 w-auto mb-4"
              />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-[#8B7156]">ECO BREW</span> 
                <br />
                Cycle
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              EcoBrewCycle là quy trình cà phê thơm ngon, sạch và trách nhiệm với môi trường. Thụ quân tái sử dụng các phế phẩm từ lý trình chế biến không bỏ chất, tận dụng mọng lại hương thơm nhu mịn, giúp thư giãn và giảm căng thẳng, cho sự khâng phí trong nên xanh đẹp, phổi bạn thoát mảt cỏn tắm đều là sống xanh, trở lại môi trong hành trình dạo về môi trường.
            </p>
            
            <div className="flex">
              <Button
                onClick={() => navigate('/products')}
                className="bg-transparent hover:bg-transparent border-[#8B7156] text-[#8B7156] px-8 rounded-full"
              >
                Xem chi tiết
              </Button>
            </div>

            <div className="pt-6">
              <img 
                src="/assets/images/leaf-decoration.png" 
                alt="Leaf decoration" 
                className="h-16 opacity-80"
              />
            </div>
          </div>
          
          {/* Right image */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/assets/images/eco-brew-coffee.jpg"
                alt="Coffee brewing process"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoBrewSection; 