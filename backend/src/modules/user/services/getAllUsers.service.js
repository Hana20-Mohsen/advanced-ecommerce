import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getAllUsers= asyncHandler(async(req , res , next)=>{
    const users = await User.find()
    return res.status(200).json({
        message:'Done',
        users
    })
})

export default getAllUsers;