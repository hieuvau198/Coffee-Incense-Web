import React from 'react';
import { Card, Row, Col, Statistic, Table, Space, Tag } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

interface RecentBooking {
  key: string;
  customer: string;
  tour: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}

const Dashboard = () => {
  const recentBookingsColumns: ColumnsType<RecentBooking> = [
    {
      title: RenderBoldTitle('Customer'),
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: RenderBoldTitle('Tour'),
      dataIndex: "tour",
      key: "tour",
    },
    {
      title: RenderBoldTitle('Date'),
      dataIndex: "date",
      key: "date",
    },
    {
      title: RenderBoldTitle('Amount'),
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: RenderBoldTitle('Status'),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          completed: "green",
          pending: "orange",
          cancelled: "red",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const recentBookingsData: RecentBooking[] = [
    {
      key: "1",
      customer: "John Doe",
      tour: "Paris City Tour",
      date: "2024-04-15",
      amount: 299,
      status: "completed",
    },
    {
      key: "2",
      customer: "Jane Smith",
      tour: "London Adventure",
      date: "2024-04-20",
      amount: 399,
      status: "pending",
    },
    {
      key: "3",
      customer: "Mike Johnson",
      tour: "Tokyo Explorer",
      date: "2024-04-25",
      amount: 499,
      status: "cancelled",
    },
  ];

  return (
    <div className={`space-y-6 transition-all duration-300`}>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card title={RenderBoldTitle("Total Customers")} className="h-full">
            <Statistic
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title={RenderBoldTitle("Total Bookings")} className="h-full">
            <Statistic
              value={856}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1890ff" }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> 8%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title={RenderBoldTitle("Revenue")} className="h-full">
            <Statistic
              value={45678}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
              suffix={
                <span className="text-red-500 text-sm ml-2">
                  <ArrowDownOutlined /> 3%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title={RenderBoldTitle("Active Tours")} className="h-full">
            <Statistic
              value={24}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: "#1890ff" }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> 4%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Card title={RenderBoldTitle("Recent Bookings")} className="mt-6">
        <Table
          columns={recentBookingsColumns}
          dataSource={recentBookingsData}
          pagination={false}
          size="middle"
          // scroll={{ x: isCollapsed ? 800 : 600 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
