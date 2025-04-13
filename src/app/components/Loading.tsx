import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface LoadingProps {
  fullScreen?: boolean;
  tip?: string;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false, tip = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.65)',
        zIndex: 1000,
      }}>
        <Spin indicator={antIcon} tip={tip} size="large" />
      </div>
    );
  }

  return <Spin indicator={antIcon} tip={tip} />;
};

export default Loading; 