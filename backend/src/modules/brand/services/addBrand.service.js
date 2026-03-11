import Brand from "../../../DB/models/brand.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addBrand=asyncHandler(async(req , res , next)=>{
        const {image , name , slug}=req.body;
        if(!name){
            return next(new Error('name is required' , {cause:404}))
        }
        const searchBrand=await Brand.find({name})
        if(searchBrand.length>1){
            return next(new Error('Brand already exists!!!' , {cause:409}))
        }
        const newBrand= await Brand.create({image , name , slug})
        return res.status(201).json({status:'success' , newBrand })
})

export default addBrand;