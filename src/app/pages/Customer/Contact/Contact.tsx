import React from 'react';
import ContactForm from './partials/ContactForm';
import ContactInfo from './partials/ContactInfo';

const Contact: React.FC = () => {
  return (
    <div className="bg-[#F9F2EA] min-h-screen py-10 px-4 pt-10">
      {/* Header */}
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center uppercase mb-4">
          Liên hệ với chúng tôi
        </h1>
      </div>
      
      {/* Hero Section with Background Image */}
      <div className="container mx-auto mb-8 px-24">
        <div className="rounded-lg overflow-hidden h-[400px] relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url("https://i.postimg.cc/XNTdMZ9D/image.png")`,
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
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
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