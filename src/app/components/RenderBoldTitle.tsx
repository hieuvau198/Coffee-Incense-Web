import React from 'react';
import { Typography } from 'antd';

interface RenderBoldTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const RenderBoldTitle: React.FC<RenderBoldTitleProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Typography.Title
        level={4}
        className="coffee-gradient font-bold mb-0"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          letterSpacing: '0.5px'
        }}
      >
        {title}
      </Typography.Title>
      {subtitle && (
        <Typography.Text 
          type="secondary"
          style={{ 
            color: 'var(--coffee-medium)',
            fontSize: '0.9rem' 
          }}
        >
          {subtitle}
        </Typography.Text>
      )}
    </div>
  );
};

export default RenderBoldTitle; 