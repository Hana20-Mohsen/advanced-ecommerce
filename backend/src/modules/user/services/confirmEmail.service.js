import User from '../../../DB/models/User.model.js'
import { asyncHandler } from '../../../utilities/error/error.js'
import { verifyToken } from '../../../utilities/security/token.security.js';

const confirmEmail= asyncHandler(async(req , res , next)=>{
        console.log(`enter confirm email`);
        
        const {authorization}= req.headers;
        const decoded= verifyToken({token:authorization , signature:process.env.EMAIL_TOKEN_SIGNATURE})
        const email=decoded.email;
        const updatedUser= await User.findOneAndUpdate({email} , {confirmEmail:true} , {new:true})
        return res.status(200).json({status:'success' , message:'Email confirmed successfully' , user:updatedUser})
})

export default confirmEmail
