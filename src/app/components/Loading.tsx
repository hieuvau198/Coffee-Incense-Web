import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  size?: number;
  tip?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 40,
  tip = 'Đang tải...',
  fullScreen = false
}) => {
  const antIcon = <LoadingOutlined style={{ color: 'var(--coffee-medium)', fontSize: size }} spin />;
  
  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 249, 240, 0.8)',
        zIndex: 1000
      }}>
        <Spin 
          indicator={antIcon} 
          tip={tip} 
          size="large" 
          style={{ 
            color: 'var(--coffee-dark)',
          }}
        />
      </div>
    );
  }
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Spin 
        indicator={antIcon} 
        tip={tip}
        style={{ color: 'var(--coffee-dark)' }}
      />
    </div>
  );
};

export default Loading; 