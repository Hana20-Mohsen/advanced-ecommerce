import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const updateProduct=asyncHandler(async(req , res , next)=>{
  console.log('im here');
  
         const updates = req.body;
         console.log(updates);
         
         const productId=req.params.productId;
        const productToUpdate= await Product.findById(productId)
        
        

          if(!productToUpdate){
            return next(new Error('order not found' , {cause:404}))
        }
        let productAfterUpdates= await Product.findByIdAndUpdate(productId , updates , {new:true})
         res.status(200).json({ status: 'success', productAfterUpdates });
})


export default updateProduct