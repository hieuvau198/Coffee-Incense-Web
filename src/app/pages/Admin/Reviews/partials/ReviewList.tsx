import React, { useState } from "react";
import { Table, Space, Tag, Input, Select, Rate, Tooltip, message, DatePicker, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import RenderBoldTitle from "@/app/components/RenderBoldTitle";
import ActionButtons from "@/app/components/ActionButton";
import AdminTable from "@/app/components/AdminTable";

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
  const columns: ColumnsType<ReviewData> = [
    {
      title: RenderBoldTitle('Khách Hàng'),
      dataIndex: "customer",
      key: "customer",
      width: 150,
    },
    {
      title: RenderBoldTitle('Tiêu Đề'),
      dataIndex: "position",
      key: "position",
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (position: string) => (
        <Tooltip placement="topLeft" title={position}>
          <span>{position}</span>
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
      dataIndex: "text",
      key: "text",
      width: 300,
      ellipsis: {
        showTitle: false,
      },

      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <span>{text}</span>
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
        <ActionButtons
          onView={() => onViewReview(record.key)}
          onDelete={() => handleDeleteReview(record.key)}
          hideEdit
          deleteTooltip="Xóa đánh giá"
          deleteDescription="Bạn có chắc chắn muốn xóa đánh giá này?"
        />
      ),
    },
  ];

  // Sample data
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Đánh Giá</h1>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4 flex gap-4">
          <Input
            placeholder="Tìm kiếm đánh giá..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
          />
          <Select
            placeholder="Đánh giá sao"
            className="min-w-[150px]"
            options={[
              { value: "5", label: "5 sao" },
              { value: "4", label: "4 sao" },
              { value: "3", label: "3 sao" },
              { value: "2", label: "2 sao" },
              { value: "1", label: "1 sao" },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            className="min-w-[150px]"
            options={[
              { value: "approved", label: "Đã duyệt" },
              { value: "pending", label: "Chờ duyệt" },
              { value: "rejected", label: "Từ chối" },
            ]}
          />
          <DatePicker.RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
        </div>

        <AdminTable
          columns={columns}
          dataSource={reviewData}
          rowKey="key"
          itemsName="đánh giá"
        />
      </Card>
    </div>
  );
};

export default ReviewList; 