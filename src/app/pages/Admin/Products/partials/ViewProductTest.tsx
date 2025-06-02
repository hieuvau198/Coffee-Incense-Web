// src\app\pages\Admin\Products\partials\ViewProductTest.tsx

import React, { useEffect, useState } from "react";
import { Card, Spin, Descriptions, Tag, Image, Divider, Button } from "antd";
import { useProductCrud } from "../../../../hooks/generalCrud";
import { Product } from "../../../../models/product";

const ViewProductTest: React.FC<{ productId: string }> = ({ productId }) => {
  const { getProduct } = useProductCrud();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    getProduct(productId)
      .then((p) => {
        if (!ignore) setProduct(p || null);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [productId, getProduct]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <Card>
        <p>Không tìm thấy sản phẩm.</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={product.image || ""}
            alt={product.title || "Product image"}
            className="rounded-lg object-cover w-full"
          />
        </div>
        <div className="md:col-span-2">
          <Descriptions title="Thông tin sản phẩm" bordered column={1} size="middle">
            <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
            <Descriptions.Item label="Tên">{product.title}</Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              <Tag>{product.category}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {product.price?.toLocaleString("vi-VN")} VNĐ
            </Descriptions.Item>
            <Descriptions.Item label="Tồn kho">{product.stock || 0}</Descriptions.Item>
            <Descriptions.Item label="Nổi bật">
              <Tag color={product.featured ? "blue" : "default"}>
                {product.featured ? "Có" : "Không"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-2">Mô tả ngắn:</h3>
            <p>{product.description || "Không có mô tả"}</p>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-medium mb-2">Mô tả đầy đủ:</h3>
            <p>{product.fullDescription || product.description || "Không có mô tả chi tiết"}</p>
          </div>
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <>
              <Divider />
              <div>
                <h3 className="text-lg font-medium mb-2">Thông số kỹ thuật:</h3>
                <Descriptions bordered column={1} size="small">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>
                  ))}
                </Descriptions>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ViewProductTest;
