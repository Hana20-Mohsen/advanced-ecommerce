import Product from '../../../DB/models/Product.model.js';
import Category from '../../../DB/models/category.model.js'
import { asyncHandler } from '../../../utilities/error/error.js';
// Create Product API
const addProduct=asyncHandler(async (req, res) => {
  const { name, price, description ,category ,countInStock , detaileddescription ,brand } = req.body;
  if (!req.body.name || !req.body.price || !req.body.description || !req.body.category || !req.body.countInStock) {
     return next(new Error('All fields are required' , {cause:400}))
  }
  const categoryName= await Category.findOne({name:category})
  const images = req.files.map(file => file.filename); 

  const newProduct = {
    name,
    price,
    description,
    detaileddescription,
    brand,
    category:categoryName._id,
    countInStock,
    images // array of filenames
  };

  const product= await Product.create(newProduct)
  return res.status(201).json({
    message:'Done',
    product
  })

})

export default addProduct;