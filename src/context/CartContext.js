import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (vehicle, selectedVariant, startDate, endDate) => {
    const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));
    const totalPrice = selectedVariant.pricePerDay * days;

    const newItem = {
      id: Date.now(),
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      brand: vehicle.brand,
      type: vehicle.type,
      category: vehicle.category,
      variantId: selectedVariant.id,
      fuelType: selectedVariant.fuelType,
      color: selectedVariant.color,
      pricePerDay: selectedVariant.pricePerDay,
      startDate,
      endDate,
      days,
      totalPrice,
      image: vehicle.image,
    };

    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
