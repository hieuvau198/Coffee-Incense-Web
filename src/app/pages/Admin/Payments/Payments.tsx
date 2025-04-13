import React, { useState } from "react";
import { message } from "antd";
import PaymentDetail from "./partials/PaymentDetail";
import PaymentList from "./partials/PaymentList";

type ViewMode = "list" | "view";

const Payments: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  const handleViewPayment = (id: string) => {
    setSelectedPaymentId(id);
    setViewMode("view");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedPaymentId(null);
  };

  const handleDeletePayment = async (id: string) => {
    try {
      // TODO: Implement API call to delete payment
      message.success('Xóa thanh toán thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa thanh toán');
    }
  };

  const renderContent = () => {
    if (viewMode === "view" && !selectedPaymentId) {
      handleBack();
      return null;
    }

    switch (viewMode) {
      case "view":
        return (
          <PaymentDetail
            paymentId={selectedPaymentId!}
            onBack={handleBack}
          />
        );
      default:
        return (
          <PaymentList
            onViewPayment={handleViewPayment}
            handleDeletePayment={handleDeletePayment}
          />
        );
    }
  };

  return renderContent();
};

export default Payments;
