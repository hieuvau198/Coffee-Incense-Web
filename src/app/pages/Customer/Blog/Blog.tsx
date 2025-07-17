// src\app\pages\Customer\Blog\Blog.tsx
import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Hành Trình Biến Bã Cà Phê Thành Hương",
    description:
      "Bã cà phê, vốn bị bỏ đi sau pha, thực ra là một nguồn tài nguyên quý giá cho hương thơm. ",
    image: "https://i.postimg.cc/brsfbx8x/21.jpg",
    date: "06/04/2025",
  },
  {
    id: 2,
    title: "Giải Pháp Tự Nhiên Cho Không Gian Sống",
    description:
      "Hương thơm từ bã cà phê mang đến cảm giác dễ chịu, là lựa chọn lý tưởng để thanh lọc không khí trong nhà mà không cần hóa chất.",
    image: "https://i.postimg.cc/SNYpxfgq/22.jpg",
    date: "06/04/2025",
  },
  {
    id: 3,
    title: "Bước Đơn Giản Để Bảo Vệ Sức Khỏe",
    description:
      "Hít thở hương cà phê không chỉ thư giãn mà còn giúp tinh thần tỉnh táo và dễ chịu mỗi ngày.",
    image: "https://i.postimg.cc/kMpmCpFf/23.jpg",
    date: "06/04/2025",
  },
  {
    id: 4,
    title: "Thư Giãn Với Hương Nhang Từ Bã Cà Phê",
    description:
      "Tận dụng bã cà phê để làm hương nhang là một cách vừa thân thiện với môi trường vừa mang lại trải nghiệm thư giãn độc đáo.",
    image: "https://i.postimg.cc/T1FMcKYZ/24.jpg",
    date: "06/04/2025",
  },
];

const Blog: React.FC = () => {
  return (
    <div className="bg-[#F9F2EA] min-h-screen py-10 px-4 pt-10">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 uppercase">
          Blog của chúng tôi
        </h1>

        {/* Hero Section with Background Image */}
        <div className="container mx-auto mb-12 px-24">
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://i.postimg.cc/7ZSNt3cV/image-89.png")`,
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
              <p className="text-5xl max-w-8xl">
                Khám phá những câu chuyện thú vị về hành trình tái chế bã cà phê!
              </p>
            </div>
          </div>
        </div>

        {/* Blog list */}
        <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row gap-4 mb-6"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-56 h-40 object-cover rounded-t-md md:rounded-none md:rounded-l-md transition-transform duration-300 hover:scale-110"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm">{post.description}</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">Hoanvngoc • {post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;