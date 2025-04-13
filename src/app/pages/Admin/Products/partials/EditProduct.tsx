import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Switch, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { productService } from '../../../../services/productService';
import { Product, ProductCategory } from '../../../../models/product';

const { Option } = Select;
const { TextArea } = Input;

interface EditProductProps {
  productId: string | number;
  onBack: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, onBack }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialData();
  }, [productId]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [productData, categoriesData] = await Promise.all([
        productService.getProductById(productId),
        productService.getAllCategories()
      ]);

      if (productData) {
        // Chuyển đổi specifications từ object sang string format cho form
        let specificationsText = '';
        if (productData.specifications) {
          specificationsText = Object.entries(productData.specifications)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        }

        form.setFieldsValue({
          ...productData,
          specifications: specificationsText
        });
      }

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Không thể tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // Xử lý specifications từ text format về object
      let specifications = {};
      if (values.specifications) {
        specifications = values.specifications.split('\n').reduce((acc: Record<string, string>, line: string) => {
          const [key, value] = line.split(':').map(item => item.trim());
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});
      }

      const updatedProduct = {
        ...values,
        id: productId,
        specifications
      };

      // Giả lập cập nhật sản phẩm thành công
      // Trong thực tế, ở đây sẽ gọi API cập nhật sản phẩm
      console.log('Updated product:', updatedProduct);
      
      // Giả lập API thành công
      setTimeout(() => {
        message.success('Cập nhật sản phẩm thành công');
        onBack();
      }, 1000);
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Không thể cập nhật sản phẩm');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
        >
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold">Chỉnh sửa sản phẩm</h1>
      </div>

      <Card className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <Form.Item
                label="Tên sản phẩm"
                name="title"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Danh mục"
                name="category"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map(category => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Mô tả ngắn"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}
              >
                <TextArea 
                  placeholder="Nhập mô tả ngắn cho sản phẩm" 
                  autoSize={{ minRows: 3, maxRows: 5 }} 
                />
              </Form.Item>

              <Form.Item
                label="Mô tả đầy đủ"
                name="fullDescription"
              >
                <TextArea 
                  placeholder="Nhập mô tả chi tiết cho sản phẩm" 
                  autoSize={{ minRows: 5, maxRows: 10 }} 
                />
              </Form.Item>

              <Form.Item
                label="URL Hình ảnh"
                name="image"
                rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh' }]}
              >
                <Input placeholder="Nhập URL hình ảnh" />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Giá bán (VNĐ)"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  step={1000}
                  placeholder="Nhập giá bán" 
                />
              </Form.Item>

              <Form.Item
                label="Tồn kho"
                name="stock"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  placeholder="Nhập số lượng tồn kho" 
                />
              </Form.Item>

              <Form.Item
                label="Sản phẩm nổi bật"
                name="featured"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Thông số kỹ thuật"
                name="specifications"
                extra="Nhập theo định dạng: Tên thông số: Giá trị (mỗi thông số trên một dòng)"
              >
                <TextArea 
                  placeholder="Ví dụ:
Xuất xứ: Việt Nam
Thành phần: Cà phê nguyên chất, hương liệu tự nhiên" 
                  autoSize={{ minRows: 4, maxRows: 8 }} 
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={onBack}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={submitting}
              className="bg-[#8B7156] hover:bg-[#64503C]"
            >
              Cập nhật sản phẩm
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;