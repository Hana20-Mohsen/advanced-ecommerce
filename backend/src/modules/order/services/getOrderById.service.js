import Order from "../../../DB/models/order.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getByOrderId=asyncHandler(async(req , res , next)=>{
        const user=req.user;
        const orderId=req.params.id;
        const order= await Order.findById(orderId).populate('user' ,'_id name ').populate('orderItems.product' , '_id name images price')
        if(!order){
            return next(new Error('order not found' , {cause:404}))
        }
    
        return res.status(200).json({status:'success' , order})
})

export default getByOrderId