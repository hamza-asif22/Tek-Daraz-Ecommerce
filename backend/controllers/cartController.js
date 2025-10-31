import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Ensure nested object structure
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }

        cartData[itemId][size] += 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
