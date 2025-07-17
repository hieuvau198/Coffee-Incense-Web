// src\app\pages\Customer\Contact\Contact.tsx
import React, { useState, useEffect } from 'react';
import ContactForm from './partials/ContactForm';
import ContactInfo from './partials/ContactInfo';
import ReturnPolicy from './partials/ReturnPolicy';

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      {/* Hero Section - Full Screen with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000"
          style={{ 
            backgroundImage: `url("https://i.postimg.cc/XNTdMZ9D/image.png")`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            filter: "brightness(0.4) contrast(1.2)"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown/60 via-transparent to-black/80" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#91775A] rounded-full animate-pulse opacity-70" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full animate-bounce opacity-50" />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-[#91775A] rounded-full animate-ping opacity-60" />
        
        {/* Main Content */}
        <div className={`relative z-10 text-center px-6 max-w-6xl transform transition-all duration-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            <span className="block">LIÊN HỆ</span>
            <span className="text-[#91775A] block transform hover:scale-105 transition-transform duration-300">
              VỚI CHÚNG TÔI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed max-w-4xl mx-auto">
            Bạn muốn trở thành nhà cung cấp bột cà phê cho dịch vụ của chúng tôi? 
            <br className="hidden md:block" />
            <span className="text-[#91775A] font-medium">Chỉ cần viết tin nhắn cho chúng tôi!</span>
          </p>
          
          {/* CTA Button */}
          <button className="group relative px-12 py-4 bg-[#91775A] text-white font-bold text-lg rounded-none hover:bg-white hover:text-[#91775A] transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10">BẮT ĐẦU NGAY</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Contact Section - Coffee Incense Theme */}
      <section className="relative py-20 bg-gradient-to-b from-[#2D1810] via-[#3D2517] to-[#4A2C1A]">
        {/* Coffee Bean Pattern Background */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 20%, #8B4513 2px, transparent 2px),
                                radial-gradient(circle at 80% 80%, #D2691E 1px, transparent 1px)`,
               backgroundSize: '60px 60px, 40px 40px'
             }} />
        
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#F4E4BC] mb-6">
              KẾT NỐI VỚI CHÚNG TÔI
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D2691E] to-[#DAA520] mx-auto" />
          </div>

          {/* Contact Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Info - Coffee Theme */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D2691E]/30 to-[#DAA520]/20 rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-br from-[#1A0F08]/90 to-[#2D1810]/90 backdrop-blur-sm border border-[#8B4513]/30 rounded-3xl p-8 hover:bg-[#2D1810]/95 transition-all duration-500 shadow-2xl">
                  <ContactInfo />
                </div>
              </div>

              {/* Contact Form - Coffee Theme */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-l from-[#DAA520]/30 to-[#D2691E]/20 rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-bl from-[#1A0F08]/90 to-[#2D1810]/90 backdrop-blur-sm border border-[#8B4513]/30 rounded-3xl p-8 hover:bg-[#2D1810]/95 transition-all duration-500 shadow-2xl">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Policy Section - Darker Coffee Theme */}
      <section className="relative py-20 bg-gradient-to-b from-[#4A2C1A] via-[#5D3621] to-[#6B3E07]">
        {/* Incense Smoke Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-px h-32 bg-gradient-to-t from-[#DAA520] to-transparent transform rotate-12 animate-pulse" />
          <div className="absolute top-20 right-1/3 w-px h-24 bg-gradient-to-t from-[#D2691E] to-transparent transform -rotate-12 animate-pulse delay-300" />
          <div className="absolute bottom-20 left-1/2 w-px h-28 bg-gradient-to-t from-[#CD853F] to-transparent transform rotate-6 animate-pulse delay-700" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#F4E4BC] mb-6">
              CHÍNH SÁCH ĐỔI TRẢ
            </h2>
            <p className="text-xl text-[#DEB887] max-w-3xl mx-auto">
              Cam kết minh bạch, nhanh chóng và vì quyền lợi khách hàng
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#DAA520] to-[#D2691E] mx-auto mt-6" />
          </div>

          {/* Policy Content */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#DAA520]/20 via-[#D2691E]/10 to-[#DAA520]/20 rounded-3xl blur-2xl" />
            <div >
              <ReturnPolicy />
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Contact;