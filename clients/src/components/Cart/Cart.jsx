import { CartContext } from "../Context/CartContext.jsx";
import { useContext } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const { cart, increaseItem, clearCart } = useContext(CartContext);

  const total =
    cart?.items?.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    ) || 0;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Cart
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {cart?.items?.length === 0 && (
        <Typography variant="h6">Your cart is empty</Typography>
      )}

      <Grid container spacing={2}>
        {cart?.items?.map((item) => (
          <Grid item xs={12} key={item._id}>
            <Card elevation={3}>
              <CardContent>
                <Grid container alignItems="center">
                  {/* Product info */}
                  <Grid item xs={5}>
                    <Typography variant="h6">{item.productId.name}</Typography>

                    <Typography color="text.secondary">
                      ${item.productId.price}
                    </Typography>
                  </Grid>

                  {/* Quantity controls */}
                  <Grid item xs={4}>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        color="primary"
                        onClick={() => increaseItem(item.productId._id)}
                      >
                        <AddIcon />
                      </IconButton>

                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>

                      <IconButton color="primary">
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Total */}
                  <Grid item xs={3}>
                    <Typography variant="h6">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" alignItems="center">
          <IconButton color="primary" onClick={clearCart}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Total Section */}
      <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={2}>
        <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>

        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ mt: 2 }}
          fullWidth
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}

export default Cart;
