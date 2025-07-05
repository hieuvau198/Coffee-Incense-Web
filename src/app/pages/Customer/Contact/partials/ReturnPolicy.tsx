// src\app\pages\Customer\Contact\partials\ReturnPolicy.tsx
import React from 'react';

const ReturnPolicy: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#91775A] mb-2">
          CHÍNH SÁCH ĐỔI TRẢ – HOÀN TIỀN
        </h2>
        <p className="text-lg text-gray-600">
          EBC – ECO BREW CYCLE
        </p>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-700 mb-6 text-center italic">
          Cảm ơn quý khách đã tin tưởng và lựa chọn các sản phẩm nhang hương tái chế từ bã cà phê của EBC. 
          Chúng tôi luôn nỗ lực mang đến trải nghiệm mua sắm tốt nhất, vì vậy EBC áp dụng{' '}
          <span className="font-semibold text-[#91775A]">chính sách đổi trả – hoàn tiền minh bạch, nhanh chóng và vì quyền lợi khách hàng</span> như sau:
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Sản phẩm áp dụng đổi trả */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-2">📦</span>
              SẢN PHẨM ÁP DỤNG ĐỔI TRẢ
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Nhang hương, bột xông, quà tặng, combo sản phẩm tái chế từ bã cà phê của EBC.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Sản phẩm <span className="font-semibold">chưa qua sử dụng</span>, còn <span className="font-semibold">nguyên vẹn bao bì</span>, <span className="font-semibold">đầy đủ hóa đơn hoặc mã đơn hàng</span>.
              </li>
            </ul>
          </div>

          {/* Không áp dụng đổi trả */}
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-2">❌</span>
              KHÔNG ÁP DỤNG ĐỔI TRẢ
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Sản phẩm bị hư hỏng do <span className="font-semibold">sử dụng sai cách</span> hoặc <span className="font-semibold">bảo quản không đúng</span>.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Sản phẩm đã <span className="font-semibold">mở bao bì, đốt, hoặc sử dụng một phần</span>.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Đổi trả sau thời gian quy định.
              </li>
            </ul>
          </div>
        </div>

        {/* Thời gian đổi trả */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <span className="text-2xl mr-2">🕒</span>
            THỜI GIAN ĐỔI TRẢ
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>• Trong vòng <span className="font-bold text-blue-600 text-xl">3 ngày</span> kể từ ngày nhận hàng (dựa trên thông tin vận chuyển).</p>
            <p>• Sau thời gian này, EBC xin phép từ chối xử lý đổi/trả.</p>
          </div>
        </div>

        {/* Quy trình đổi trả */}
        <div className="bg-[#91775A]/5 p-6 rounded-lg mb-8">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <span className="text-2xl mr-2">🔁</span>
            QUY TRÌNH ĐỔI TRẢ
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="bg-[#91775A] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
              <p className="text-gray-700">
                <span className="font-semibold">Liên hệ</span> qua Facebook hoặc hotline <span className="font-bold text-[#91775A]">0704 585 671</span> trong vòng 3 ngày nhận hàng.
              </p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#91775A] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
              <p className="text-gray-700">
                <span className="font-semibold">Cung cấp hình ảnh/video</span> sản phẩm lỗi (nếu có), mã đơn hàng và lý do đổi/trả.
              </p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#91775A] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
              <div className="text-gray-700">
                <p className="font-semibold mb-2">Sau khi xác nhận, EBC sẽ:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Gửi sản phẩm mới (đối với lỗi từ phía shop).</li>
                  <li>• Hoàn tiền (nếu khách hàng không muốn đổi).</li>
                  <li>• Hướng dẫn gửi trả (nếu cần thu hồi sản phẩm).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phí vận chuyển */}
        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <span className="text-2xl mr-2">💸</span>
            PHÍ VẬN CHUYỂN
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>• <span className="font-semibold text-green-600">Miễn phí đổi trả</span> nếu lỗi do sản xuất hoặc giao nhầm.</p>
            <p>• Nếu đổi vì lý do cá nhân (không thích mùi, đặt nhầm loại, v.v.): khách chịu phí 2 chiều.</p>
          </div>
        </div>

        {/* Hỗ trợ & liên hệ */}
        <div className="bg-[#91775A] text-white p-6 rounded-lg mb-8">
          <h3 className="flex items-center text-xl font-semibold mb-4">
            <span className="text-2xl mr-2">📞</span>
            HỖ TRỢ & LIÊN HỆ
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Hotline:</span>
              <a href="tel:0704585671" className="text-yellow-300 hover:text-yellow-100 font-bold">
                0704 585 671
              </a>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Facebook:</span>
              <a 
                href="https://www.facebook.com/people/Eco-Brew-Cycle/61556699531934/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-100 underline"
              >
                Eco Brew Cycle
              </a>
            </div>
          </div>
        </div>

        {/* Lời cảm ơn */}
        <div className="text-center bg-green-50 p-6 rounded-lg">
          <p className="text-gray-700 italic text-lg leading-relaxed">
            <span className="text-2xl mr-2">🙏</span>
            <span className="font-semibold text-[#91775A]">EBC trân trọng cảm ơn sự đồng hành của bạn trong hành trình tái chế và sống xanh.</span>
            <br />
            Mọi thắc mắc luôn được lắng nghe và xử lý tận tâm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;