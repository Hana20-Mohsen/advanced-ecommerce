import Cart from "../../../DB/models/Cart.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const resetCart =asyncHandler( async (req, res, next) => {
        const userId = req.user._id;
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { items: [] },
            { new: true }
        );

        if (!cart) {
            return res.status(200).json({
                status: 'success',
                message: 'Cart was already empty',
                totalPrice: 0
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Cart cleared successfully',
            totalPrice: 0
        });
})

export default resetCart;