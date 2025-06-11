import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItem } from '../models/cart';
import { message } from 'antd';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage on initial load
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.productId === item.productId);
      if (existingItem) {
        message.info(`Đã cập nhật số lượng cho ${item.productTitle}`);
        return prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        message.success(`Đã thêm ${item.productTitle} vào giỏ hàng`);
        return [...prevItems, item];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => {
      message.warning("Đã xóa sản phẩm khỏi giỏ hàng.");
      return prevItems.filter((item) => item.productId !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return prevItems.filter((item) => item.productId !== productId);
      }
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    console.log("clearCart called. Current cartItems:", cartItems);
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Explicitly remove from localStorage
    message.info("Giỏ hàng đã được làm trống.");
    console.log("Cart cleared. New cartItems state (should be empty):", []);
  }, [cartItems]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 