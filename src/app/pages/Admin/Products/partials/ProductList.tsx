import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Space, Table, Tag, message, Card } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Product } from '../../../../models/product';
import { productService } from '../../../../services/productService';

interface ProductListProps {
  onAddClick: () => void;
  onEditClick: (productId: string | number) => void;
  onViewClick: (productId: string | number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddClick, onEditClick, onViewClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [categories, setCategories] = useState<{ value: string | number; label: string }[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await productService.getAllCategories();
      setCategories(
        data.map(category => ({
          value: category.id,
          label: category.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Simulate API call
      // In a real app, you would call an API endpoint
      message.success('Xóa sản phẩm thành công');
      // Refresh the product list after deletion
      fetchProducts();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
  };

  const filteredProducts = products.filter(product => {
    const matchSearch = !searchText 
      || product.title?.toLowerCase().includes(searchText.toLowerCase())
      || product.description?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchSearch && matchCategory;
  });

  const columns: ColumnsType<Product> = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (image: string) => (
        <img 
          src={image || 'https://placehold.co/80x80?text=No+Image'} 
          alt="Product" 
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/80x80?text=Error';
          }}
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const categoryObj = categories.find(cat => cat.value === category);
        return (
          <Tag color={
            category === 'incense' ? 'green' :
            category === 'powder' ? 'orange' :
            category === 'accessories' ? 'blue' : 'default'
          }>
            {categoryObj?.label || category}
          </Tag>
        );
      },
      filters: categories.map(cat => ({ text: cat.label, value: cat.value })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price?.toLocaleString('vi-VN')} VNĐ`,
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={!stock || stock <= 0 ? 'red' : stock < 10 ? 'orange' : 'green'}>
          {stock || 0}
        </Tag>
      ),
      sorter: (a, b) => (a.stock || 0) - (b.stock || 0),
    },
    {
      title: 'Nổi bật',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured: boolean) => (
        <Tag color={featured ? 'blue' : 'default'}>
          {featured ? 'Có' : 'Không'}
        </Tag>
      ),
      filters: [
        { text: 'Có', value: true },
        { text: 'Không', value: false },
      ],
      onFilter: (value, record) => record.featured === value,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() => onViewClick(record.id || 0)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => onEditClick(record.id || 0)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id || 0)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddClick}
          className="bg-[#8B7156] hover:bg-[#64503C]"
        >
          Thêm sản phẩm
        </Button>
      </div>
      
      <Card className="mb-4">
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            placeholder="Lọc theo danh mục"
            style={{ width: 200 }}
            allowClear
            value={categoryFilter || undefined}
            onChange={handleCategoryFilter}
            options={[
              { value: '', label: 'Tất cả danh mục' },
              ...categories,
            ]}
          />
        </div>
      </Card>
      
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />
    </div>
  );
};

export default ProductList;