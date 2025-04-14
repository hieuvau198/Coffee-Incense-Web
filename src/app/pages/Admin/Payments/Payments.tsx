import React, { useState } from "react";
import { Card } from "antd";
import PaymentDetail from "./partials/PaymentDetail";
import PaymentList from "./partials/PaymentList";

// Kiểu chuyển đổi giữa danh sách và chi tiết
type ViewMode = "list" | "view";

const Payments: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  // Khi bấm xem chi tiết 1 thanh toán
  const handleViewPayment = (id: string) => {
    setSelectedPaymentId(id);
    setViewMode("view");
  };

  // Quay lại danh sách
  const handleBack = () => {
    setViewMode("list");
    setSelectedPaymentId(null);
  };

  return (
    <Card className="shadow-sm h-full overflow-hidden">
      {viewMode === "list" && (
        <PaymentList onViewPayment={handleViewPayment} />
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
