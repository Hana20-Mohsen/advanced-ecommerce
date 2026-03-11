import Order from "../../../DB/models/order.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllOrders=asyncHandler(async(req , res , next)=>{ 
    const orders= await Order.find().populate('user' ,'_id name')
    if(!orders){
        return next(new Error('no orders found' , {cause:404}))
    }
    
    return res.status(200).json({status:'success' , orders , length:orders.length})
})


export default getAllOrders