import { UserModel } from "../models/User.model.js";
import { UserToken } from "../models/UserToken.model.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



const jwtSecret = 'skjbasjkasdjjabdjkadbeajbdelddbeldbeadbubfwldfland';
export const sendEmail =async  (req, res) => {
    const {email} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        res.json('User does not exist');
    }
     const payload={
        email: user.email,
     }
     const expiryTime = 300;
     const token = jwt.sign(payload,jwtSecret,{expiresIn:expiryTime});
     const newtoken = new UserToken(
        {
            userId : user.id,
            token: token
        }
     );
    
    const mailTransport = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"khetibuddy001@gmail.com",
            pass:"bvqh oqog hkga hohf",
        }
    });
    let mailDetails = {
        from:"khetibuddy001@gmail.com",
        to:email,
        subject:"Reset Password Link",
        html:`
        <html>
        <body>
            <h1>Dear ${user.name}</h1>
            <p>We have received the request to reset your password , Click the link below in order to proceed further</p>\
            <a href="http://localhost:5173/reset/${token}">Reset Password</a>
            <br/>
            <p>this link is only valid for 5 min</p>
            <h2>Thank you!</h2>
            <p>Kardia+ team</p>
        </body>
        </html>

        `
    };
    mailTransport.sendMail(mailDetails, async(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json("Something Went Wrong while sending the email");
        }
        else{
            await newtoken.save();
            res.status(200).json("mail sent successfully");
        }
    })
}