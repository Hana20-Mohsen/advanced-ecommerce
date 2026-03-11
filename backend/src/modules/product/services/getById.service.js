import Product from "../../../DB/models/Product.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getByIds = asyncHandler(async (req, res, next) => {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
             return next(new Error("Invalid or missing 'ids' array", {cause:400}))
        }

        const products= await Product.find({_id:{$in:ids}});
        return res.status(200).json({status:'success' , products})
})

export default getByIds;