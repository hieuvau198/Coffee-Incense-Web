import React, { useState } from "react";
import { Table, Button, Space, Tag, Input, Select, Rate, Tooltip, message, DatePicker } from "antd";
import { SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import RenderBoldTitle from "@/app/components/RenderBoldTitle";

interface ReviewData {
  key: string;
  customer: string;
  tour: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface ReviewListProps {
  onViewReview: (id: string) => void;
}

const { RangePicker } = DatePicker;

const ReviewList: React.FC<ReviewListProps> = ({ onViewReview }) => {
  const [reviewData, setReviewData] = useState<ReviewData[]>([
    {
      key: "1",
      customer: "Nguyễn Văn A",
      tour: "TOUR DU LỊCH ĐÀ LẠT",
      rating: 5,
      comment:
        "Tour rất tuyệt vời! Hướng dẫn viên nhiệt tình, chương trình tham quan hợp lý.",
      date: "15/04/2024",
      status: "approved",
    },
    {
      key: "2",
      customer: "Trần Thị B",
      tour: "TOUR DU LỊCH PHÚ QUỐC",
      rating: 4,
      comment: "Cảnh đẹp, đồ ăn ngon. Tuy nhiên thời gian tham quan hơi gấp.",
      date: "16/04/2024",
      status: "pending",
    },
    {
      key: "3",
      customer: "Lê Văn C",
      tour: "TOUR DU LỊCH ĐÀ NẴNG",
      rating: 3,
      comment: "Tour ổn, nhưng giá hơi cao so với chất lượng dịch vụ.",
      date: "17/04/2024",
      status: "rejected",
    },
  ]);

  const handleDeleteReview = (id: string) => {
    setReviewData(prevData => prevData.filter(review => review.key !== id));
    message.success("Đã xóa đánh giá thành công");
  };

  const columns: ColumnsType<ReviewData> = [
    {
      title: RenderBoldTitle('Khách Hàng'),
      dataIndex: "customer",
      key: "customer",
      width: 150,
    },
    {
      title: RenderBoldTitle('Tour'),
      dataIndex: "tour",
      key: "tour",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (tour: string) => (
        <Tooltip placement="topLeft" title={tour}>
          <span>{tour}</span>
        </Tooltip>
      ),
    },
    {
      title: RenderBoldTitle('Đánh Giá'),
      dataIndex: "rating",
      key: "rating",
      width: 170,
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: RenderBoldTitle('Nhận Xét'),
      dataIndex: "comment",
      key: "comment",
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (comment: string) => (
        <Tooltip placement="topLeft" title={comment}>
          <span>{comment}</span>
        </Tooltip>
      ),
    },
    {
      title: RenderBoldTitle('Ngày Đánh Giá'),
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: RenderBoldTitle('Thao Tác'),
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="link"
              color="blue"
              variant="solid"
              icon={<EyeOutlined />}
              onClick={() => onViewReview(record.key)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="link"
              color="danger"
              variant="solid"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteReview(record.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Đánh Giá</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <Input
          placeholder="Tìm kiếm đánh giá..."
          prefix={<SearchOutlined />}
          className="max-w-xs"
        />
        <Select
          placeholder="Trạng thái đánh giá"
          className="min-w-[150px]"
          options={[
            { value: "approved", label: "Đã duyệt" },
            { value: "pending", label: "Đang chờ" },
            { value: "rejected", label: "Từ chối" },
          ]}
        />
        <Select
          placeholder="Xếp hạng"
          className="min-w-[150px]"
          options={[
            { value: "5", label: "5 sao" },
            { value: "4", label: "4 sao" },
            { value: "3", label: "3 sao" },
            { value: "2", label: "2 sao" },
            { value: "1", label: "1 sao" },
          ]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={reviewData}
        pagination={{
          total: reviewData.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} đánh giá`,
        }}
        // scroll={{ x: 'auto' }}
      />
    </div>
  );
};

export default ReviewList; 