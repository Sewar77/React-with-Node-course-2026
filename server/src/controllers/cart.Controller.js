import Cart from "../models/cart.Model.js";

export const addToCart = async (req, res) => {
    const { userId, productsId } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ productId: productsId, quantity: 1 }]
            });
            return res.status(200).json({
                cart,
                message: "added to cart"
            });
        }
        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productsId
        );
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId: productsId,
                quantity: 1
            });
        }
        await cart.save();
        return res.status(200).json({
            cart,
            message: "added successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error adding product",
            err
        });
    }
}

export const getCartItems = async (req, res) => {
    const { userId } = req.body;
    try {
        const cart = await Cart.findOne({
            user: userId
        }).populate("items.productId");
        if (!cart) {
            return res.status(200).json({
                cart: [],
                message: "the Cart is empty"
            });
        }
        return res.status(200).json({
            cart,
            message: "Cart items fetched"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching cart",
            err
        });
    }
};