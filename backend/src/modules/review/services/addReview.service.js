import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const addReview= asyncHandler(async(req , res , next)=>{
        const { rating,comment } = req.body;
        const product = await Product.findById(req.params.productId);
        if(!product){
            return next(new Error('product not found' , {cause:404}))
        }
      const numericRating = Number(rating);

      
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return next(new Error("Rating must be between 1 and 5" , {cause:400}))

    }
     const newReview = {
      userId: req.user._id,
      userName: req.user.name,
      rating: numericRating,
      comment,
    };
    product.reviews.push(newReview);
        const totalRatings = product.reviews.reduce((sum, review) => {
  // Ensure each review.rating is a valid number, default to 0 if invalid
  const rating = Number(review.rating) || 0;
  return sum + rating;
}, 0);

    product.rating = totalRatings / product.reviews.length;
    product.numReviews = product.reviews.length;


    await product.save();
    res.status(201).json({ status:'success', newReview });
}
)
export default addReview