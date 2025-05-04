import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart, addToCart, removeFromCart } from "../services/api";

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {}
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_TO_CART":
      const existingItem = state.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        return state.map((item) =>
          item.product._id === action.payload.product._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.product._id !== action.payload);
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      dispatch({ type: "SET_CART", payload: data?.items || [] });
    } catch (error) {
      if (error.message === 'Unauthorized') {
        navigate('/login');
      }
      console.error("Cart load error:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      await loadCart(); // Refresh the cart after adding
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      console.error("Add to cart error:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;



