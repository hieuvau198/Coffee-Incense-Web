import React, { useState } from 'react';
import { message } from 'antd';
import ProductsList from './partials/ProductList';
import AddProduct from './partials/AddProduct';
import EditProduct from './partials/EditProduct';
import ViewProduct from './partials/ViewProduct';

type ViewMode = 'list' | 'detail' | 'add' | 'edit';

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);

  const handleViewProduct = (productId: string | number) => {
    setSelectedProductId(productId);
    setViewMode('detail');
  };

  const handleAddProduct = () => {
    setViewMode('add');
  };

  const handleEditProduct = (productId: string | number) => {
    setSelectedProductId(productId);
    setViewMode('edit');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedProductId(null);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // TODO: Implement API call to delete product
      message.success('Xóa sản phẩm thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const renderContent = () => {
    if ((viewMode === 'detail' || viewMode === 'edit') && !selectedProductId) {
      handleBackToList();
      return null;
    }

    switch (viewMode) {
      case 'detail':
        return (
          <ViewProduct
            productId={selectedProductId!}
            onBack={handleBackToList}
            onEdit={handleEditProduct}
          />
        );
      case 'add':
        return (
          <AddProduct
            onBack={handleBackToList}
          />
        );
      case 'edit':
        return (
          <EditProduct
            productId={selectedProductId!}
            onBack={handleBackToList}
          />
        );
      case 'list':
      default:
        return (
          <ProductsList 
            onViewProduct={handleViewProduct} 
            onAddProduct={handleAddProduct} 
            onEditProduct={handleEditProduct}
            handleDelete={handleDelete}
          />
        );
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
};

export default Products;