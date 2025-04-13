import React, { useEffect, useState } from "react";
import { Typography, Rate, Descriptions, Tag, Button, Avatar, Card, message, Row, Col, Statistic, Divider } from "antd";
import { UserOutlined, CalendarOutlined, ShoppingOutlined, ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Loading from "@/app/components/Loading";
import RenderBoldTitle from "@/app/components/RenderBoldTitle";

const { Title, Text } = Typography;

interface ReviewData {
  key: string;
  customer: string;
  position: string;
  text: string;
  rating: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface ReviewDetailProps {
  reviewId: string;
  onBack: () => void;
}

const ReviewDetail: React.FC<ReviewDetailProps> = ({ reviewId, onBack }) => {
  const [review, setReview] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const mockData: Record<string, ReviewData> = {
      "1": {
        key: "1",
        customer: "Lê Hoàng Khang",
        position: "Sản phẩm tốt nhất, mình mua và ngửi quá tốt",
        text: "Giao hàng nhanh, đóng gói đẹp lắm, mình rất thích hương thơm của sản phẩm.",
        rating: 5,
        date: "15/04/2024",
        status: "approved",
      },
      "2": {
        key: "2",
        customer: "Lê Phạm Khánh Hà",
        position: "Sản phẩm khác biệt, tôi rất thích vì không tạo ra mùi khói",
        text: "Sản phẩm rất đặc biệt, mình có thể hương thơm hàng giờ mà không có khói.",
        rating: 5,
        date: "16/04/2024",
        status: "approved",
      },
      "3": {
        key: "3",
        customer: "Đặng Hoàng",
        position: "Sản phẩm quá tốt nhất",
        text: "Mình rất thích mùi hương, đặc biệt là hương cà phê rất đặc trưng và dễ chịu.",
        rating: 5,
        date: "17/04/2024",
        status: "approved",
      },
    };

    // Mock API call with setTimeout
    const fetchData = setTimeout(() => {
      if (reviewId && mockData[reviewId]) {
        setReview(mockData[reviewId]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, [reviewId]);

  const handleApprove = () => {
    if (review) {
      setReview({ ...review, status: "approved" });
      message.success("Đã duyệt đánh giá thành công");
    }
  };

  const handleReject = () => {
    if (review) {
      setReview({ ...review, status: "rejected" });
      message.error("Đã từ chối đánh giá");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!review) {
    return (
      <div className="text-center p-8">
        <Title level={4}>Không tìm thấy đánh giá</Title>
        <Button type="primary" onClick={onBack} className="mt-4">
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const statusColors = {
    approved: "green",
    pending: "orange",
    rejected: "red",
  };

  const statusLabels = {
    approved: "Đã duyệt",
    pending: "Đang chờ",
    rejected: "Từ chối",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <Button
          type="link"
          color="primary"
          variant="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
        >
          Quay lại danh sách
        </Button>
      </div>

      <Title level={3}>Chi Tiết Đánh Giá</Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card variant="borderless" className="shadow-none sticky top-5">
            <div className="flex flex-col items-center mb-4">
              <Avatar size={100} icon={<UserOutlined />} />
              <Title level={4} className="mt-4 mb-0">
                {review.customer}
              </Title>
              <Text type="secondary">
                <CalendarOutlined className="mr-1" /> {review.date}
              </Text>
            </div>
            
            <Descriptions column={1} className="mt-4">
              <Descriptions.Item label="Mã Đánh Giá">#{review.key}</Descriptions.Item>
              <Descriptions.Item label="Đánh Giá">
                <Rate disabled value={review.rating} /> ({review.rating}/5)
              </Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                <Tag color={statusColors[review.status]}>
                  {statusLabels[review.status]}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {review.status === "pending" && (
              <div className="mt-4 space-y-2">
                <Button 
                  type="primary" 
                  block 
                  onClick={handleApprove}
                  className="bg-[#8B7156] hover:bg-[#64503C]"
                >
                  Duyệt Đánh Giá
                </Button>
                <Button 
                  danger 
                  block 
                  onClick={handleReject}
                >
                  Từ Chối
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title={RenderBoldTitle("Thông Tin Đánh Giá")} className="mb-6" variant="borderless">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("Khách Hàng")}>{review.customer}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Tiêu Đề")}>{review.position}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Đánh Giá")}>
                <Rate disabled defaultValue={review.rating} />
              </Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Ngày Đánh Giá")}>{review.date}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Nội Dung")} span={2}>
                {review.text}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Thông Tin Sản Phẩm")} className="mb-6" variant="borderless">
            <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered>
              <Descriptions.Item label={RenderBoldTitle("Tên Sản Phẩm")}>
                <ShoppingOutlined className="mr-2" /> Hương Cà Phê
              </Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Mã Sản Phẩm")}>PRD001</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Loại Sản Phẩm")}>Hương Thơm</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Giá")}>149,000 VNĐ</Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail; 