// src/app/pages/Customer/Blog/Blog.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../../../../mocks/blog";

const Blog: React.FC = () => {
  const navigate = useNavigate();

  // Lấy 4 bài viết đầu tiên
  const limitedPosts = blogPosts.slice(0, 4);

  const handlePostClick = (postId: number) => {
    navigate(`/blogs/${postId}`);
  };

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
          {limitedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row gap-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handlePostClick(post.id)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-56 h-40 object-cover rounded-t-md md:rounded-none md:rounded-l-md transition-transform duration-300 hover:scale-110"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2 hover:text-amber-700 transition-colors">
                    {post.title}
                  </h2>
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
