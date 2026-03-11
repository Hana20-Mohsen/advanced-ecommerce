import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addMultiple=asyncHandler(async (req , res , next)=>{
        const {data}=req.body;
      const done=  await Product.insertMany(data)
      if(!done){
        return next(new Error('data not inserted' , {cause:400}))
      }
      return res.status(201).json({status:'success' , data:done})

})

export default addMultiple