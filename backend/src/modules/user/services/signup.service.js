import User from "../../../DB/models/User.model.js";
import { emailEvent } from "../../../utilities/events/email.event.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import { generateHash } from "../../../utilities/security/hash.security.js";
import { generateEncryption } from "../../../utilities/security/encryption.security.js";
import confirmEmailTemplate from "../../../utilities/email/template/confirmEmailTemplate.js";
import { generateToken } from "../../../utilities/security/token.security.js";
import sendEmail from "../../../utilities/email/send.email.js";
const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, confirmationPassword, phone } = req.body;
    if (password !== confirmationPassword) {
        return next(new Error('pssword mismatch caonfirmation Password!!', { cause: 400 }))
    }
    if (await User.findOne({ email })) {
        return res.status(409).json({
            status: `fail`,
            message: 'email Already exists!!'
        })
        return next(new Error('email Already exists!!', { cause: 409 }))
    }

    const hashPassword = generateHash({ plaintext: password })
    const encryptedPhone = generateEncryption({ plainText: phone })
    const user = await User.create({ name, email, password: hashPassword, phone: encryptedPhone });
    // emailEvent.emit('sendConfirmEmail' , {email})
    console.log("EMAIL:", process.env.EMAIL);
    console.log("PASS:", process.env.EMAIL_PASSWORD);
    const emailToken = generateToken({ payload: { email }, signature: process.env.EMAIL_TOKEN_SIGNATURE })
    console.log(`email token : `, emailToken);
    let emailLink = `${process.env.FRONTEND_URL}/confirm-email/${emailToken}`

    await sendEmail({
        to: email,
        subject: "Confirm Email",
        html: confirmEmailTemplate({ link: emailLink })
    });

    return res.status(201).json({
        message: 'Done',
        user
    })

})

export default signup;