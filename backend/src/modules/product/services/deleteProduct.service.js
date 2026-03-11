import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteProduct=asyncHandler(async(req , res , next)=>{
        const productId=req.params.id;
        const searchProduct=await Product.findByIdAndDelete(productId)
        if(!searchProduct){
             return next(new Error('product not found' , {cause:404}))
        }
        const products= await Product.find();

        return res.status(200).json({status:'success' ,products , length:products.length})
})

export default deleteProduct