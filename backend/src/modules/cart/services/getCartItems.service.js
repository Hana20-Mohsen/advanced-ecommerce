import Cart from "../../../DB/models/Cart.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getCartItems =asyncHandler( async (req, res, next) => {
    console.log('--------------------------------------- get cart items ------------------------------');
    
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId })
            .populate('items.product', 'name price images countInStock');
        console.log("cart : ",cart);
        
        if (!cart || cart.items.length === 0) {
            return next(new Error('cart have no items' , {cause:404}))
        }

        const totalPrice = cart.items.reduce((acc, item) => 
            acc + (item.quantity * item.product.price), 0);
        return res.status(200).json({
            status: 'success',
            cartItems: cart.items,
            length: cart.items.length,
            totalPrice
        });
}
)
export default getCartItems;