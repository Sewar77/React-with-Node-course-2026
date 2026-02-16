import { createContext, useState, useEffect, Children } from "react";
import api from "../../api.js";
import { useAuth } from "./AuthContext.jsx";
export const CartContext = createContext();
import toast from "react-hot-toast";
export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await api.get("/cart", { userId });
    console.log(res.data.cart);
    setCart(res.data.cart);
  };

  const addToCart = async (productsId) => {
    try {
      const res = await api.post("/cart", { productsId, userId });
      console.log(res.data.cart);
      toast.success("added to cart successfully");

      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
