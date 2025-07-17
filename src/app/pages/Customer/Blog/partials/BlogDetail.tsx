// src/app/pages/Customer/Blog/partials/BlogDetail.tsx
import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  Calendar, User, Share2, Heart, MessageCircle } from "lucide-react";
import { blogPosts, relatedPosts } from "../../../../../mocks/blog";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Tìm bài post dựa vào id từ url param
  const post = blogPosts.find(p => p.id === Number(id));
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!post) {
    return (
      <div className="bg-[#F9F2EA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F2EA] min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8">

      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48 mb-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <User size={16} />
              {post.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              {post.readTime}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
            style={{
              lineHeight: '1.8',
              fontSize: '16px'
            }}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-6 border-t">
            <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart size={20} />
              Thích
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
              <Share2 size={20} />
              Chia sẻ
            </button>
          </div>
        </div>

        {/* Related posts */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/blogs/${relatedPost.id}`)}
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                />
                <h4 className="font-semibold text-sm group-hover:text-amber-700 transition-colors">
                  {relatedPost.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{relatedPost.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default BlogDetail;
