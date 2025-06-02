// src\app\pages\Admin\Products\partials\ViewProductList.tsx

import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Space, Spin } from "antd";
import { useProductCrud } from "../../../../hooks/generalCrud";
import { Product } from "../../../../models/product";

interface ViewProductListProps {
  onBack: () => void;
  onViewClick: (productId: string | number) => void;
  onEditClick: (productId: string | number) => void;
}

const ViewProductList: React.FC<ViewProductListProps> = ({
  onBack,
  onViewClick,
  onEditClick,
}) => {
  const { getAllProducts, subscribeToProducts } = useProductCrud();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [subscribeToProducts]);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Giá bán (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (value: number) => value?.toLocaleString("vi-VN"),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => <Tag color={stock > 0 ? "green" : "red"}>{stock}</Tag>,
    },
    {
      title: "Nổi bật",
      dataIndex: "featured",
      key: "featured",
      render: (featured: boolean) =>
        featured ? <Tag color="blue">Có</Tag> : <Tag>Không</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Product) => (
        <Space>
          <Button type="link" onClick={() => onViewClick(record.id!)}>Xem</Button>
          <Button type="link" onClick={() => onEditClick(record.id!)}>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={onBack}>Quay lại</Button>
        <h1 className="text-xl font-bold">Danh sách sản phẩm (từ Firebase)</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      )}
    </div>
  );
};

export default ViewProductList;
