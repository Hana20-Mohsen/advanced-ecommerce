import Cart from "../../../DB/models/Cart.model.js";
import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const updateQuantity = asyncHandler(async (req, res, next) => {
        const { operation } = req.body;
        const productId = req.params.id;
        const userId = req.user._id;

        // Get product info for stock validation
        const product = await Product.findById(productId);
        if (!product) {
            return next(new Error('Product not found' , {cause:404}))
        }

        // Find user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return next(new Error('Cart not found' , {cause:404}))
        }

        // Find the item in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        
        if (itemIndex === -1) {
            return next(new Error('Product not found in cart' , {cause:404}))
        }

        // Update quantity based on operation
       
            // Increment/decrement operation
            switch (operation) {
                case "+":
                    cart.items[itemIndex].quantity += 1;
                    break;
                case "-":
                    cart.items[itemIndex].quantity -=1;
                    break;
                default:
                    return next(new Error('Invalid operation' , {cause:400}))
            }

            if (cart.items[itemIndex].quantity > product.countInStock) {
                return next(new Error('Quantity exceeds available stock' , {cause:400}))
            }
            else if(cart.items[itemIndex].quantity<1){
                return next(new Error("Quantity can't be less than 1" , {cause:400}))
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

export default updateQuantity;