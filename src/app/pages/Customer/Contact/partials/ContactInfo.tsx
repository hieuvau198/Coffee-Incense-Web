// src\app\pages\Customer\Contact\partials\ContactInfo.tsx
import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="text-white h-full relative overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
          THÔNG TIN LIÊN HỆ
        </h3>
        <div className="w-16 h-1 bg-[#91775A]" />
      </div>
      
      {/* Contact Items */}
      <div className="space-y-8 mb-12">
        {/* Phone */}
        <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 bg-[#91775A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">HOTLINE</p>
            <a href="tel:0919967867" className="text-lg md:text-xl font-bold text-white hover:text-[#91775A] transition-colors">
              0919967867
            </a>
          </div>
        </div>
        
        {/* Email */}
        <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 bg-[#91775A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">EMAIL</p>
            <a href="mailto:EcoBrewCycle@gmail.com" className="text-lg md:text-xl font-bold text-white hover:text-[#91775A] transition-colors break-all">
              EcoBrewCycle@gmail.com
            </a>
          </div>
        </div>
        
        {/* Address */}
        <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 bg-[#91775A] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">ĐỊA CHỈ</p>
            <p className="text-lg md:text-xl font-bold text-white leading-relaxed">
              Lưu Hữu Phước Tân Lập,<br />
              Đồng Hòa, Dĩ An, Bình Dương
            </p>
          </div>
        </div>
      </div>
      
      {/* Social Media */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm font-medium mb-4">THEO DÕI CHÚNG TÔI</p>
        <div className="flex space-x-4">
          <a href="#" className="group w-12 h-12 bg-white/10 hover:bg-[#91775A] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" className="group w-12 h-12 bg-white/10 hover:bg-[#91775A] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="group w-12 h-12 bg-white/10 hover:bg-[#91775A] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#91775A]/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" />
    </div>
  );
};

export default ContactInfo;