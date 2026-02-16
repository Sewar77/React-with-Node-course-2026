//user id, cart items[products id, quantity], timestepm, ==cart 
//cart item == products, quantity

import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    items: [cartItemSchema],
},
    { timestamps: true }
)

const Cart = mongoose.model("Cart", cartSchema)
export default Cart
