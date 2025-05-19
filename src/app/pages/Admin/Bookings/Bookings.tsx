import React, { useState } from "react";
import { Card, message } from "antd";
import BookingList from "./partials/BookingList";
import AddBooking from "./partials/AddBooking";
import ViewBooking from "./partials/ViewBooking";
import EditBooking from "./partials/EditBooking";

type ViewMode = "list" | "add" | "view" | "edit";

const Bookings: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleAddClick = () => {
    setViewMode("add");
  };

  const handleViewClick = (id: string) => {
    setSelectedOrderId(id);
    setViewMode("view");
  };

  const handleEditClick = (id: string) => {
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

  return (
    <Card className="shadow-sm h-full overflow-hidden">
      {viewMode === "list" && (
        <BookingList
          onAddOrder={handleAddClick}
          onViewOrder={handleViewClick}
          onEditOrder={handleEditClick}
          handleDelete={handleDelete}
        />
      )}

      {viewMode === "add" && (
        <AddBooking 
          onCancel={handleBack} 
          onSuccess={handleBack} 
        />
      )}

      {viewMode === "view" && selectedOrderId && (
        <ViewBooking 
          orderId={selectedOrderId} 
          onBack={handleBack} 
          onEdit={handleEditClick} 
        />
      )}

      {viewMode === "edit" && selectedOrderId && (
        <EditBooking 
          orderId={selectedOrderId} 
          onCancel={handleBack} 
          onSuccess={handleBack} 
        />
      )}
    </Card>
  );
};

export default Bookings; 