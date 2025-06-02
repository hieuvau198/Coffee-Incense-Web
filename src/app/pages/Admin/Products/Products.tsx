// src\app\pages\Admin\Products\Products.tsx
import React, { useState } from 'react';
import { Card } from 'antd';
import ProductList from './partials/ProductList';
import AddProduct from './partials/AddProduct';
import EditProduct from './partials/EditProduct';
import ViewProduct from './partials/ViewProduct';

type ViewMode = 'list' | 'add' | 'edit' | 'view';

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);

  const handleAddClick = () => {
    setViewMode('add');
  };

  const handleEditClick = (productId: string | number) => {
    setSelectedProductId(productId);
    setViewMode('edit');
  };

  const handleViewClick = (productId: string | number) => {
    setSelectedProductId(productId);
    setViewMode('view');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedProductId(null);
  };

  return (
    <Card className="shadow-sm h-full">
      {viewMode === 'list' && (
        <ProductList
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onViewClick={handleViewClick}
        />
      )}

      {viewMode === 'add' && (
        <AddProduct onBack={handleBack} />
      )}

      {viewMode === 'edit' && selectedProductId && (
        <EditProduct
          productId={selectedProductId}
          onBack={handleBack}
        />
      )}

      {viewMode === 'view' && selectedProductId && (
        <ViewProduct
          productId={selectedProductId}
          onBack={handleBack}
          onEdit={handleEditClick}
        />
      )}
    </Card>
  );
};

export default Products;