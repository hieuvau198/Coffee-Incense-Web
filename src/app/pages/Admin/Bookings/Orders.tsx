import React, { useState } from "react";
import { Card, message } from "antd";
import OrderList from "./partials/OrderList";
import AddOrder from "./partials/AddOrder";
import ViewOrder from "./partials/ViewOrder";
import EditOrder from "./partials/EditOrder";
import { OrderData } from "../../../services/orderService";

type ViewMode = "list" | "add" | "view" | "edit";

const Orders: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const handleAddClick = () => {
    setViewMode("add");
  };

  const handleViewClick = (id: string) => {
    setSelectedOrderId(id);
    setViewMode("view");
  };

  const handleEditClick = (order: OrderData) => {
    setSelectedOrder(order);
    setViewMode("edit");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedOrderId(null);
    setSelectedOrder(null);
  };

  const handleDelete = async (id: string) => {
    try {
      message.success('Đã xóa đơn hàng thành công');
    } catch (error) {
      message.error('Không thể xóa đơn hàng. Vui lòng thử lại sau.');
    }
  };

  return (
    <Card className="shadow-sm h-full overflow-hidden">
      {viewMode === "list" && (
        <OrderList
          onAddBooking={handleAddClick}
          onViewBooking={handleViewClick}
          onEditBooking={handleEditClick}
        />
      )}

      {viewMode === "add" && (
        <AddOrder 
          onCancel={handleBack} 
          onSuccess={handleBack} 
        />
      )}

      {viewMode === "view" && selectedOrderId && (
        <ViewOrder 
          orderId={selectedOrderId}
          onBack={handleBack} 
          onEdit={handleEditClick} 
        />
      )}

      {viewMode === "edit" && selectedOrder && (
        <EditOrder 
          order={selectedOrder}
          onCancel={handleBack} 
          onSuccess={handleBack} 
        />
      )}
    </Card>
  );
};

export default Orders; 