import { Button } from "antd";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lê Hoàng Khang",
    position: "Sản phẩm tốt nhất, mình mua và ngửi quá tốt",
    text: "Giao hàng nhanh, đóng gói đẹp lắm, mình rất thích hương thơm của sản phẩm.",
    rating: 5
  },
  {
    id: 2,
    name: "Lê Phạm Khánh Hà",
    position: "Sản phẩm khác biệt, tôi rất thích vì không tạo ra mùi khói",
    text: "Sản phẩm rất đặc biệt, mình có thể hương thơm hàng giờ mà không có khói.",
    rating: 5
  },
  {
    id: 3,
    name: "Đặng Hoàng",
    position: "Sản phẩm quá tốt nhất",
    text: "Mình rất thích mùi hương, đặc biệt là hương cà phê rất đặc trưng và dễ chịu.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 xl:px-20">
        <div className="mx-0 md:mx-6">
          <h2 className="text-3xl font-bold text-center text-[#2D2424] mb-12">
            CẢM NHẬN CỦA KHÁCH HÀNG
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-[#8B7156] text-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <div className="flex">
                    <Button 
                      shape="circle" 
                      icon={<span className="text-[#8B7156]">👍</span>} 
                      className="bg-white border-0 flex items-center justify-center ml-2"
                    />
                  </div>
                </div>
                
                <p className="text-sm mb-4">{testimonial.position}</p>
                
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-300">★</span>
                  ))}
                </div>
                
                <p className="text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 