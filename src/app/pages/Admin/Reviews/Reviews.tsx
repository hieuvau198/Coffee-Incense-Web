import React, { useState } from "react";
import { Card, message } from "antd";
import ReviewDetail from "./partials/ReviewDetail";
import ReviewList from "./partials/ReviewList";

type ViewMode = "list" | "view";

const Reviews: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const handleViewReview = (id: string) => {
    setSelectedReviewId(id);
    setViewMode("view");
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedReviewId(null);
  };

  const handleDeleteReview = async (id: string) => {
    try {
      // TODO: API xóa đánh giá
      message.success("Xóa đánh giá thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa đánh giá");
    }
  };

  return (
    <Card className="shadow-sm h-full overflow-hidden">
      {viewMode === "list" && (
        <ReviewList
          onViewReview={handleViewReview}
          handleDeleteReview={handleDeleteReview}
        />
      )}

      {viewMode === "view" && selectedReviewId && (
        <ReviewDetail
          reviewId={selectedReviewId}
          onBack={handleBack}
        />
      )}
    </Card>
  );
};

export default Reviews;
