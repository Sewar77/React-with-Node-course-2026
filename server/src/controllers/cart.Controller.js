import Cart from "../models/cart.Model.js";

export const addToCart = async (req, res) => {
    const userId = req.user.id
    const { productsId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = await Cart.create({
                userId: userId,
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

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.productId");

        return res.status(200).json({
            cart: updatedCart,
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
    const userId = req.user.id;
    console.log(userId)
    try {
        const cart = await Cart.findOne({
            userId
        }).populate("items.productId");
        console.log(cart)
        if (!cart) {
            return res.status(200).json({
                cart: null,
                message: "the Cart is empty"
            });
        }
        console.log(cart.length)

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


//increase cart item 
export const increaseItem = async (req, res) => {

    const userId = req.user.id;
    const { productsId } = req.body;
    console.log(productsId)
    try {

        const cart = await Cart.findOne({ userId });

        if (!cart)
            return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(
            item => item.productId.toString() === productsId
        );

        if (!item)
            return res.status(404).json({ message: "Item not found" });

        item.quantity += 1;

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.productId");

        res.status(200).json({ cart: updatedCart });

    } catch (err) {

        res.status(500).json(err);

    }

};

//decrese task

























