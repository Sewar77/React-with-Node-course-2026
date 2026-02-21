import { getCartItems, addToCart, increaseItem, clearCart } from "../controllers/cart.Controller.js";
import express from "express"
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router()

router.post("/cart", protect, addToCart)
router.get("/cart", protect, getCartItems)
router.delete("/cart", protect, clearCart)
router.put("/cart/increase", protect, increaseItem)
export default router

