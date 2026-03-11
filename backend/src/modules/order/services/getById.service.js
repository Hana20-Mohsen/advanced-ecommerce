import Order from "../../../DB/models/order.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
 const getOrderById = asyncHandler(async (req, res) => {
    const userId=req.user._id
    const order = await Order.find({user:userId})
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images price');

    if (!order) {
     return next(new Error('order not found' , {cause:404}))
    }
    order.forEach(item=>{
        if (item.user._id.toString() !== req.user._id.toString()) {
     return next(new Error('not authorized' , {cause:401}))
    }
    })
   return res.status(200).json({status:'success',orders:order });
})

export default getOrderById