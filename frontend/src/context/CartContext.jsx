import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      const parsed = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const savedAddress = localStorage.getItem('shippingAddress');
      return savedAddress ? JSON.parse(savedAddress) : {};
    } catch {
      return {};
    }
  });

  const [paymentMethod, setPaymentMethod] = useState(() => {
    try {
      const savedPayment = localStorage.getItem('paymentMethod');
      return savedPayment ? JSON.parse(savedPayment) : 'Razorpay';
    } catch {
      return 'Razorpay';
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  }, [paymentMethod]);

  const addToCart = (product, qty) => {
    const existItem = cartItems.find((x) => x.product === product.product);

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x.product === existItem.product ? product : x
        )
      );
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x.product !== id));
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  const savePaymentMethod = (data) => {
    setPaymentMethod(data);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalPrice = itemsPrice;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        shippingAddress,
        saveShippingAddress,
        paymentMethod,
        savePaymentMethod,
        clearCart,
        itemsPrice,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
