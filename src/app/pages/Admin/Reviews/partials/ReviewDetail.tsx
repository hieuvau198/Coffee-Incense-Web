import React, { useEffect, useState } from "react";
import { Typography, Rate, Descriptions, Tag, Button, Avatar, Card, Space, message } from "antd";
import { UserOutlined, CalendarOutlined, GlobalOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loading from "@/app/components/Loading";
import RenderBoldTitle from "@/app/components/RenderBoldTitle";

const { Title, Paragraph, Text } = Typography;

interface ReviewData {
  key: string;
  customer: string;
  tour: string;
  rating: number;
  comment: string;
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
        customer: "Nguyễn Văn A",
        tour: "TOUR DU LỊCH ĐÀ LẠT",
        rating: 5,
        comment:
          "Tour rất tuyệt vời! Hướng dẫn viên nhiệt tình, chương trình tham quan hợp lý. Khách sạn sạch sẽ, đồ ăn ngon. Tôi đặc biệt ấn tượng với cảnh đẹp tại đồi chè Cầu Đất và vườn hoa thành phố. Nếu có cơ hội, tôi sẽ quay lại Đà Lạt và tiếp tục sử dụng dịch vụ của công ty.",
        date: "15/04/2024",
        status: "approved",
      },
      "2": {
        key: "2",
        customer: "Trần Thị B",
        tour: "TOUR DU LỊCH PHÚ QUỐC",
        rating: 4,
        comment: "Cảnh đẹp, đồ ăn ngon. Tuy nhiên thời gian tham quan hơi gấp. Hướng dẫn viên nhiệt tình nhưng còn thiếu kinh nghiệm về một số điểm du lịch. Cần cải thiện việc sắp xếp lịch trình để khách có thời gian nghỉ ngơi và tham quan kỹ hơn.",
        date: "16/04/2024",
        status: "pending",
      },
      "3": {
        key: "3",
        customer: "Lê Văn C",
        tour: "TOUR DU LỊCH ĐÀ NẴNG",
        rating: 3,
        comment: "Tour ổn, nhưng giá hơi cao so với chất lượng dịch vụ. Khách sạn không đúng như quảng cáo, phòng nhỏ và thiếu tiện nghi. Hướng dẫn viên thân thiện nhưng lịch trình chưa hợp lý, mất nhiều thời gian di chuyển.",
        date: "17/04/2024",
        status: "rejected",
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

      // In a real app, you would make an API call here
      // Example: await api.approveReview(review.key);
    }
  };

  const handleReject = () => {
    if (review) {
      setReview({ ...review, status: "rejected" });
      message.error("Đã từ chối đánh giá");

      // In a real app, you would make an API call here
      // Example: await api.rejectReview(review.key);
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
          <Card variant="borderless" className="shadow-none sticky top-5 ">
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
            </Descriptions>

          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title={RenderBoldTitle("Thông Tin Đánh Giá")} className="mb-6" variant="borderless">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={RenderBoldTitle("Khách Hàng")}>{review.customer}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Đánh Giá")}>
                <Rate disabled defaultValue={review.rating} />
              </Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Ngày Đánh Giá")}>{review.date}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Bình Luận")} span={2}>
                {review.comment}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title={RenderBoldTitle("Thông Tin Tour")} className="mb-6" variant="borderless">
            <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered>
              <Descriptions.Item label={RenderBoldTitle("Tên Tour")}>{review.tour}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Mã Tour")}>{review.key}</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Thời Gian")}>3 ngày 2 đêm</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Giá Tour")}>2,590,000 VND</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Điểm Khởi Hành")}>Hồ Chí Minh</Descriptions.Item>
              <Descriptions.Item label={RenderBoldTitle("Trạng Thái Đặt Tour")}>
                <Tag color={statusColors[review.status]}>{statusLabels[review.status]}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail; 