import React, { useState } from 'react';
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

  const renderContent = () => {
    switch (viewMode) {
      case 'detail':
        return (
          <CustomerDetail
            customerId={selectedCustomerId as string}
            onBack={handleBackToList}
          />
        );
      case 'list':
      default:
        return (
          <CustomerList onViewCustomer={handleViewCustomer} />
        );
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
};

export default Customers; 