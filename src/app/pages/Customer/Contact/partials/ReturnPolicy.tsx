// src\app\pages\Customer\Contact\partials\ReturnPolicy.tsx
import React from 'react';

const ReturnPolicy: React.FC = () => {
  return (
    <div className="text-white">
      

      {/* Intro */}
      <div className="text-center mb-16">
        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
          Cảm ơn quý khách đã tin tưởng và lựa chọn các sản phẩm nhang hương tái chế từ bã cà phê của EBC. 
          Chúng tôi luôn nỗ lực mang đến trải nghiệm mua sắm tốt nhất, vì vậy EBC áp dụng{' '}
          <span className="text-[#91775A] font-bold">chính sách đổi trả – hoàn tiền minh bạch, nhanh chóng và vì quyền lợi khách hàng</span> như sau:
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Sản phẩm áp dụng đổi trả */}
        <div className="group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            <div className="relative bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 hover:bg-black/50 transition-all duration-300">
              <h3 className="flex items-center text-xl font-bold text-white mb-6">
                <span className="text-3xl mr-3">📦</span>
                SẢN PHẨM ÁP DỤNG ĐỔI TRẢ
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#91775A] mr-3 mt-1">•</span>
                  <span>Nhang hương, bột xông, quà tặng, combo sản phẩm tái chế từ bã cà phê của EBC.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#91775A] mr-3 mt-1">•</span>
                  <span>Sản phẩm <span className="text-white font-semibold">chưa qua sử dụng</span>, còn <span className="text-white font-semibold">nguyên vẹn bao bì</span>, <span className="text-white font-semibold">đầy đủ hóa đơn hoặc mã đơn hàng</span>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Không áp dụng đổi trả */}
        <div className="group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-l from-red-500/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            <div className="relative bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:bg-black/50 transition-all duration-300">
              <h3 className="flex items-center text-xl font-bold text-white mb-6">
                <span className="text-3xl mr-3">❌</span>
                KHÔNG ÁP DỤNG ĐỔI TRẢ
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <span>Sản phẩm bị hư hỏng do <span className="text-white font-semibold">sử dụng sai cách</span> hoặc <span className="text-white font-semibold">bảo quản không đúng</span>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <span>Sản phẩm đã <span className="text-white font-semibold">mở bao bì, đốt, hoặc sử dụng một phần</span>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <span>Đổi trả sau thời gian quy định.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Thời gian đổi trả */}
      <div className="group mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-[#91775A]/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative bg-black/30 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8 hover:bg-black/50 transition-all duration-300">
            <h3 className="flex items-center text-2xl font-bold text-white mb-6">
              <span className="text-3xl mr-3">🕒</span>
              THỜI GIAN ĐỔI TRẢ
            </h3>
            <div className="text-gray-300 space-y-3">
              <p className="text-lg">• Trong vòng <span className="font-black text-[#91775A] text-2xl">3 NGÀY</span> kể từ ngày nhận hàng (dựa trên thông tin vận chuyển).</p>
              <p className="text-lg">• Sau thời gian này, EBC xin phép từ chối xử lý đổi/trả.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quy trình đổi trả */}
      <div className="group mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#91775A]/20 via-transparent to-[#91775A]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative bg-black/30 backdrop-blur-sm border border-[#91775A]/30 rounded-2xl p-8 hover:bg-black/50 transition-all duration-300">
            <h3 className="flex items-center text-2xl font-bold text-white mb-8">
              <span className="text-3xl mr-3">🔁</span>
              QUY TRÌNH ĐỔI TRẢ
            </h3>
            <div className="space-y-6">
              <div className="flex items-start group/step">
                <span className="bg-[#91775A] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 mt-1 group-hover/step:scale-110 transition-transform duration-300">1</span>
                <p className="text-gray-300 text-lg">
                  <span className="text-white font-semibold">Liên hệ</span> qua Facebook hoặc hotline <span className="font-bold text-[#91775A] text-xl">0704 585 671</span> trong vòng 3 ngày nhận hàng.
                </p>
              </div>
              <div className="flex items-start group/step">
                <span className="bg-[#91775A] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 mt-1 group-hover/step:scale-110 transition-transform duration-300">2</span>
                <p className="text-gray-300 text-lg">
                  <span className="text-white font-semibold">Cung cấp hình ảnh/video</span> sản phẩm lỗi (nếu có), mã đơn hàng và lý do đổi/trả.
                </p>
              </div>
              <div className="flex items-start group/step">
                <span className="bg-[#91775A] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 mt-1 group-hover/step:scale-110 transition-transform duration-300">3</span>
                <div className="text-gray-300 text-lg">
                  <p className="text-white font-semibold mb-3">Sau khi xác nhận, EBC sẽ:</p>
                  <ul className="ml-4 space-y-2">
                    <li className="flex items-start">
                      <span className="text-[#91775A] mr-2">•</span>
                      Gửi sản phẩm mới (đối với lỗi từ phía shop).
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#91775A] mr-2">•</span>
                      Hoàn tiền (nếu khách hàng không muốn đổi).
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#91775A] mr-2">•</span>
                      Hướng dẫn gửi trả (nếu cần thu hồi sản phẩm).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phí vận chuyển */}
      <div className="group mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative bg-black/30 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 hover:bg-black/50 transition-all duration-300">
            <h3 className="flex items-center text-2xl font-bold text-white mb-6">
              <span className="text-3xl mr-3">💸</span>
              PHÍ VẬN CHUYỂN
            </h3>
            <div className="text-gray-300 space-y-3 text-lg">
              <p>• <span className="font-bold text-green-400">Miễn phí đổi trả</span> nếu lỗi do sản xuất hoặc giao nhầm.</p>
              <p>• Nếu đổi vì lý do cá nhân (không thích mùi, đặt nhầm loại, v.v.): khách chịu phí 2 chiều.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hỗ trợ & liên hệ */}
      <div className="group mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#91775A]/30 to-transparent rounded-2xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <div className="relative bg-[#91775A]/20 backdrop-blur-sm border border-[#91775A]/50 rounded-2xl p-8 hover:bg-[#91775A]/30 transition-all duration-300">
            <h3 className="flex items-center text-2xl font-bold text-white mb-6">
              <span className="text-3xl mr-3">📞</span>
              HỖ TRỢ & LIÊN HỆ
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center">
                <span className="text-white font-semibold mr-3">Hotline:</span>
                <a href="tel:0704585671" className="text-[#91775A] hover:text-white font-bold text-xl transition-colors duration-300">
                  0704 585 671
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-white font-semibold mr-3">Facebook:</span>
                <a 
                  href="https://www.facebook.com/people/Eco-Brew-Cycle/61556699531934/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#91775A] hover:text-white underline transition-colors duration-300"
                >
                  Eco Brew Cycle
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lời cảm ơn */}
      <div className="group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#91775A]/20 via-green-500/20 to-[#91775A]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative bg-black/30 backdrop-blur-sm border border-[#91775A]/30 rounded-2xl p-8 text-center hover:bg-black/50 transition-all duration-300">
            <p className="text-gray-300 text-lg leading-relaxed">
              <span className="text-4xl mb-4 block">🙏</span>
              <span className="text-[#91775A] font-bold text-xl block mb-2">EBC trân trọng cảm ơn sự đồng hành của bạn trong hành trình tái chế và sống xanh.</span>
              <span className="text-white">Mọi thắc mắc luôn được lắng nghe và xử lý tận tâm.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;