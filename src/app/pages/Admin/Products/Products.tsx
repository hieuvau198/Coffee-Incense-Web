import React, { useState } from "react";
import { Card } from "antd";
import ProductList from "./partials/ProductList";
import AddProduct from "./partials/AddProduct";
import ViewProduct from "./partials/ViewProduct";
import { Product } from "../../../models/product";

const ProductsPage: React.FC = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddClick = () => {
    setSelectedProductId(null);
    setSelectedProduct(null);
    setViewMode('add');
    setIsAddVisible(true);
  };

  const handleEdit = (product: Product) => {
    if (product.id) {
      setSelectedProductId(product.id);
    }
    setSelectedProduct(product);
    setViewMode('edit');
    setIsAddVisible(true);
  };

  const handleView = (productId: string | number) => {
    setSelectedProductId(productId);
    setViewMode('view');
  };

  const handleAddBack = () => {
    setIsAddVisible(false);
    setViewMode('list');
  };

  const handleViewBack = () => {
    setViewMode('list');
  };

  // const handleFormSuccess = () => {
  //   setIsAddVisible(false);
  //   setViewMode('list');
  // };

  // const handleFormCancel = () => {
  //   setIsAddVisible(false);
  //   setViewMode('list');
  // };

  return (
    <div className="space-y-6">
      {viewMode === 'list' && (
        <Card>
          <ProductList 
            onAddClick={handleAddClick}
            onEdit={handleEdit}
            onView={handleView}
          />
        </Card>
      )}

      {isAddVisible && (
        <AddProduct
          product={selectedProduct || undefined}
          onBack={handleAddBack}
        />
      )}

      {viewMode === 'view' && selectedProductId && (
        <ViewProduct
          productId={selectedProductId}
          onBack={handleViewBack}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default ProductsPage; 