import Cart from '../../../DB/models/Cart.model.js';
import { asyncHandler } from '../../../utilities/error/error.js';

 const getOrderPrices =asyncHandler( async (req, res) => {
    const user=req.user;
    const cart= await Cart.findOne({user:user}).select('items _id').populate({
    path: 'items.product',
    select: 'price' 
  });

    let orderItems=cart.items
    const itemsPrice = orderItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    const taxPrice = itemsPrice * 0.15;
    const shippingPrice = itemsPrice > 1000 ? 25 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

   return res.status(201).json({status:'success',subtotal:itemsPrice , shippingPrice , taxPrice ,totalPrice})
})


export default getOrderPrices