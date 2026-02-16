import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import "./UserDashboard.css";
import { Button } from "@mui/material";
import { CartContext } from "../Context/CartContext.jsx";

//display products as cards
function UserDashboard() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      if (res.data.products.length === 0) {
        toast.success("No products found");
      }
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);
  //increase amount and decrease , remove from cart, view cart, checkout, total proce, display cart items
  return (
    <>
      <div>This is user dashboard page</div>
      <div className="products-container">
        {products.map((product) => {
          return (
            <div key={product._id} className="product-card">
              <img
                src={product.thumbnail}
                alt={product.name}
                width="100"
                height="100"
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>{product.description || "No description available"}</p>
              <Button
                color="success"
                variant="contained"
                onClick={() => addToCart(product._id)}
              >
                Add To Cart
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserDashboard;
