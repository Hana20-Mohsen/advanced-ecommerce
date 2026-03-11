import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const GetByProductId=asyncHandler(async(req , res , next)=>{
        const productId=req.params.id;
        const product= await Product.findById(productId)
        if(!product){
             return next(new Error('product not found' , {cause:404}))
        }
        return res.status(200).json({status:'success' , product})
})

export default GetByProductId;