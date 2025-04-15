import React from 'react';
import ContactForm from './partials/ContactForm';
import ContactInfo from './partials/ContactInfo';

const Contact: React.FC = () => {
  return (
    <div className="bg-[#FFF5F3] min-h-screen py-8 px-4">
      {/* Header */}
      <div className="container mx-auto mb-6">
        <h1 className="text-4xl font-bold text-center uppercase mb-4">
          Liên hệ với chúng tôi
        </h1>
      </div>
      
      {/* Hero Section with Background Image */}
      <div className="container mx-auto mb-8 px-24">
        <div className="rounded-lg overflow-hidden h-[400px] relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url("https://s3-alpha-sig.figma.com/img/f5a4/4413/51b2ab12ce092a1149cd8935f4501190?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FOI3WzMQQ8-TLSmV2Okw5Z28kt5AZnA2PrGqTzwPWlTZWU5Wg3dOCbctjUv6AwlVT7KZqv8zsH-~94Zsui2SViOSOqmKjQPzusnyDyqYTf7TgTacUBIEDDd356ev0XWA1QccweyUeixALOgvPyzaz9QjGH-pVNv-hQKZwlgosDWZVQZ~SqlDUJoxrWY38ErJ0q~B1tP0Skeh7~1VcuWJo70ib10fsMriTX8Oi8FjMjDhuuluLMojvicVUZ3TnkxRhrJV9lnYrMNx8h1LxeO-aszbsN8dxEI4zwN~r1f3Qe9K1XNxs3oGLP0QKB2bDOq-OubhVTfo6ICV8UB8kbig6Q__")`,
              filter: "brightness(0.7)" 
            }}
          ></div>
          
          <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
            <p className="text-5xl max-w-8xl">
              Bạn muốn trở thành nhà cung cấp bột cà phê cho dịch vụ của chúng tôi? Chỉ cần viết tin nhắn cho chúng tôi!
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden px-6 py-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-10">
            {/* Left column - Contact Info */}
            <div className="w-full lg:w-[48%]">
              <ContactInfo />
            </div>

            {/* Right column - Form */}
            <div className="w-full lg:w-[48%]">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;