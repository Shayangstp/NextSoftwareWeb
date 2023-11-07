import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { v4 as uuidv4 } from "uuid";

export const sendForgotPassEmail = async ({ email, userId }) => {
  try {
    const hashedToken = uuidv4();
    // const hashedToken = "Shayan";

    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    });

    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "g.shayan5529@gmail.com",
        pass: process.env.NODE_MAILER,
      },
    });

    const mailOptions = {
      from: "g.shayan5529@gmail.com",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to reset your password
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/newpassword?token=${hashedToken}
            </p>`,
    };
    const mailresponse = transport.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          throw new Error(error);
        } else {
          console.log("Email Sent");
          return true;
        }
      }
    );
    return mailresponse;
  } catch (err) {
    throw new Error(err);
  }
};
