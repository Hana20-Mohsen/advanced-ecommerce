// const confirmEmailTemplate=({link}={})=>{
//     return `<!DOCTYPE html>
// <html>
//   <head>
//     <title>Email Template</title>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   </head>
//   <!-- <body style="margin:0; padding:0; background-color:#f4f4f4;">
//     <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; padding:20px;">
//       <tr>
//         <td align="center" style="padding: 20px 0; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">
//           Welcome to Our Newsletter!
//         </td>
//       </tr>
//       <tr>
//         <td style="padding: 10px 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
//           Hello there,<br/><br/>
//           Thank you for subscribing. We're excited to have you! Stay tuned for updates, news, and offers.<br/><br/>
//           Best regards,<br/>
//           The Team
//         </td>
//       </tr>
//       <tr>
//         <td align="center" style="padding: 20px;">
//           <a href="https://example.com" style="background-color:#007BFF; color:#ffffff; padding:10px 20px; text-decoration:none; font-family: Arial, sans-serif; font-size: 16px; border-radius:5px;">Visit Our Website</a>
//         </td>
//       </tr>
//     </table>
//   </body> -->

//   <body style="background-color: rgb(168, 166, 166); padding:0; margin: 0; ;">
//     <div style="padding: 4%;">
//         <table align="center" border="0" cellpadding="0" cellspacing="0"  style="background-color: azure; padding: 2%; width: 50%; border:1px solid black; border-radius: 7px;">
//         <tr  style="">
//             <td style="  width: 50%;">
//                 <h2>
//                     Link it
//                 </h2>
//             </td>
//             <td align="end" style=" width: 50%;">
//                 <h3>View In Website</h3>
//             </td>
//         </tr>
//         <tr  style="padding: 5%; background-color: rgb(97, 13, 13); width: 100%;">
//            <td colspan="2" align="center"> <img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375191/email_jxnt5c.png" alt="" style="width: 15%;"></td>
//         </tr>
//         <tr>
//             <td colspan="2" align="center" >
//                 <h2 style="margin-top: 7px; margin-bottom: 7px; color:  rgb(97, 13, 13);">Email Confirmation</h2>
//             </td>
//         </tr>
//         <tr>
//             <td colspan="2" align="center">
//                 <a href="${link}" target="_blank" style="padding: 10px; background-color: rgb(97, 13, 13) ; border-radius: 10px; color: white; cursor: pointer;">Verify Email address</a>
//             </td>
//         </tr>
//         <tr>
//             <td  colspan="2" align="center">
//                 <h4 style="margin-top: 7px; margin-bottom: 20px;">Stay in touch</h4>
//             </td>
//         </tr>
//         <tr>
//             <td colspan="2" align="center">
//                 <div style="background-color: deepskyblue; display: inline-block; width: 40px; height: 40px; border-radius: 50%; margin-right: 20px;" ><img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375170/black-facebook_xicmqf.png" alt="" style="width: 80%; margin-top: 5px; cursor: pointer; "></div>
//                 <div style="background-color: hotpink; display: inline-block; width: 40px; height: 40px; border-radius: 50%; margin-right: 20px;" ><img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375179/black-instagram_weemw3.png" alt="" style="width: 80%; margin-top: 5px; cursor: pointer;"></div>
//                 <div style="background-color: deepskyblue; display: inline-block; width: 40px; height: 40px; border-radius: 50%;" ><img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375185/black-linkedin_mu0myo.png" alt=""  style="width: 80%; margin-top: 5px; cursor: pointer;"></div>
//             </td>
//         </tr>

//     </table>
//     </div>
//   </body>
// </html>
// `
// }

// export default confirmEmailTemplate

const confirmEmailTemplate = ({ link } = {}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Confirmation</title>

  <style>
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 10px !important;
      }

      .content {
        padding: 15px !important;
      }

      .btn {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
      }

      .social-icons div {
        margin: 5px !important;
      }

      h2 {
        font-size: 20px !important;
      }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#a8a6a6; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">

        <!-- Container -->
        <table class="container" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:15px;">
              <table width="100%">
                <tr>
                  <td align="left">
                    <h2 style="margin:0;">Link it</h2>
                  </td>
                  <td align="right">
                    <span style="font-size:14px;">View In Website</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Banner -->
          <tr>
            <td align="center" style="background-color:#610d0d; padding:20px;">
              <img 
                src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375191/email_jxnt5c.png" 
                alt="logo" 
                style="width:80px; max-width:100%; height:auto;" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" class="content" style="padding:20px;">
              <h2 style="color:#610d0d; margin:10px 0;">Email Confirmation</h2>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:10px 20px;">
              <a href="${link}" target="_blank"
                class="btn"
                style="display:inline-block; padding:12px 25px; background-color:#610d0d; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
                Verify Email Address
              </a>
            </td>
          </tr>

          <!-- Footer Text -->
          <tr>
            <td align="center" style="padding:20px;">
              <h4 style="margin:0;">Stay in touch</h4>
            </td>
          </tr>

          <!-- Social Icons -->
          <tr>
            <td align="center" class="social-icons" style="padding-bottom:20px;">

              <div style="display:inline-block; margin:10px;">
                <img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375170/black-facebook_xicmqf.png"
                  style="width:35px; height:35px;" />
              </div>

              <div style="display:inline-block; margin:10px;">
                <img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375179/black-instagram_weemw3.png"
                  style="width:35px; height:35px;" />
              </div>

              <div style="display:inline-block; margin:10px;">
                <img src="https://res.cloudinary.com/dtjj807yo/image/upload/v1752375185/black-linkedin_mu0myo.png"
                  style="width:35px; height:35px;" />
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

export default confirmEmailTemplate;