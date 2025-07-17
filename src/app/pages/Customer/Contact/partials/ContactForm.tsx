// src\app\pages\Customer\Contact\partials\ContactForm.tsx
import React, { useState } from 'react';

interface FormData {
  ho: string;
  ten: string;
  email: string;
  soDienThoai: string;
  message: string;
  chonChuDe: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ho: '',
    ten: '',
    email: '',
    soDienThoai: '',
    message: '',
    chonChuDe: 'hopTacHoiThao',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      chonChuDe: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="ho" className="block text-sm font-medium text-gray-700 mb-1">Họ</label>
          <input
            type="text"
            id="ho"
            name="ho"
            value={formData.ho}
            onChange={handleInputChange}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#91775A]"
          />
        </div>
        <div>
          <label htmlFor="ten" className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
          <input
            type="text"
            id="ten"
            name="ten"
            value={formData.ten}
            onChange={handleInputChange}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#91775A]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#91775A]"
          />
        </div>
        <div>
          <label htmlFor="soDienThoai" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input
            type="tel"
            id="soDienThoai"
            name="soDienThoai"
            value={formData.soDienThoai}
            onChange={handleInputChange}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#91775A]"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Chọn chủ đề?</p>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="hopTacHoiThao"
              name="chonChuDe"
              checked={formData.chonChuDe === 'hopTacHoiThao'}
              onChange={() => handleRadioChange('hopTacHoiThao')}
              className="mr-2 h-4 w-4 accent-[#91775A]"
            />
            <label htmlFor="hopTacHoiThao" className="text-xs text-gray-700">
              Hợp tác hội thảo
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="boSuuTapCaPhe"
              name="chonChuDe"
              checked={formData.chonChuDe === 'boSuuTapCaPhe'}
              onChange={() => handleRadioChange('boSuuTapCaPhe')}
              className="mr-2 h-4 w-4 accent-[#91775A]"
            />
            <label htmlFor="boSuuTapCaPhe" className="text-xs text-gray-700">
              Bộ sưu tập cà phê
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="donHangBanBuon"
              name="chonChuDe"
              checked={formData.chonChuDe === 'donHangBanBuon'}
              onChange={() => handleRadioChange('donHangBanBuon')}
              className="mr-2 h-4 w-4 accent-[#91775A]"
            />
            <label htmlFor="donHangBanBuon" className="text-xs text-gray-700">
              Đơn hàng bán buôn
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="quanHeDaiTacKinh"
              name="chonChuDe"
              checked={formData.chonChuDe === 'quanHeDaiTacKinh'}
              onChange={() => handleRadioChange('quanHeDaiTacKinh')}
              className="mr-2 h-4 w-4 accent-[#91775A]"
            />
            <label htmlFor="quanHeDaiTacKinh" className="text-xs text-gray-700">
              Quan hệ đối tác kinh doanh
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Write your message..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#91775A] focus:border-[#91775A]"
        />
      </div>
      
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-[#91775A] text-white rounded-md hover:bg-[#7D6548] transition-colors"
        >
          Gửi tin nhắn
        </button>
      </div>
    </form>
  );
};

export default ContactForm;