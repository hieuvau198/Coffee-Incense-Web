import { Product, ProductCategory } from "../models/product";
import { products, productCategories } from "../../mocks/product";

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    // In a real application, this would be an API call
    return Promise.resolve(products);
  }

  async getProductById(id: string | number): Promise<Product | undefined> {
    // In a real application, this would be an API call
    return Promise.resolve(products.find(product => product.id === id));
  }

  async getFeaturedProducts(limit = 3): Promise<Product[]> {
    // In a real application, this would be an API call
    return Promise.resolve(
      products
        .filter(product => product.featured)
        .slice(0, limit)
    );
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    // In a real application, this would be an API call
    return Promise.resolve(
      products.filter(product => product.category === categoryId)
    );
  }

  async getAllCategories(): Promise<ProductCategory[]> {
    // In a real application, this would be an API call
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