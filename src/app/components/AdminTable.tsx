import React from 'react';
import { Table, TableProps } from 'antd';

// Extend TableProps with our custom additional props
interface AdminTableProps<T> extends TableProps<T> {
  loading?: boolean;
  showHeader?: boolean;
}

function AdminTable<T extends object>({
  loading = false,
  showHeader = true,
  pagination = { position: ['bottomCenter'] },
  ...props
}: AdminTableProps<T>) {
  return (
    <Table<T>
      loading={loading}
      showHeader={showHeader}
      pagination={pagination}
      className="coffee-themed-table"
      rowClassName={(record, index) => 
        index % 2 === 0 ? 'even-row' : 'odd-row'
      }
      {...props}
    />
  );
}

export default AdminTable; 