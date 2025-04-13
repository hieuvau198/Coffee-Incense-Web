import { Table } from 'antd';
import type { TableProps } from 'antd';

interface AdminTableProps<T> extends Omit<TableProps<T>, 'className' | 'scroll'> {
  totalItems?: number;
  itemsName?: string;
}

function AdminTable<T extends object>({ 
  totalItems, 
  itemsName = 'mục',
  pagination,
  ...props 
}: AdminTableProps<T>) {
  return (
    <Table
      {...props}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total) => `Tổng số ${total} ${itemsName}`,
        ...(pagination || {}),
      }}
      scroll={{ x: 'max-content' }}
      className="w-full"
      size="middle"
    />
  );
}

export default AdminTable; 