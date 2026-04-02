import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const deleteProductsByCategoryId=asyncHandler(async(req , res , next)=>{
        const categoryId=req.params.id;
        const searchProducts=await Product.deleteMany({category:categoryId})
        if(!searchProducts){
             return next(new Error('products not found' , {cause:404}))
        }
        const products= await Product.find();

        return res.status(200).json({status:'success' ,products , length:products.length})
})

export default deleteProductsByCategoryId