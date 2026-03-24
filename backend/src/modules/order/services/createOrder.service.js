// import { getIO } from '../../../Socket/index.js';
// import Order from '../../../DB/models/order.model.js';
// import Cart from '../../../DB/models/Cart.model.js';
// import { asyncHandler } from '../../../utilities/error/error.js';
// import { getSocketInstance } from '../../../Socket/socketManager.js';
// const createOrder =asyncHandler( async (req, res) => {
//    const io = getIO()
//      const user=req.user;
//      const {  shippingAddress, paymentMethod } = req.body;
//     const cart= await Cart.findOne({user:user}).select('items _id').populate({
//     path: 'items.product',
//     select: 'price'
//   });

//     let orderItems=cart.items

//     const itemsPrice = orderItems.reduce((sum, item) => {
//       return sum + (item.product.price * item.quantity);
//     }, 0);


//     if (orderItems && orderItems.length === 0) {
//      return next(new Error('no items found in cart' , {cause:404}))
//     }

//     const taxPrice = itemsPrice * 0.15;
//     const shippingPrice = itemsPrice > 1000 ?  25 : 50;
//     const totalPrice = itemsPrice + taxPrice + shippingPrice;

//     const order = await Order.create({
//       user: req.user._id,
//       orderItems,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     });
//     io.to(req.user._id).emit("order-created",order)


//    return res.status(201).json({status:'success',createdOrder:order});
// })


// export default createOrder

import { getIO } from '../../../Socket/index.js';
import Order from '../../../DB/models/order.model.js';
import Cart from '../../../DB/models/Cart.model.js';
import Product from '../../../DB/models/Product.model.js';
import { asyncHandler } from '../../../utilities/error/error.js';

const createOrder = asyncHandler(async (req, res, next) => {
  const io = getIO();
  const user = req.user;
  const { shippingAddress, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: user._id })
    .select('items _id')
    .populate({
      path: 'items.product',
      select: 'price quantity', // 👈 IMPORTANT (we need quantity)
    });

  if (!cart || cart.items.length === 0) {
    return next(new Error('no items found in cart', { cause: 404 }));
  }

  let orderItems = cart.items;

  // 🛑 1. CHECK STOCK BEFORE CREATING ORDER
  for (const item of orderItems) {
    if (item.product.quantity < item.quantity) {
      return next(
        new Error(`Not enough stock for product ${item.product._id}`, {
          cause: 400,
        })
      );
    }
  }

  // 💰 pricing
  const itemsPrice = orderItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const taxPrice = itemsPrice * 0.15;
  const shippingPrice = itemsPrice > 1000 ? 25 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // ✅ 2. CREATE ORDER
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

  // 🔥 3. UPDATE STOCK (BEST WAY: bulkWrite)
const bulkOps = orderItems.map((item) => ({
  updateOne: {
    filter: { _id: item.product._id },
    update: {
      $inc: { countInStock: -item.quantity },
    },
  },
}));

await Product.bulkWrite(bulkOps);

  // 🔄 4. GET UPDATED PRODUCTS (for socket)
  const updatedProducts = await Product.find({
    _id: { $in: orderItems.map((i) => i.product._id) },
  }).select('_id countInStock');

  console.log(`updatedProducts : `, updatedProducts);

  // 📡 5. SOCKET EVENTS

  // user confirmation
  io.to(req.user._id.toString()).emit("order-created", order);

  // 🔥 GLOBAL STOCK UPDATE
  io.emit("product-stock-updated", {
    products: updatedProducts,
  });

  // 🧹 optional: clear cart
  await Cart.findOneAndDelete({ user: user._id });

  return res.status(201).json({
    status: 'success',
    createdOrder: order,
  });
});

export default createOrder;