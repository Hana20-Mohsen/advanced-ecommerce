import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
const updateProfile= asyncHandler(async(req , res , next)=>{
        const {name , email} = req.body;
            const userId=req.user._id;
                const updatedUser= await User.findByIdAndUpdate(userId ,{name , email})
                if(!updatedUser){
                    return next(new Error('user not found' , {cause:404}))
                }

                return res.status(200).json({status:'success' , message:'user updated successfully'})
})

export default updateProfile
