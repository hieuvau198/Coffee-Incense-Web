import React, { useEffect, useState } from "react";
import {
  Typography,
  Rate,
  Descriptions,
  Tag,
  Button,
  Avatar,
  Card,
  message,
  Row,
  Col,
  Statistic,
  Tabs,
  Empty,
} from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  ShoppingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
    };
    const fetch = setTimeout(() => {
      setReview(mockData[reviewId] || null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(fetch);
  }, [reviewId]);

  const statusMap = {
    approved: { color: "green", label: "Đã duyệt", icon: <CheckCircleOutlined /> },
    pending: { color: "orange", label: "Chờ duyệt", icon: <ClockCircleOutlined /> },
    rejected: { color: "red", label: "Từ chối", icon: <CloseCircleOutlined /> },
  };

  const handleApprove = () => {
    if (review) {
      setReview({ ...review, status: "approved" });
      message.success("Đã duyệt đánh giá");
    }
  };

  const handleReject = () => {
    if (review) {
      setReview({ ...review, status: "rejected" });
      message.error("Đã từ chối đánh giá");
    }
  };

  if (loading) {
    return <Card className="shadow-sm"><div className="text-center py-10">Đang tải dữ liệu...</div></Card>;
  }

  if (!review) {
    return (
      <Card className="shadow-sm">
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onBack}>
          Quay lại danh sách
        </Button>
        <Empty description="Không tìm thấy đánh giá" className="mt-4" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onBack}>
          Quay lại danh sách
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="flex items-start">
          <Avatar size={80} icon={<UserOutlined />} className="mr-6" />
          <div>
            <Title level={3}>{review.customer}</Title>
            <Tag color={statusMap[review.status].color}>
              {statusMap[review.status].icon} {statusMap[review.status].label}
            </Tag>
            <div className="mt-2">
              <Text type="secondary">Mã Đánh Giá: #{review.key}</Text>
            </div>
          </div>
        </div>
      </Card>

      <Row gutter={16}>
        <Col span={8}>
          <Card className="shadow-sm">
            <Statistic
              title="Điểm Đánh Giá"
              value={review.rating}
              prefix={<StarOutlined />}
              suffix="/5"
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-sm">
            <Statistic
              title="Ngày Đánh Giá"
              value={review.date}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Tabs defaultActiveKey="info" type="card">
          <TabPane tab="Thông Tin Đánh Giá" key="info">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Tiêu Đề">{review.position}</Descriptions.Item>
              <Descriptions.Item label="Nội Dung">{review.text}</Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab="Thông Tin Sản Phẩm" key="product">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Tên Sản Phẩm">
                <ShoppingOutlined className="mr-2" />
                Hương Cà Phê
              </Descriptions.Item>
              <Descriptions.Item label="Mã Sản Phẩm">PRD001</Descriptions.Item>
              <Descriptions.Item label="Loại Sản Phẩm">Hương Thơm</Descriptions.Item>
              <Descriptions.Item label="Giá">149,000 VNĐ</Descriptions.Item>
            </Descriptions>
          </TabPane>
        </Tabs>
      </Card>

      {review.status === "pending" && (
        <Card className="shadow-sm">
          <Row gutter={16} className="justify-end">
            <Col>
              <Button type="primary" onClick={handleApprove}>
                Duyệt Đánh Giá
              </Button>
            </Col>
            <Col>
              <Button danger onClick={handleReject}>
                Từ Chối
              </Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default ReviewDetail;
