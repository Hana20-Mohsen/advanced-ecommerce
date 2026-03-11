import Order from "../../../DB/models/order.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const bestSeller=asyncHandler(async(req , res , next)=>{
  console.log('entered best seller');
  
        const orders= await Order.find().select('orderItems -_id');
        console.log(orders);
        
        const productSales = {}; 
        orders.forEach(order => {
  order.orderItems.forEach(item => {
    const id = item.product;
    const qty = item.quantity;
    productSales[id] = (productSales[id] || 0) + qty;
  });
});

const bestSellers = Object.entries(productSales)
  .sort((a, b) => b[1] - a[1]) // sort by quantity descending
  .slice(0, 3) // top 3 products
  .map(([productId, count]) => ({ productId, sold: count }));
        return res.status(200).json({status:'success' , bestSellers ,productSales})

})


export default bestSeller