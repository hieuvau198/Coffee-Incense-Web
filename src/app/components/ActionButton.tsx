import React from 'react';
import { Button, Tooltip, Popconfirm } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  QuestionCircleOutlined 
} from '@ant-design/icons';

interface ActionButtonProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  deleteConfirmTitle?: string;
  viewTooltip?: string;
  editTooltip?: string;
  deleteTooltip?: string;
}

const ActionButtons: React.FC<ActionButtonProps> = ({
  onView,
  onEdit,
  onDelete,
  deleteConfirmTitle = 'Bạn có chắc chắn muốn xóa?',
  viewTooltip = 'Xem chi tiết',
  editTooltip = 'Chỉnh sửa',
  deleteTooltip = 'Xóa'
}) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {onView && (
        <Tooltip title={viewTooltip}>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={onView}
            style={{ 
              color: 'var(--coffee-dark)',
              borderColor: 'var(--coffee-cream)'
            }}
          />
        </Tooltip>
      )}
      
      {onEdit && (
        <Tooltip title={editTooltip}>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={onEdit}
            style={{ 
              color: 'var(--coffee-medium)',
              borderColor: 'var(--coffee-cream)'
            }}
          />
        </Tooltip>
      )}
      
      {onDelete && (
        <Tooltip title={deleteTooltip}>
          <Popconfirm
            title={deleteConfirmTitle}
            onConfirm={onDelete}
            okText="Đồng ý"
            cancelText="Hủy"
            icon={<QuestionCircleOutlined style={{ color: 'var(--cinnamon)' }} />}
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              style={{ 
                borderColor: 'var(--cinnamon)',
              }}
            />
          </Popconfirm>
        </Tooltip>
      )}
    </div>
  );
};

export default ActionButtons; 