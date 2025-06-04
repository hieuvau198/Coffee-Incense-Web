import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-[#FFF5F3] min-h-screen py-10 px-4 pt-10">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center mb-8 uppercase">
          Về Chúng Tôi
        </h1>

        {/* Hero Section */}
        <div className="container mx-auto mb-12 px-24">
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://i.postimg.cc/0Q7xbHHS/2.png")`,
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
              <p className="text-5xl max-w-8xl">
                Chúng tôi tái chế bã cà phê mỗi ngày kể từ năm 2025
              </p>
            </div>
          </div>
        </div>

        {/* Slogan Section */}
        <div className="container mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 leading-tight">
            Trao quyền cho chất thải cà phê<br />
            cho một tương lai bền vững
          </h2>
        </div>

        {/* Content Sections - Redesigned */}
        <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
          {/* Section 1: Hương Thơm Từ Bã Cà Phê */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Nhang thơm từ bã cà phê
              </h2>
              <h3 className="text-xl font-semibold text-gray-700">
                – Hương thơm bền vững
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Được làm từ 100% bã cà phê tái chế, mang lại hương thơm ấm áp,
                hương thơm tự nhiên, giúp thư giãn, thanh lọc không khí và
                tạo không gian thiền định, yên tĩnh. Mùi hương cà phê tự nhiên giúp giảm
                căng thẳng, giảm lo lắng và cải thiện chất lượng cuộc sống.
                Đây còn là một phần đóng góp trong quá trình tái chế chất thải,
                từ nguồn nguyên liệu tự nhiên, bảo vệ môi trường và mang lại chất lượng cuộc sống.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Yellow decorative background */}
                <div className="absolute -top-6 -right-6 w-80 h-80 bg-yellow-200 rounded-[2rem] transform rotate-12 opacity-70"></div>
                {/* Decorative star elements */}
                <div className="absolute -top-8 -left-8 text-yellow-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-6 -right-10 text-yellow-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </div>
                {/* Main image */}
                <div className="relative z-10">
                  <div className="w-72 h-72 bg-white rounded-[2rem] overflow-hidden shadow-xl transform -rotate-6 border-4 border-white">
                    <img 
                      src="https://i.postimg.cc/Qd1pJvdt/15.png" 
                      alt="Nhang thơm từ bã cà phê"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        <div className="w-[350px] h-[2px] bg-[#8B7156] rounded-full mx-auto my-12"></div>

          {/* Section 2: Nghề Nhẫn Tạo Nhang */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-24">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Nghề Nhẫn Tạo Nhang<br />
                Từ Bã Cà Phê
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Mỗi que nhang từ bã cà phê không chỉ là một sản phẩm hương thơm
                mà còn là một tác phẩm nghệ thuật, kết tinh từ tay nghề của những
                người thợ lành nghề, kết hợp giữa truyền thống của đồng nghiệp
                với công nghệ hiện đại. Từ khâu xử lý nguyên liệu đến khâu tạo hình
                thủ công, tạo ra từng que nhang chất lượng cao,
                vừa đẹp vừa mang lại hương thơm tự nhiên và bền vững.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Yellow decorative background */}
                <div className="absolute -top-6 -left-6 w-80 h-80 bg-yellow-200 rounded-[2rem] transform -rotate-12 opacity-70"></div>
                {/* Decorative star elements */}
                <div className="absolute -top-8 -right-8 text-yellow-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-6 -left-10 text-yellow-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="3"/>
                  </svg>
                </div>
                {/* Main image */}
                <div className="relative z-10">
                  <div className="w-72 h-72 bg-white rounded-[2rem] overflow-hidden shadow-xl transform rotate-6 border-4 border-white">
                    <img 
                      src="https://i.postimg.cc/3wZmPppQ/16.png" 
                      alt="Nghề Nhẫn Tạo Nhang"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        <div className="w-[350px] h-[2px] bg-[#8B7156] rounded-full mx-auto my-12"></div>

          {/* Section 3: Nhang Vòng */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Nhang Vòng – Giải Pháp Hương<br />
                Thơm Tự Nhiên, Bền Vững
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Nhang vòng là một sản phẩm không chỉ mang thiết kế truyền thống mà còn
                gắn với sinh hoạt hàng ngày của người Việt, với mong muốn
                mang đến một giải pháp an toàn, thân thiện với môi trường.
                Sản phẩm có thể sử dụng cho cả không gian trong nhà và ngoài trời,
                mang lại hương thơm tự nhiên kéo dài và tạo cảm giác thư giãn,
                phù hợp với lối sống hiện đại nhưng vẫn giữ được nét truyền thống.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Yellow decorative background */}
                <div className="absolute -top-6 -right-6 w-80 h-80 bg-yellow-200 rounded-[2rem] transform rotate-12 opacity-70"></div>
                {/* Decorative star elements */}
                <div className="absolute -top-8 -left-8 text-yellow-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-6 -right-10 text-yellow-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                </div>
                {/* Main image */}
                <div className="relative z-10">
                  <div className="w-72 h-72 bg-white rounded-[2rem] overflow-hidden shadow-xl transform -rotate-6 border-4 border-white">
                    <img 
                      src="https://i.postimg.cc/hGnVyMX0/17.png" 
                      alt="Nhang Vòng"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[750px] h-[2px] bg-[#8B7156] rounded-full mx-auto my-8"></div>

        {/* Why We Do Section */}
        <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
          <h2 className="text-5xl font-bold text-center mb-16 mt-28">
            Tại Sao Nên Hoạt Động
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="text-center">
              <img
                src="https://i.postimg.cc/XqXytzKT/image-90.png"
                alt="Tác động bền vững"
                className="w-28 h-28 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-2">Tác động bền vững</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi biến bã cà phê đã qua sử dụng thành sản phẩm thân thiện với môi trường, giúp giảm chất thải và bảo vệ thiên nhiên.
              </p>
            </div>
            {/* Item 2 */}
            <div className="text-center">
              <img
                src="https://i.postimg.cc/VvTbwWD5/image-91.png"
                alt="Đổi mới thiên nhiên"
                className="w-28 h-28 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-2">Đổi mới thiên nhiên</h3>
              <p className="text-gray-600 text-sm">
                Sản phẩm từ bã cà phê được xử lý tự nhiên, không sử dụng hóa chất, giúp bạn tận hưởng hương thơm tự nhiên, an toàn.
              </p>
            </div>
            {/* Item 3 */}
            <div className="text-center">
              <img
                src="https://i.postimg.cc/05HS79Px/image.png"
                alt="Cộng đồng & Nhan thức"
                className="w-28 h-28 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-2">Cộng đồng & Nhận thức</h3>
              <p className="text-gray-600 text-sm">
                Thông qua các hoạt động tái chế, chúng tôi góp phần nâng cao ý thức bảo vệ môi trường, khuyến khích lối sống xanh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AboutUs;