import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActions,
} from "@mui/material";

import { CartContext } from "../Context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      if (res.data.products.length === 0) {
        toast.success("No products found");
      }

      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/user/cart")}
        >
          Go To Cart
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={product.thumbnail}
                alt={product.name}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {product.description || "No description available"}
                </Typography>

                <Typography variant="h6" color="success.main" fontWeight="bold">
                  ${product.price}
                </Typography>

                <Typography variant="body2">Stock: {product.stock}</Typography>
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={() => addToCart(product._id)}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UserDashboard;
