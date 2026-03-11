
import Order from '../../../DB/models/order.model.js';
import Cart from '../../../DB/models/Cart.model.js';
import { asyncHandler } from '../../../utilities/error/error.js';
 const createOrder =asyncHandler( async (req, res) => {
     const user=req.user;
     const {  shippingAddress, paymentMethod } = req.body;
    const cart= await Cart.findOne({user:user}).select('items _id').populate({
    path: 'items.product',
    select: 'price'
  });

    let orderItems=cart.items
  
    const itemsPrice = orderItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);


    if (orderItems && orderItems.length === 0) {
     return next(new Error('no items found in cart' , {cause:404}))
    }

    const taxPrice = itemsPrice * 0.15;
    const shippingPrice = itemsPrice > 1000 ?  25 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

   return res.status(201).json({status:'success',createdOrder:order});
})


export default createOrder