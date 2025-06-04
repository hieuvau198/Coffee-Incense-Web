// src\app\pages\Admin\Products\Products.tsx
import React, { useState } from 'react';
import { Card } from 'antd';
import ProductList from './partials/ProductList';
import AddProduct from './partials/AddProduct';
import EditProduct from './partials/EditProduct';
import ViewProduct from './partials/ViewProduct';
import ViewProductList from './partials/ViewProductList';


type ViewMode = 'list' | 'add' | 'edit' | 'view' | 'firebase-list';

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

  const handleShowFirebaseList = () => setViewMode('firebase-list');


  return (
    <Card className="shadow-sm h-full">
      {viewMode === 'list' && (
  <>
    <div className="mb-4 flex gap-2">
      <button
        className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
        onClick={handleShowFirebaseList}
      >
        Xem danh sách (Firebase)
      </button>
    </div>
    <ProductList
      onAddClick={handleAddClick}
      onEditClick={handleEditClick}
      onViewClick={handleViewClick}
    />
  </>
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

      {viewMode === 'firebase-list' && (
  <ViewProductList
    onBack={handleBack}
    onViewClick={handleViewClick}
    onEditClick={handleEditClick}
  />
)}

    </Card>
  );
};

export default Products;