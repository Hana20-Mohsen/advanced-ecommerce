const confirmEmailTemplate=({link}={})=>{
    return `<!DOCTYPE html>
<html>
  <head>
    <title>Email Template</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <!-- <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; padding:20px;">
      <tr>
        <td align="center" style="padding: 20px 0; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">
          Welcome to Our Newsletter!
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
          Hello there,<br/><br/>
          Thank you for subscribing. We're excited to have you! Stay tuned for updates, news, and offers.<br/><br/>
          Best regards,<br/>
          The Team
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px;">
          <a href="https://example.com" style="background-color:#007BFF; color:#ffffff; padding:10px 20px; text-decoration:none; font-family: Arial, sans-serif; font-size: 16px; border-radius:5px;">Visit Our Website</a>
        </td>
      </tr>
    </table>
  </body> -->

  <body style="background-color: rgb(168, 166, 166); padding:0; margin: 0; ;">
    <div style="padding: 4%;">
        <table align="center" border="0" cellpadding="0" cellspacing="0"  style="background-color: azure; padding: 2%; width: 50%; border:1px solid black; border-radius: 7px;">
        <tr  style="">
            <td style="  width: 50%;">
                <h2>
                    Link it
                </h2>
            </td>
            <td align="end" style=" width: 50%;">
                <h3>View In Website</h3>
            </td>
        </tr>
        <tr  style="padding: 5%; background-color: rgb(97, 13, 13); width: 100%;">
           <td colspan="2" align="center"> <img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375191/email_jxnt5c.png" alt="" style="width: 15%;"></td>
        </tr>
        <tr>
            <td colspan="2" align="center" >
                <h2 style="margin-top: 7px; margin-bottom: 7px; color:  rgb(97, 13, 13);">Email Confirmation</h2>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <a href="${link}" target="_blank" style="padding: 10px; background-color: rgb(97, 13, 13) ; border-radius: 10px; color: white; cursor: pointer;">Verify Email address</a>
            </td>
        </tr>
        <tr>
            <td  colspan="2" align="center">
                <h4 style="margin-top: 7px; margin-bottom: 20px;">Stay in touch</h4>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <div style="background-color: deepskyblue; display: inline-block; width: 40px; height: 40px; border-radius: 50%; margin-right: 20px;" ><img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375170/black-facebook_xicmqf.png" alt="" style="width: 80%; margin-top: 5px; cursor: pointer; "></div>
                <div style="background-color: hotpink; display: inline-block; width: 40px; height: 40px; border-radius: 50%; margin-right: 20px;" ><img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375179/black-instagram_weemw3.png" alt="" style="width: 80%; margin-top: 5px; cursor: pointer;"></div>
                <div style="background-color: deepskyblue; display: inline-block; width: 40px; height: 40px; border-radius: 50%;" ><img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375185/black-linkedin_mu0myo.png" alt=""  style="width: 80%; margin-top: 5px; cursor: pointer;"></div>
            </td>
        </tr>

    </table>
    </div>
  </body>
</html>
`
}

export default confirmEmailTemplate