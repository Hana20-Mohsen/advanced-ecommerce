import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteAllProducts=asyncHandler(async(req , res , next)=>{
        const deleted= await Product.deleteMany()
        if(!deleted){
            return next(new Error('products not deleted' , {cause:400}))
        }
        return res.status(200).json({status:'success' , message:'products deleted successfully'})

})

export default deleteAllProducts