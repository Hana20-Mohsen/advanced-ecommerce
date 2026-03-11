import Brand from "../../../DB/models/brand.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const getAllBrands=asyncHandler(async(req , res , next)=>{
        const brands=await Brand.find();
        if(!brands){
            return next(new Error('no brands found' , {cause:404}))
        }
        return res.status(200).json({status:'success' , brands , length:brands.length})
})

export default getAllBrands