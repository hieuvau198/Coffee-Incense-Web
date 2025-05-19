import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-[#91775A] text-white p-6 h-full relative">
      <h3 className="font-semibold text-lg mb-6">Thông tin liên hệ</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <span className="inline-block w-6">📞</span>
          <span>0919967867</span>
        </div>
        
        <div className="flex items-center">
          <span className="inline-block w-6">✉️</span>
          <span>EcoBrewCycle@gmail.com</span>
        </div>
        
        <div className="flex items-start">
          <span className="inline-block w-6 mt-1">📍</span>
          <span>Lưu Hữu Phước Tân Lập, Đồng Hòa, Dĩ An, Bình Dương</span>
        </div>
      </div>
      
      {/* Social Media Icons */}
      <div className="flex space-x-2 mt-24">
        <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors flex items-center justify-center w-8 h-8">
          <span className="text-white text-sm">🐦</span>
        </a>
        <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors flex items-center justify-center w-8 h-8">
          <span className="text-white text-sm">📸</span>
        </a>
        <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors flex items-center justify-center w-8 h-8">
          <span className="text-white text-sm">💬</span>
        </a>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#A38B73]/30 rounded-full -mr-16 -mb-16"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#7D6548]/30 rounded-full -mr-4 -mb-4"></div>
    </div>
  );
};

export default ContactInfo;