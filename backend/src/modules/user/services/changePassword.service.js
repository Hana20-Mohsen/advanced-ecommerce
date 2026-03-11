import User from "../../../DB/models/User.model.js";
import bcrypt from 'bcrypt';
import { asyncHandler } from "../../../utilities/error/error.js";
import { compareHash } from "../../../utilities/security/hash.security.js";
const changePassword = asyncHandler(async (req, res, next) => {

        const {currentPassword , newPassword , confirmPassword} = req.body;
        const userId = req.user._id;
        
        const searchUser= await User.findById(userId)
        if(!searchUser){
            // return res.status(404).json({message:'user not found ' , status:'fail'})
            return next(new Error('user not found' , {cause:404}))
        }
        const match=compareHash({plaintext:currentPassword , hashValue: searchUser.password})
        if(!match){
            // return res.status(400).json({message:'old password is incorrect' , status:'fail'})
            return next(new Error('old password is incorrect' , {cause:400}))
        }
        if(newPassword != confirmPassword){
            // return res.status(400).json({message:"password doesn't match" , status:'fail'})
            return next(new Error("password doesn't match" , {cause:400}))
        }
         const hashPassword=bcrypt.hashSync(newPassword , parseInt(process.env.SALT));
        const updatedUser= await User.findByIdAndUpdate(userId , {password:hashPassword})
        if(!updatedUser){
            // return res.status(404).json({message:'user not found' , status:'fail'})
            return next(new Error('user not found' , {cause:404}))
        }
        return res.status(200).json({status:'success' , message:'password updated successfully!'})
        
})

export default changePassword