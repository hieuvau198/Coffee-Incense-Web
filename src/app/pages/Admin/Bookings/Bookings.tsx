import React, { useState } from "react";
import BookingList from "./partials/BookingList";
import AddBooking from "./partials/AddBooking";
import ViewBooking from "./partials/ViewBooking";
import EditBooking from "./partials/EditBooking";

type ViewMode = "list" | "add" | "view" | "edit";

const Bookings: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const handleAddBooking = () => {
    setViewMode("add");
  };

  const handleViewBooking = (id: string) => {
    setSelectedBookingId(id);
    setViewMode("view");
  };

  const handleEditBooking = (id: string) => {
    setSelectedBookingId(id);
    setViewMode("edit");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedBookingId(null);
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
            bookingId={selectedBookingId!} 
            onBack={handleBack} 
            onEdit={handleEditBooking} 
          />
        );
      case "edit":
        return (
          <EditBooking 
            bookingId={selectedBookingId!} 
            onCancel={handleBack} 
            onSuccess={handleBack} 
          />
        );
      default:
        return (
          <BookingList
            onAddBooking={handleAddBooking}
            onViewBooking={handleViewBooking}
            onEditBooking={handleEditBooking}
          />
        );
    }
  };

  return renderContent();
};

export default Bookings; 