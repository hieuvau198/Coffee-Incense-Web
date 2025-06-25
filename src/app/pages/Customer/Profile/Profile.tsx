// src\app\pages\Customer\Profile\Profile.tsx
import React, { useState, useEffect } from 'react';
import { Card, Avatar, Divider, Button, Spin, message } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { getUserById } from '../../../modules/firebase/user';
import { User } from '../../../models/user';
import UpdateProfile from './partials/UpdateProfile';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false); // new state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get user data from cookie
        const userCookie = Cookies.get('user');
        if (!userCookie) {
          message.error('Vui lòng đăng nhập để xem hồ sơ');
          setLoading(false);
          return;
        }

        const userData = JSON.parse(userCookie);
        const userId = userData.uid;

        // Fetch user profile from Firebase
        const userProfile = await getUserById(userId);
        if (userProfile) {
          setProfile(userProfile);
        } else {
          message.error('Không tìm thấy thông tin người dùng');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        message.error('Có lỗi xảy ra khi tải thông tin hồ sơ');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Tham gia: ${date.toLocaleDateString('vi-VN')}`;
  };

  // Get full name
  const getFullName = (user: User) => {
    if (user.displayName) return user.displayName;
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    return user.email;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F2EA] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F9F2EA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#2D2424] mb-4">
            Không tìm thấy thông tin hồ sơ
          </h2>
          <Button type="primary" onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F2EA] py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-28 xl:px-48">
        {/* Profile Header */}
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D2424]">Hồ sơ cá nhân</h1>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="bg-[#8B7156] border-[#8B7156] hover:bg-[#64503C] hover:border-[#64503C] h-10"
            onClick={() => setEditOpen(true)}
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
                src={profile.photoURL}
                alt={getFullName(profile)}
                size={150}
                className="border-4 border-[#8B7156]/20 shadow-lg"
                icon={!profile.photoURL && <UserOutlined />}
              />
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-[#2D2424] mb-2">
                {getFullName(profile)}
              </h2>
              {profile.createdAt && (
                <p className="text-[#8B7156]/80 text-sm mb-4">
                  {formatJoinDate(profile.createdAt)}
                </p>
              )}

              <div className="space-y-3">
                <div className="flex items-center text-[#2D2424]">
                  <MailOutlined className="mr-3 text-[#8B7156]" />
                  <span>{profile.email}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center text-[#2D2424]">
                    <PhoneOutlined className="mr-3 text-[#8B7156]" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center text-[#2D2424]">
                  <UserOutlined className="mr-3 text-[#8B7156]" />
                  <span className="capitalize">{profile.role || 'customer'}</span>
                </div>
              </div>
            </div>
          </div>

          <Divider className="my-4" />

          
        </Card>

        {/* Additional Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info Card */}
          <Card className="bg-white shadow-md border-0 rounded-xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2D2424] mb-4">Thông tin tài khoản</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-[#2D2424]">
                  <span>Phương thức đăng nhập</span>
                  <span className="text-[#8B7156] font-medium capitalize">
                    {profile.provider || 'Email'}
                  </span>
                </div>
                <div className="flex justify-between text-[#2D2424]">
                  <span>Loại tài khoản</span>
                  <span className="text-[#8B7156] font-medium capitalize">
                    {profile.role || 'Customer'}
                  </span>
                </div>
                <div className="flex justify-between text-[#2D2424]">
                  <span>Trạng thái</span>
                  <span className="text-green-600 font-medium">Hoạt động</span>
                </div>
              </div>
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

        {/* UpdateProfile Modal */}
        {profile && (
          <UpdateProfile
            open={editOpen}
            onClose={() => setEditOpen(false)}
            user={profile}
            onUpdated={setProfile}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;