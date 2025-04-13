import React, { useState } from "react";
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

  const renderContent = () => {
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
          />
        );
    }
  };

  return renderContent();
};

export default Reviews;
