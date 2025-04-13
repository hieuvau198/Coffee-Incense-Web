import React, { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Spin, Image, Divider, Tag, Space } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { productService } from '../../../../services/productService';
import { Product } from '../../../../models/product';

interface ViewProductProps {
  productId: string | number;
  onBack: () => void;
  onEdit: (productId: string | number) => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({
  productId,
  onBack,
  onEdit,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await productService.getProductById(productId);
      setProduct(data || null);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center">
        <p>Không tìm thấy thông tin sản phẩm</p>
        <Button onClick={onBack} type="link">Quay lại</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
          >
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold">Chi tiết sản phẩm</h1>
        </Space>
        <Button 
          type="primary" 
          icon={<EditOutlined />} 
          onClick={() => onEdit(productId)}
          className="bg-[#8B7156] hover:bg-[#64503C]"
        >
          Chỉnh sửa
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Image
              src={product.image || 'https://placehold.co/400x400'}
              alt={product.title || 'Product image'}
              className="rounded-lg object-cover w-full"
              fallback="https://placehold.co/400x400?text=No+Image"
            />
          </div>

          <div className="md:col-span-2">
            <Descriptions title="Thông tin cơ bản" bordered column={1} size="middle">
              <Descriptions.Item label="ID sản phẩm">{product.id}</Descriptions.Item>
              <Descriptions.Item label="Tên sản phẩm">{product.title}</Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                <Tag color={
                  product.category === 'incense' ? 'green' :
                  product.category === 'powder' ? 'orange' :
                  product.category === 'accessories' ? 'blue' : 'default'
                }>
                  {product.category === 'incense' ? 'Nhang hương' : 
                   product.category === 'powder' ? 'Bột hương' : 
                   product.category === 'accessories' ? 'Phụ kiện' : 'Khác'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán">
                {product.price?.toLocaleString('vi-VN')} VNĐ
              </Descriptions.Item>
              <Descriptions.Item label="Tồn kho">
                <Tag color={
                  !product.stock || product.stock <= 0 ? 'red' :
                  product.stock < 10 ? 'orange' : 'green'
                }>
                  {product.stock || 0}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Sản phẩm nổi bật">
                <Tag color={product.featured ? 'blue' : 'default'}>
                  {product.featured ? 'Có' : 'Không'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div>
              <h3 className="text-lg font-medium mb-2">Mô tả ngắn:</h3>
              <p>{product.description || 'Không có mô tả'}</p>
            </div>

            <Divider />

            <div>
              <h3 className="text-lg font-medium mb-2">Mô tả đầy đủ:</h3>
              <p>{product.fullDescription || product.description || 'Không có mô tả chi tiết'}</p>
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
    </div>
  );
};

export default ViewProduct;