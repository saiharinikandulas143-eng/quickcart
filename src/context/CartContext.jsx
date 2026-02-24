import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/UseLocalStorage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Loading state

  // Simulate initial loading (like fetching from API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // small delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  // Add to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cart,
    isCartOpen,
    isLoading, // ✅ exposed to app
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}