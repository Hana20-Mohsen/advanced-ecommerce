import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import { generateDecryption } from "../../../utilities/security/encryption.security.js";
const getProfileData= asyncHandler(async (req , res , next)=>{
                    const userId=req.user._id;
                    const userData= await User.findById(userId)
                    if(!userData){
                        return next(new Error('user not found' , {cause:404}))

                    }
                    userData.phone=generateDecryption({cipherText:userData.phone})

                    return res.status(200).json({status:'success' , userData})
}
)
export default getProfileData