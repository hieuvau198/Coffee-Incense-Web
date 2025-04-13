import React from 'react';
import { Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import type { MenuProps } from 'antd';

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  
  // Dummy user for demonstration
  const currentUser = {
    name: 'Admin',
    role: '',
    avatar: null
  };

  const handleLogout = () => {
    // Clear stored auth token or session
    localStorage.removeItem('authToken');
    // Navigate to login page
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Hồ sơ',
      icon: <UserOutlined />,
      onClick: () => navigate('/admin/profile'),
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />,
      onClick: () => navigate('/admin/settings'),
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown 
      menu={{ items }} 
      placement="bottomRight" 
      arrow
    >
      <div 
        className="cursor-pointer" 
        style={{ 
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Space>
          <Avatar 
            icon={<UserOutlined />}
            style={{ 
              backgroundColor: 'var(--coffee-light)',
              color: 'var(--latte-foam)' 
            }}
            src={currentUser.avatar}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
              color: 'var(--coffee-dark)', 
              fontWeight: 500 
            }}>
              {currentUser.name}
            </span>
            <span style={{ 
              color: 'var(--coffee-medium)', 
              fontSize: '0.75rem',
              opacity: 0.8
            }}>
              {currentUser.role}
            </span>
          </div>
        </Space>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
