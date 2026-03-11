import Category from "../../../DB/models/category.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllCategories=asyncHandler(async(req , res , next)=>{
        const categories = await Category.find();
        if(!categories){
            return next(new Error('no categories found' , {cause:404}))
        }

        return res.status(200).json({status:'success' , categories , length:categories.length})
})

export default getAllCategories