
import Wishlist from "../../../DB/models/wishlist.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const findByUserId =asyncHandler( async (req, res, next) => {
        // const { authorization } = req.headers;
        // const [Bearer, token] = authorization.split(" ") || [];
        
        // if (!token || !Bearer) {
        //     return res.status(400).json({ message: "Invalid token components" });
        // }

        // let signature = undefined;
        // switch (Bearer) {
        //     case "admin":
        //         signature = process.env.TOKEN_SIGNATURE_ADMIN;
        //         break;
        //     case "Bearer":
        //         signature = process.env.TOKEN_SIGNATURE;
        //         break;
        //     default:
        //         break;
        // }
        
        // const decoded = jwt.decode(token, signature);
        // const userId = decoded.id;
        
        // Find wishlist and populate products
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

        if (!wishlist) {
            return next(new Error('wishList is empty' , {cause:404}))
        }

        return res.status(200).json({
            status: 'success',
            wishlistItems: wishlist.products,
            length: wishlist.products.length
        })
})

export default findByUserId;