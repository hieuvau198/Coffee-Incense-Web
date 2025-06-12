// src\app\hooks\generalCrud.ts

import { useCallback } from "react";
import {
  createData,
  readData,
  updateData,
  deleteData,
  readAllData,
  listenToCollection,
} from "../modules/firebase/store";
import { Product } from "../models/product";

// The collection name in Firestore for products
const PRODUCT_COLLECTION = "products";

export const useProductCrud = () => {
  // Create a new product
  const createProduct = useCallback(async (data: Omit<Product, "id">) => {
    await createData(PRODUCT_COLLECTION, data);
  }, []);

  // Read a product by ID
  const getProduct = useCallback(async (id: string) => {
    return await readData<Product>(PRODUCT_COLLECTION, id);
  }, []);

  // Update a product by ID
  const updateProduct = useCallback(async (id: string, data: Partial<Product>) => {
    await updateData(PRODUCT_COLLECTION, id, data);
  }, []);

  // Delete a product by ID
  const deleteProduct = useCallback(async (id: string) => {
    await deleteData(PRODUCT_COLLECTION, id);
  }, []);

  // Read all products
  const getAllProducts = useCallback(async () => {
    return await readAllData<Product>(PRODUCT_COLLECTION);
  }, []);

  // Listen to real-time updates
  const subscribeToProducts = useCallback((callback: (products: Product[]) => void) => {
    return listenToCollection<Product>(PRODUCT_COLLECTION, callback);
    // Returns unsubscribe function
  }, []);

  return {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    subscribeToProducts,
  };
};
