import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllProducts=asyncHandler(async(req , res, next)=>{
    const products= await Product.find();
    if(!products){
         return next(new Error('no products found!!' , {cause:404}))
    }
    return res.status(200).json({
        products
    })
})

export default getAllProducts;