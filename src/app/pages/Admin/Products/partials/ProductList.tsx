import React, { useEffect, useState } from 'react';
import { Input, Select, Space, Table, Tag, message, Card, Popconfirm, Image, Button } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Product } from '../../../../models/product';
import { productService } from '../../../../services/productService';
import { useProductCrud } from '../../../../hooks/generalCrud';

interface ProductListProps {
  onAddClick: () => void;
  onEdit: (product: Product) => void;
  onView: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddClick, onEdit, onView }) => {
  const { deleteProduct, subscribeToProducts } = useProductCrud();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [categories, setCategories] = useState<{ value: string | number; label: string }[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((updatedProducts) => {
      setProducts(updatedProducts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [subscribeToProducts]);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('Xóa sản phẩm thành công');
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
        <Image
          src={image || 'https://placehold.co/80x80?text=No+Image'}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
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
      width: 160,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined className="text-lg" />}
            onClick={() => onView(record.id?.toString() || '')}
          />
          <Button
            type="text"
            icon={<EditOutlined className="text-lg" />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id?.toString() || '')}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" danger icon={<DeleteOutlined className="text-lg" />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4 w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản Lý Sản Phẩm</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddClick}
          className="bg-[#8B7156] hover:bg-[#64503C]"
        >
          Thêm sản phẩm
        </Button>
      </div>
      <Card className="mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 max-w-full">
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
      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            position: ['bottomRight'],
            showTotal: (total) => `Tổng số ${total} sản phẩm`
          }}
          scroll={{ x: 1200 }}
          className="overflow-x-auto"
          size="middle"
          bordered={false}
          rowClassName={(record, index) => index % 2 === 0 ? 'bg-[#FAFAFA]' : ''}
        />
      </Card>
    </div>
  );
};

export default ProductList;