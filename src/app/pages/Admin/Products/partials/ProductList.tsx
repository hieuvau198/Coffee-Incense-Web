import React, { useState } from 'react';
import { Button, Input, Tag, Card, Select, Tooltip } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Product } from '../../../../models/product';
import type { ColumnsType } from 'antd/es/table';
import ActionButtons from '@/app/components/ActionButton';
import AdminTable from '@/app/components/AdminTable';
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

interface ProductsListProps {
  onViewProduct: (productId: string | number) => void;
  onEditProduct: (productId: string | number) => void;
  onAddProduct: () => void;
  handleDelete: (id: string | number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  onViewProduct,
  onEditProduct,
  onAddProduct,
  handleDelete
}) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<string>('');
  const [featuredFilter, setFeaturedFilter] = useState<boolean | null>(null);

  // Sample data
  const products: Product[] = [
    {
      id: '1',
      title: 'Hương Cà Phê Nguyên Chất',
      description: 'Hương thơm đặc trưng từ hạt cà phê Arabica',
      price: 159000,
      image: 'https://placehold.co/100x100',
      category: 'incense',
      stock: 50,
      featured: true,
    },
    {
      id: '2',
      title: 'Nhang Vòng Cà Phê',
      description: 'Nhang vòng từ bột cà phê tự nhiên',
      price: 199000,
      image: 'https://placehold.co/100x100',
      category: 'incense',
      stock: 30,
      featured: true,
    },
    {
      id: '3',
      title: 'Bột Hương Cà Phê',
      description: 'Bột hương từ cà phê Robusta',
      price: 99000,
      image: 'https://placehold.co/100x100',
      category: 'powder',
      stock: 0,
      featured: false,
    },
    {
      id: '4',
      title: 'Đế Đốt Nhang',
      description: 'Đế đốt nhang bằng gốm cao cấp',
      price: 299000,
      image: 'https://placehold.co/100x100',
      category: 'accessories',
      stock: 5,
      featured: false,
    }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      !searchText || 
      (product.title?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (product.description?.toLowerCase().includes(searchText.toLowerCase()) ?? false);

    const matchesCategory = !categoryFilter || product.category === categoryFilter;

    const stockNumber = product.stock ?? 0;
    const matchesStock = !stockFilter || (
      stockFilter === 'inStock' && stockNumber > 10 ||
      stockFilter === 'lowStock' && stockNumber > 0 && stockNumber <= 10 ||
      stockFilter === 'outOfStock' && stockNumber === 0
    );

    const matchesFeatured = featuredFilter === null || product.featured === featuredFilter;

    return matchesSearch && matchesCategory && matchesStock && matchesFeatured;
  });

  const columns: ColumnsType<Product> = [
    {
      title: RenderBoldTitle('Hình Ảnh'),
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (image) => (
        <div className="w-16 h-16 overflow-hidden rounded-md">
          <img 
            src={image || 'https://placehold.co/100x100'} 
            alt="Product" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      title: RenderBoldTitle('Tên Sản Phẩm'),
      dataIndex: 'title',
      key: 'title',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (title: string | null | undefined) => (
        <Tooltip placement="topLeft" title={title || 'Chưa có tên'}>
          <span>{title || 'Chưa có tên'}</span>
        </Tooltip>
      ),
    },
    {
      title: RenderBoldTitle('Danh Mục'),
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: string | null | undefined) => {
        const colorMap: Record<string, string> = {
          'incense': 'green',
          'powder': 'orange',
          'accessories': 'blue',
        };
        const labels: Record<string, string> = {
          'incense': 'Nhang hương',
          'powder': 'Bột hương',
          'accessories': 'Phụ kiện',
        };
        return (
          <Tag color={category ? colorMap[category] || 'default' : 'default'}>
            {category ? labels[category] || 'Khác' : 'Chưa phân loại'}
          </Tag>
        );
      },
    },
    {
      title: RenderBoldTitle('Giá Tiền'),
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number | null | undefined) => 
        price ? `${price.toLocaleString('vi-VN')} VNĐ` : 'Chưa có giá',
    },
    {
      title: RenderBoldTitle('Tồn Kho'),
      dataIndex: 'stock',
      key: 'stock',
      width: 120,
      render: (stock: number | null | undefined) => {
        const stockNumber = stock ?? 0;
        let color = 'green';
        if (stockNumber <= 0) {
          color = 'red';
        } else if (stockNumber < 10) {
          color = 'orange';
        }
        return <Tag color={color}>{stockNumber}</Tag>;
      },
    },
    {
      title: RenderBoldTitle('Nổi Bật'),
      dataIndex: 'featured',
      key: 'featured',
      width: 120,
      render: (featured: boolean | null | undefined) => (
        <Tag color={featured ? 'blue' : 'default'}>
          {featured ? 'Có' : 'Không'}
        </Tag>
      ),
    },
    {
      title: RenderBoldTitle('Thao Tác'),
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <ActionButtons
          onView={() => record.id && onViewProduct(record.id)}
          onEdit={() => record.id && onEditProduct(record.id)}
          onDelete={() => record.id && handleDelete(record.id)}
          deleteTooltip="Xóa sản phẩm"
          deleteDescription="Bạn có chắc chắn muốn xóa sản phẩm này?"
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Sản Phẩm</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onAddProduct}
          className="bg-[#8B7156] hover:bg-[#64503C]"
        >
          Thêm Sản Phẩm
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4 flex gap-4 flex-wrap">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Danh Mục"
            className="min-w-[150px]"
            allowClear
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              { value: 'incense', label: 'Nhang hương' },
              { value: 'powder', label: 'Bột hương' },
              { value: 'accessories', label: 'Phụ kiện' },
            ]}
          />
          <Select
            placeholder="Trạng Thái"
            className="min-w-[150px]"
            allowClear
            value={stockFilter}
            onChange={setStockFilter}
            options={[
              { value: 'inStock', label: 'Còn hàng' },
              { value: 'lowStock', label: 'Sắp hết' },
              { value: 'outOfStock', label: 'Hết hàng' },
            ]}
          />
          <Select
            placeholder="Sản Phẩm Nổi Bật"
            className="min-w-[150px]"
            allowClear
            value={featuredFilter}
            onChange={setFeaturedFilter}
            options={[
              { value: true, label: 'Có' },
              { value: false, label: 'Không' },
            ]}
          />
        </div>

        <AdminTable
          columns={columns}
          dataSource={filteredProducts}
          rowKey={record => record.id?.toString() || ''}
          loading={loading}
          itemsName="sản phẩm"
        />
      </Card>
    </div>
  );
};

export default ProductsList;