import { getCartItems, addToCart } from "../controllers/cart.Controller.js";
import express from "express"

const router = express.Router()

router.post("/cart", addToCart)
router.get("/cart", getCartItems)

export default router

