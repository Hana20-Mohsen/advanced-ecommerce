import { getIO } from '../../../Socket/index.js';
import Order from '../../../DB/models/order.model.js';
import Cart from '../../../DB/models/Cart.model.js';
import { asyncHandler } from '../../../utilities/error/error.js';
import { getSocketInstance } from '../../../Socket/socketManager.js';
const createOrder =asyncHandler( async (req, res) => {
   const io = getIO()
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
    io.to(req.user._id).emit("order-created",order)
    

   return res.status(201).json({status:'success',createdOrder:order});
})


export default createOrder