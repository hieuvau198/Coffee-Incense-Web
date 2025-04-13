import { DatePicker } from "antd";
import React, { useState } from "react";
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

  const renderContent = () => {
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
          />
        );
    }
  };

  return renderContent();
};

export default Payments;
