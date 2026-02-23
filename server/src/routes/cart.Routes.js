import { deleteItem, getCartItems, addToCart, increaseItem, clearCart, decreaseItem }
    from "../controllers/cart.Controller.js";
import express from "express"
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router()

router.post("/cart", protect, addToCart)
router.get("/cart", protect, getCartItems)
router.delete("/cart", protect, clearCart)
router.delete("/cart/delete", protect, deleteItem)
router.put("/cart/decrease", protect, decreaseItem)
router.put("/cart/increase", protect, increaseItem)
export default router

