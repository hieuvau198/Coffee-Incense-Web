import React from 'react';
import { Card, Avatar, Divider, Button } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

// Define types for the profile data
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  bio: string;
  joinDate: string;
}

const Profile: React.FC = () => {
  // Mock profile data
  const profile: ProfileData = {
    name: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    phone: "+84 123 456 789",
    address: "123 Đường Láng, Đống Đa, Hà Nội",
    avatar: "https://images.unsplash.com/photo-1535713875001-d1d0cfed86b9?w=400&h=400&fit=crop",
    bio: "Tôi là một người đam mê tái chế và bảo vệ môi trường, đặc biệt yêu thích việc biến bã cà phê thành những sản phẩm hữu ích.",
    joinDate: "Tham gia: 01/01/2024",
  };

  return (
    <div className="min-h-screen bg-[#F9F2EA] py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D2424]">Hồ sơ cá nhân</h1>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C] h-10"
          >
            Chỉnh sửa
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-white shadow-md border-0 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Avatar Section */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                size={150}
                className="border-4 border-[#8B7156]/20 shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-[#2D2424] mb-2">{profile.name}</h2>
              <p className="text-[#8B7156]/80 text-sm mb-4">{profile.joinDate}</p>

              <div className="space-y-3">
                <div className="flex items-center text-[#2D2424]">
                  <MailOutlined className="mr-3 text-[#8B7156]" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center text-[#2D2424]">
                  <PhoneOutlined className="mr-3 text-[#8B7156]" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center text-[#2D2424]">
                  <HomeOutlined className="mr-3 text-[#8B7156]" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </div>
          </div>

          <Divider className="my-4" />

          {/* Bio Section */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#2D2424] mb-3">Giới thiệu</h3>
            <p className="text-[#8B7156]/80 text-sm leading-relaxed">{profile.bio}</p>
          </div>
        </Card>

        {/* Additional Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity Card */}
          <Card className="bg-white shadow-md border-0 rounded-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2424] mb-4">Hoạt động gần đây</h3>
              <ul className="space-y-3">
                <li className="text-[#8B7156]/80 text-sm">
                  Đã mua "Combo Nhang Hương Tết" - 02/06/2025
                </li>
                <li className="text-[#8B7156]/80 text-sm">
                  Đã đánh giá sản phẩm "Nhang Hương Cà Phê Robusta" - 01/06/2025
                </li>
                <li className="text-[#8B7156]/80 text-sm">
                  Đã cập nhật thông tin hồ sơ - 30/05/2025
                </li>
              </ul>
            </div>
          </Card>

          {/* Preferences Card */}
          <Card className="bg-white shadow-md border-0 rounded-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2424] mb-4">Tùy chọn</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-[#2D2424]">
                  <span>Nhận thông báo qua email</span>
                  <span className="text-[#8B7156] font-medium">Bật</span>
                </div>
                <div className="flex justify-between text-[#2D2424]">
                  <span>Ngôn ngữ hiển thị</span>
                  <span className="text-[#8B7156] font-medium">Tiếng Việt</span>
                </div>
                <div className="flex justify-between text-[#2D2424]">
                  <span>Chế độ tối</span>
                  <span className="text-[#8B7156] font-medium">Tắt</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;