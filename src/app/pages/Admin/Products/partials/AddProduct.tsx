import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Switch, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { productService } from '../../../../services/productService';
import { ProductCategory } from '../../../../models/product';

const { Option } = Select;
const { TextArea } = Input;

interface AddProductProps {
  onBack: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onBack }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await productService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Không thể tải danh mục sản phẩm');
    }
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // Giả lập thêm sản phẩm thành công
      // Trong thực tế, ở đây sẽ gọi API thêm sản phẩm
      console.log('Form values:', values);
      
      // Giả lập API thành công
      setTimeout(() => {
        message.success('Thêm sản phẩm thành công');
        form.resetFields();
        onBack();
      }, 1000);
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Không thể thêm sản phẩm');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
        >
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
      </div>

      <Card className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          initialValues={{
            featured: false,
            stock: 0,
            price: 0,
          }}
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

              {/* Trong thực tế, bạn có thể sử dụng Upload để tải lên ảnh */}
              {/* <Form.Item
                label="Hình ảnh"
                name="imageFile"
              >
                <Upload 
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                </Upload>
              </Form.Item> */}
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
              Thêm sản phẩm
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;