import React from 'react';
import { Button, Tooltip, Space, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  disablePrint?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  hidePrint?: boolean;
  deleteTooltip?: string;
  deleteDescription?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  onPrint,
  disablePrint = false,
  hideEdit = false,
  hideDelete = false,
  hidePrint = true,
  deleteTooltip = "Xóa",
  deleteDescription = "Bạn có chắc chắn muốn xóa?"
}) => {
  return (
    <Space size="middle">
      {onView && (
        <Tooltip title="Xem Chi Tiết">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={onView}
            className="text-blue-600 hover:text-blue-800"
          />
        </Tooltip>
      )}
      
      {!hideEdit && onEdit && (
        <Tooltip title="Chỉnh Sửa">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={onEdit}
            className="text-green-600 hover:text-green-800"
          />
        </Tooltip>
      )}

      {!hideDelete && onDelete && (
        <Popconfirm
          title={deleteTooltip}
          description={deleteDescription}
          onConfirm={onDelete}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <Tooltip title={deleteTooltip}>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-800"
            />
          </Tooltip>
        </Popconfirm>
      )}

      {!hidePrint && onPrint && (
        <Tooltip title="In">
          <Button
            type="text"
            icon={<PrinterOutlined />}
            onClick={onPrint}
            disabled={disablePrint}
            className={`${disablePrint ? 'text-gray-400' : 'text-purple-600 hover:text-purple-800'}`}
          />
        </Tooltip>
      )}
    </Space>
  );
};

export default ActionButtons; 