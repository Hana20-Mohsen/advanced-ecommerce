import { EventEmitter } from "node:events";
import jwt from 'jsonwebtoken'
import confirmEmailTemplate from "../email/template/confirmEmailTemplate.js";
import sendEmail from "../email/send.email.js";
import { generateToken } from "../security/token.security.js";
export const emailEvent= new EventEmitter()

try {
     emailEvent.on('sendConfirmEmail' ,async ({email}={})=>{
      console.log(`from email events the email = ${email}`);
      
     const emailToken=generateToken({payload:{email} , signature:process.env.EMAIL_TOKEN_SIGNATURE })
     console.log(`email token : ` , emailToken);
     
    //  jwt.sign({email} , process.env.EMAIL_TOKEN_SIGNATURE)
        let emailLink=`${process.env.FRONTEND_URL}/confirm-email/${emailToken}`
        let html=confirmEmailTemplate({link:emailLink})
        await sendEmail({to:email, subject:'Confirm Email' , html})
})
} catch (error) {
   console.log('email error');
    
}

