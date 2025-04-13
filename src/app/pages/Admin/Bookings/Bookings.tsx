import React, { useState } from "react";
import { message } from "antd";
import BookingList from "./partials/BookingList";
import AddBooking from "./partials/AddBooking";
import ViewBooking from "./partials/ViewBooking";
import EditBooking from "./partials/EditBooking";

type ViewMode = "list" | "add" | "view" | "edit";

const Bookings: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleAddOrder = () => {
    setViewMode("add");
  };

  const handleViewOrder = (id: string) => {
    setSelectedOrderId(id);
    setViewMode("view");
  };

  const handleEditOrder = (id: string) => {
    setSelectedOrderId(id);
    setViewMode("edit");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedOrderId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      // Trong thực tế, đây sẽ là API call để xóa đơn hàng
      // await orderService.deleteOrder(id);
      
      message.success('Đã xóa đơn hàng thành công');
      // Trong thực tế, cần refresh lại danh sách đơn hàng
      // await fetchOrders();
    } catch (error) {
      message.error('Không thể xóa đơn hàng. Vui lòng thử lại sau.');
    }
  };

  // Render different content based on the current view mode
  const renderContent = () => {
    switch (viewMode) {
      case "add":
        return (
          <AddBooking 
            onCancel={handleBack} 
            onSuccess={handleBack} 
          />
        );
      case "view":
        return (
          <ViewBooking 
            orderId={selectedOrderId!} 
            onBack={handleBack} 
            onEdit={handleEditOrder} 
          />
        );
      case "edit":
        return (
          <EditBooking 
            orderId={selectedOrderId!} 
            onCancel={handleBack} 
            onSuccess={handleBack} 
          />
        );
      default:
        return (
          <BookingList
            onAddOrder={handleAddOrder}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
            handleDelete={handleDelete}
          />
        );
    }
  };

  return renderContent();
};

export default Bookings; 