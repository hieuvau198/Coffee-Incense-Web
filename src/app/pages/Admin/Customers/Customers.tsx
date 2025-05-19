import React, { useState } from 'react';
import { Card } from 'antd';
import CustomerDetail from './partials/CustomerDetail';
import CustomerList from './partials/CustomerList';

type ViewMode = 'list' | 'detail';

const Customers: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleViewCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCustomerId(null);
  };

  return (
    <Card className="shadow-sm h-full overflow-hidden">
      {viewMode === 'list' && (
        <CustomerList onViewCustomer={handleViewCustomer} />
      )}

      {viewMode === 'detail' && selectedCustomerId && (
        <CustomerDetail
          customerId={selectedCustomerId}
          onBack={handleBackToList}
        />
      )}
    </Card>
  );
};

export default Customers; 