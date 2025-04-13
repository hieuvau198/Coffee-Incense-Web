import React, { useState } from "react";
import { message } from "antd";
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
      // TODO: Implement API call to delete review
      message.success('Xóa đánh giá thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa đánh giá');
    }
  };

  const renderContent = () => {
    if (viewMode === "view" && !selectedReviewId) {
      handleBack();
      return null;
    }

    switch (viewMode) {
      case "view":
        return (
          <ReviewDetail
            reviewId={selectedReviewId!}
            onBack={handleBack}
          />
        );
      default:
        return (
          <ReviewList
            onViewReview={handleViewReview}
            handleDeleteReview={handleDeleteReview}
          />
        );
    }
  };

  return renderContent();
};

export default Reviews;
