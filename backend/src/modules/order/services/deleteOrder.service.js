import Order from "../../../DB/models/order.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const deleteOrder=asyncHandler(async(req , res , next)=>{
        const orderId=req.params.orderId;
        const order= await Order.findByIdAndDelete(orderId , {new:true})
        if(!order){
            return next(new Error('order not found' , {cause:404}))
        }
        return res.status(200).json({status:'success' , order})
})


export default deleteOrder