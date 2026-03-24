import Cart from "../../../DB/models/Cart.model.js";
import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import { getSocketInstance } from "../../../Socket/socketManager.js";
const addToCart = asyncHandler(async (req, res, next) => {
    const io = getSocketInstance()
    console.log('-------------------- add product to cart --------------------------');

    const productId = req.params.id;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new Error('Product not found', { cause: 404 }))
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    console.log(`cart : `, cart);

    // Check if product already in cart
    const existingItem = cart.items.find(item =>
        item.product._id.toString() === productId
    );

    if (existingItem) {
        // Remove product from cart (toggle behavior)
        cart.items = cart.items.filter(item =>
            item.product._id.toString() !== productId
        );
    } else {
        // Add product to cart
        cart.items.push({ product: productId });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: userId })
        .populate('items.product', 'name price images countInStock');

    const totalPrice = updatedCart.items.reduce((acc, item) =>
        acc + (item.quantity * item.product.price), 0);

    io.emit("product-added-to-cart", {
        productId,
        userId: req.user._id,
        message: "A product was added to cart",
    });
    return res.status(existingItem ? 200 : 201).json({
        status: existingItem ? 'remove' : 'success',
        message: existingItem ? 'Product removed from cart' : 'Product added to cart',
        cartItems: updatedCart.items,
        length: updatedCart.items.length,
        totalPrice
    });
})

export default addToCart;