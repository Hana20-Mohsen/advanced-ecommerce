import Category from "../../../DB/models/category.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const addCatgory=asyncHandler(async (req , res ,next)=>{

        const {image , name , slug}=req.body;
        if(!name){
            return next(new Error('name is required' , {cause:400}))
        }
        const searchCategory= await Category.find({name});
        if(searchCategory.length>1){
            return next(new Error('category already exists!!' , {cause:409}))
        }
        const newCategory=await Category.create({image , name , slug})
        return res.status(201).json({status:'success' , newCategory})
        
})

export default addCatgory