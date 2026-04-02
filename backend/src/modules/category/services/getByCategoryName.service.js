import Category from "../../../DB/models/category.model.js";
import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const getByCategoryName=asyncHandler(async(req , res , next)=>{
        const {name}=req.query;
        console.log(name);
        
        const category= await Category.findOne({name})
        console.log(category);
        if(!category){
            return next(new Error('no products found' , {cause:404}))
        }
        const categoryId=category.id
        console.log(`categoryId : ` , categoryId);
        
        
        const products= await Product.find({category:categoryId})
        if(!products){
            return next(new Error('no products found' , {cause:404}))
        }
        
        return res.status(200).json({status:'success',length:products.length , products })
})

export default getByCategoryName