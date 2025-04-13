import React from "react";

const ContactMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-8">
      <div className="w-36 h-36 rounded-full border-4 border-green-500 flex items-center justify-center mb-8">
        <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center">
          <svg 
            className="w-16 h-16 text-white" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-base font-medium text-gray-700 uppercase leading-relaxed">
          CHÚNG TÔI LUÔN LUÔN LẮNG NGHE & TRẢ LỜI<br />
          NGAY LẬP TỨC CÁC YÊU CẦU CỦA BẠN
        </p>
      </div>
    </div>
  );
};

export default ContactMessage;