import React from 'react';
import { Card, Row, Col, Statistic, Table, Space, Tag, Button } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';
import { useNavigate } from 'react-router';

interface RecentOrder {
  key: string;
  customer: string;
  products: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}

const Dashboard = () => {
  const navigate = useNavigate();

  const recentOrdersColumns: ColumnsType<RecentOrder> = [
    {
      title: RenderBoldTitle('Khách Hàng'),
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: RenderBoldTitle('Sản Phẩm'),
      dataIndex: "products",
      key: "products",
    },
    {
      title: RenderBoldTitle('Ngày Đặt'),
      dataIndex: "date",
      key: "date",
    },
    {
      title: RenderBoldTitle('Tổng Tiền'),
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} VNĐ`,
    },
    {
      title: RenderBoldTitle('Trạng Thái'),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusMap = {
          completed: { color: "green", text: "ĐÃ HOÀN THÀNH" },
          pending: { color: "orange", text: "ĐANG XỬ LÝ" },
          cancelled: { color: "red", text: "ĐÃ HỦY" },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const recentOrdersData: RecentOrder[] = [
    {
      key: "1",
      customer: "Nguyễn Văn An",
      products: "Hương Cà Phê Nguyên Chất x2",
      date: "15/04/2024",
      amount: 299000,
      status: "completed",
    },
    {
      key: "2",
      customer: "Trần Thị Bình",
      products: "Nhang Vòng Cà Phê x3",
      date: "20/04/2024",
      amount: 399000,
      status: "pending",
    },
    {
      key: "3",
      customer: "Lê Hoàng Nam",
      products: "Hương Cà Phê Đặc Biệt x1",
      date: "25/04/2024",
      amount: 499000,
      status: "cancelled",
    },
  ];

  return (
    <div className="dashboard-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Tổng Khách Hàng"
              value={1462}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#8B7156" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full" onClick={() => navigate('/bookings')} hoverable>
            <Statistic
              title="Tổng Đơn Hàng"
              value={286}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#8B7156" }}
            />
            <div className="mt-3">
              <Button type="link" onClick={() => navigate('/bookings')} style={{ color: "#8B7156" }}>
                Quản Lý Đơn Hàng
              </Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Doanh Thu"
              value={125680000}
              prefix={<DollarOutlined />}
              suffix="VNĐ"
              valueStyle={{ color: "#8B7156" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Tăng Trưởng"
              value={15.4}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              valueStyle={{ color: "#8B7156" }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={<span className="font-bold">Đơn Hàng Gần Đây</span>}
        className="mt-6"
        extra={
          <Button type="primary" onClick={() => navigate('/bookings')} style={{ backgroundColor: "#8B7156" }}>
            Xem Tất Cả Đơn Hàng
          </Button>
        }
      >
        <Table
          columns={recentOrdersColumns}
          dataSource={recentOrdersData}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
