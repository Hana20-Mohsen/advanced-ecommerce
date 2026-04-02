import User from "../../../DB/models/User.model.js";
import { userRoles } from "../../../middleware/auth.middleware.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import { compareHash } from "../../../utilities/security/hash.security.js";
import { generateToken } from "../../../utilities/security/token.security.js";
import { getIO } from '../../../Socket/index.js';
import { getSocketInstance } from "../../../Socket/socketManager.js";
const login = asyncHandler(async (req, res, next) => {
    console.log(process.env.CONNECTION_STRING);
    
    const io = getSocketInstance()
    const { email, password } = req.body
    console.log({email , password});
    
    const user = await User.findOne({ email })
  
    if (!user) {
        return next(new Error('user not found', { cause: 404 }))
    }
    // if (!user.confirmEmail) {
    //     return next(new Error('please confirm email first', { cause: 403 }))
    // }
    if (!compareHash({ plaintext: password, hashValue: user.password })) {
        return next(new Error('In-Valid login data!!', { cause: 400 }))

    }
    io.emit("join-user-room" , user._id)
    const token = generateToken({
        payload: { id: user._id, isloggedIn: true }
        , signature: user.role == userRoles.admin ? process.env.TOKEN_SIGNATURE_ADMIN : process.env.TOKEN_SIGNATURE, options: { expiresIn: '11h' }
    });
      console.log(token);
    
    // res.cookie("token", token, {
    //     httpOnly: true,      // JS cannot access it
    //     secure: false,       // true in production (HTTPS)
    //     sameSite: "Lax",     // helps prevent CSRF
    //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    // });
    return res.status(200).json({
        message: 'Done',
        id: user._id,
        user,
        token
    })
})

export default login;
