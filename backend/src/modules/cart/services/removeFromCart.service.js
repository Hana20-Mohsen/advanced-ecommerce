import Cart from "../../../DB/models/Cart.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteFromCart = asyncHandler(async (req, res, next) => {
        const productId = req.params.id;
        const userId =req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return next(new Error('Cart not found' , {cause:404}))
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => 
            item.product.toString() !== productId
        );

        if (cart.items.length === initialLength) {
            return next(new Error('Product not found in cart' , {cause:404}))
        }

        await cart.save();
        const updatedCart = await Cart.findOne({ user: userId })
            .populate('items.product', 'name price images countInStock');
        
        const totalPrice = updatedCart.items.reduce((acc, item) => 
            acc + (item.quantity * item.product.price), 0);

        return res.status(200).json({
            status: 'success',
            cartItems: updatedCart.items,
            length: updatedCart.items.length,
            totalPrice
        });
})

export default deleteFromCart;