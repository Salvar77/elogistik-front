import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (ls) {
      const storedCart = ls.getItem("cart");
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart));
      }
    }
  }, [ls]);

  useEffect(() => {
    if (ls && cartProducts.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    } else if (ls && cartProducts.length === 0) {
      ls.removeItem("cart");
    }
  }, [cartProducts, ls]);

  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  const resetCart = () => {
    setCartProducts([]);
    if (ls) {
      ls.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
