import { Product, ProductCategory } from "../models/product";
import { products, productCategories } from "../../mocks/product";

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return Promise.resolve(products);
  }

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const featuredProducts = products.filter(product => product.featured);
    return Promise.resolve(limit ? featuredProducts.slice(0, limit) : featuredProducts);
  }

  async getProductById(id: string | number): Promise<Product | undefined> {
    const productId = typeof id === 'string' ? parseInt(id, 10) : id;
    const product = products.find(p => p.id === productId);
    return Promise.resolve(product);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Promise.resolve(products.filter(product => product.category === categoryId));
  }

  async getAllCategories(): Promise<ProductCategory[]> {
    return Promise.resolve(productCategories);
  }

  async getCategoryById(id: string | number): Promise<ProductCategory | undefined> {
    // In a real application, this would be an API call
    return Promise.resolve(
      productCategories.find(category => category.id === id)
    );
  }
}

export const productService = new ProductService(); 