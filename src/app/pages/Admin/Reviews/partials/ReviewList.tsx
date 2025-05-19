import React, { useState } from "react";
import { Tag, Input, Select, Card, Table, Rate, Tooltip, Space, Button } from "antd";
import { SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface ReviewData {
  key: string;
  customer: string;
  position: string;
  text: string;
  rating: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface ReviewListProps {
  onViewReview: (id: string) => void;
  handleDeleteReview: (id: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ onViewReview, handleDeleteReview }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('');

  const reviewData: ReviewData[] = [
    {
      key: "1",
      customer: "Nguyễn Văn A",
      position: "Hương Cà Phê Nguyên Chất",
      text: "Sản phẩm rất thơm, đóng gói cẩn thận",
      rating: 5,
      date: "2024-04-15",
      status: "approved",
    },
    {
      key: "2",
      customer: "Trần Thị B",
      position: "Nhang Vòng Cà Phê",
      text: "Mùi hương dễ chịu, thời gian cháy lâu",
      rating: 4,
      date: "2024-04-16",
      status: "pending",
    },
  ];

  const columns: ColumnsType<ReviewData> = [
    {
      title: "Khách Hàng",
      dataIndex: "customer",
      key: "customer",
      width: 180,
    },
    {
      title: "Tiêu Đề",
      dataIndex: "position",
      key: "position",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      key: "rating",
      width: 150,
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Nội Dung",
      dataIndex: "text",
      key: "text",
      width: 300,
      ellipsis: true,
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Ngày Đánh Giá",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: string) => {
        const colors: Record<string, string> = {
          approved: "green",
          pending: "orange",
          rejected: "red",
        };
        const labels: Record<string, string> = {
          approved: "ĐÃ DUYỆT",
          pending: "CHỜ DUYỆT",
          rejected: "TỪ CHỐI",
        };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
      filters: [
        { text: "Đã duyệt", value: "approved" },
        { text: "Chờ duyệt", value: "pending" },
        { text: "Từ chối", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Thao Tác",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined className="text-lg" />}
            onClick={() => onViewReview(record.key)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined className="text-lg" />}
            onClick={() => handleDeleteReview(record.key)}
          />
        </Space>
      ),
    },
  ];

  const filteredData = reviewData.filter((r) => {
    const matchSearch =
      searchText === "" ||
      r.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      r.position.toLowerCase().includes(searchText.toLowerCase()) ||
      r.text.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchRating = ratingFilter === "" || r.rating === parseInt(ratingFilter);

    return matchSearch && matchStatus && matchRating;
  });

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Đánh Giá</h1>
      </div>

      <Card className="mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 max-w-full">
          <Input
            placeholder="Tìm kiếm đánh giá..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Select
            placeholder="Đánh giá sao"
            style={{ width: 150 }}
            allowClear
            value={ratingFilter || undefined}
            onChange={(value) => setRatingFilter(value)}
            options={["5", "4", "3", "2", "1"].map((star) => ({
              value: star,
              label: `${star} sao`,
            }))}
          />
          <Select
            placeholder="Trạng thái"
            style={{ width: 200 }}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={[
              { value: "all", label: "Tất Cả" },
              { value: "approved", label: "Đã duyệt" },
              { value: "pending", label: "Chờ duyệt" },
              { value: "rejected", label: "Từ chối" },
            ]}
          />
        </div>
      </Card>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            position: ["bottomRight"],
            showTotal: (total) => `Tổng ${total} đánh giá`,
          }}
          scroll={{ x: 1200 }}
          className="overflow-x-auto"
          size="middle"
          bordered={false}
          rowClassName={(record, index) => (index % 2 === 0 ? "bg-[#FAFAFA]" : "")}
        />
      </Card>
    </div>
  );
};

export default ReviewList;
