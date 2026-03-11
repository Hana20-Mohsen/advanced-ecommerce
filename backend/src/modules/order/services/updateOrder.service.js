import Order from "../../../DB/models/order.model.js";
import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const updateOrder=asyncHandler(async(req , res , next)=>{
        
        const updates = req.body;
        const { isPaid ,isDelivered } = req.body;
        const orderId=req.params.orderId;

        const orderToUpdate= await Order.findById(orderId)
        if(!orderToUpdate){
            return next(new Error('Order not found' , {cause:404}))
        }
        if(isPaid){
            orderToUpdate.paidAt=Date.now()
            orderToUpdate.orderItems.forEach(async (item) => {
            let product= await Product.findById(item.product)
            await Product.findByIdAndUpdate(product._id , {countInStock:product.countInStock-item.quantity} , {new:true})
        })
        }
        else if(isDelivered){
            orderToUpdate.deliveredAt=Date.now()
        }

        const validUpdates = Object.keys(updates).reduce((acc, key) => {
            acc[key] = updates[key];
            if(updates.isPaid){
                acc["paidAt"]=Date.now()
            }
            if(updates.isDelivered){
                acc["deliveredAt"]=Date.now()
            }
            
            return acc;
    }, {});
  let orderAfterUpdates= await Order.findByIdAndUpdate(orderId , validUpdates)
    

    res.status(200).json({ status: 'success', data: orderAfterUpdates });
})
export default updateOrder