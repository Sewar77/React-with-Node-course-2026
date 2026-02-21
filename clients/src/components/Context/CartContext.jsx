import { createContext, useState, useEffect } from "react";
import api from "../../api.js";
import { useAuth } from "./AuthContext.jsx";
export const CartContext = createContext();
import toast from "react-hot-toast";
export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const [cart, setCart] = useState(null);
  console.log(userId);

  const fetchCart = async () => {
    const res = await api.get("/cart");
    console.log(res.data.cart);
    setCart(res.data.cart);
  };
  const addToCart = async (productsId) => {
    try {
      const res = await api.post("/cart", { productsId, userId });
      console.log(res);
      toast.success("added to cart successfully");
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };
  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCart({
        items: [],
      });
      toast.success("deleted successfluus");
    } catch (err) {
      console.error(err);
    }
  };
  const increaseItem = async (productsId) => {
    try {
      const res = await api.put("/cart/increase", { productsId });
      console.log(productsId);
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        fetchCart,
        increaseItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
