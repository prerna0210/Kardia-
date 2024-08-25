import express from 'express';
import cors from "cors";
import { UserModel } from './models/User.model.js';
import bcrypt from 'bcrypt';
import { hash, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieparser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import { sendEmail } from './controllers/auth.controller.js';




const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
// this thing her made it possible to upload photos , this line basicaaly saya that everything in upload should be displayed in the browser
// Combining these parts, the line essentially says: "Use the express.static middleware to serve static files from the 'uploads' directory when the URL path starts with '/uploads'." This is commonly used to make files in the 'uploads' directory accessible over the web, like images or user-uploaded files.
app.use('/uploads', express.static(__dirname + '/uploads'));
const jwtSecret = 'skjbasjkasdjjabdjkadbeajbdelddbeldbeadbubfwldfland';
app.use(express.json());
app.use(cookieparser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newuser = await UserModel.create({
            name,
            email,
            password: hashSync(password, bcryptSalt,),
        });
        res.status(200).json(newuser);

    }
    catch (e) {
        res.status(422).json({ error: "error occurred while trying to register user", message: e.message });
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newuser = await UserModel.findOne({ email });
        if (newuser) {
            const passOK = bcrypt.compareSync(password, newuser.password);
            if (passOK) {
                jwt.sign({ email: newuser.email, id: newuser._id, name: newuser.name }, jwtSecret, {}, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.cookie('token', token).json(newuser);
                })
            }
            else {
                res.status(422).json('Password does not match');
            }

        }
        else {
            res.status(500).json('User does not exist');
        }



    } catch (error) {
        res.json(422).json("error occured while loging in ");
        console.log(error);

    }
})


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, data) => {
            if (err) throw err;
            res.json(data);
        })

    } else {
        res.json(null);
    }

})


app.post('/logout', (req, res) => {
    res.cookie('token', '').status(200).json('You are logged out please login again')
})


app.post('/forgot-password', async(req, res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(!user){
            return res.status(404).json("user does not exist");
        }
        const token = jwt.sign({id:user._id},jwtSecret,{expiresIn:300})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kardiaplus001@gmail.com'
              ,
              pass: 'rncf oizo fsxc cbks'
            }
          });
          
          var mailOptions = {
            from: 'khetibuddy001@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.status(200).json("email sent successfully");
              console.log('Email sent: ' + info.response);
            }
          });
    })
})

app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            // Hash the password synchronously
            const hash = bcrypt.hashSync(password, bcryptSalt);

            // Update the user's password
            UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
               .then(u => {
                    res.status(200).json({ message: "Password reset successful" });
                })
               .catch(err => {
                    // Handle specific errors or send a generic error message
                    console.error(err); // Log the error for debugging
                    res.status(500).json({ error: "An error occurred while resetting the password." });
                });
        }
    });
});


app.get('/', (req, res) => {
    res.json('Hey backend set up is done')
})

export { app }