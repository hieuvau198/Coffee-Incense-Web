import React, { useState } from "react";
import { Card } from "antd";
import PaymentList from "./partials/PaymentList";
import PaymentDetail from "./partials/PaymentDetail";
import { PaymentData } from "@/app/services/paymentService";

// Kiểu chuyển đổi giữa danh sách và chi tiết
type ViewMode = "list" | "view";

const Payments: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  // Khi bấm xem chi tiết 1 thanh toán
  const handleViewClick = (id: string) => {
    console.log("Payments.tsx - handleViewClick: Setting selectedPaymentId to", id, "for id:", id);
    setSelectedPaymentId(id);
    console.log("Payments.tsx - handleViewClick: Setting viewMode to 'view'");
    setViewMode("view");
  };

  // Quay lại danh sách
  const handleBack = () => {
    console.log("Payments.tsx - handleBack: Resetting viewMode to 'list' and selectedPaymentId to null");
    setViewMode("list");
    setSelectedPaymentId(null);
  };

  return (
    <Card className="shadow-sm h-full overflow-hidden">
      {viewMode === "list" && (
        <PaymentList
          onViewPayment={handleViewClick}
        />
      )}

      {viewMode === "view" && selectedPaymentId && (
        <PaymentDetail
          paymentId={selectedPaymentId}
          onBack={handleBack}
        />
      )}
    </Card>
  );
};

export default Payments;
