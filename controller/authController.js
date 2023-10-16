import userModel from "../models/userModel.js";
import { comparePass, hashPass } from "../utils/authUtil.js";
import Jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import userVerification from "../models/userVerification.js";
// import dotenv from "dotenv";
// const nodemailer = require("nodemailer");
// const { v4: uuidv4 } = require("uuid");

// dotenv.config();
//nodemailer

// const sendVerificationEmail = ({ _id, email }, res) => {
//     const currentUrl = "http://localhost:8080/";
//     const uniqueString = uuidv4() + _id;
//     const mailOptions = {
//         from: process.env.AUTH_EMAIL,
//         to: email,
//         subject: "Verify your Email",
//         html: `<p>Verify your Email for completeting registration.</p><p>this link <b>expires in 6 hours.</b></p><p>Click the link: <a href=${currentUrl + "register/verify/" + _id + "/" + uniqueString}<p/>`
//     }
//     let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.AUTH_EMAIL,
//             pass: process.env.AUTH_PASS,
//         }
//     })
//     const saltRounds = 10;
//     bcrypt.hash(uniqueString, saltRounds).then((hashedUniqueString) => {
//         const newVerification = new userVerification({
//             userId: _id,
//             uniqueString: hashedUniqueString,
//             createdAt: Date.now(),
//             expiresAt: Date.now() + 21600000,
//         });
//         newVerification.save().then(()=>{
//             transporter.sendMail(mailOptions).then(()=>{
//                 res.json({
//                     status: "pending",
//                     message: "email sent"
//                 })
//             }).catch((error)=> {
//                 console.log(error);
//                 res.json({
//                     status: "failed",
//                     message: "An error occurred while sending"
//                 })
//             });
//         }).catch((error) => {
//             console.log(error);
//             res.json({
//                 status: "failed",
//                 message: "An error occurred while saving"
//             })
//         });
//     }).catch(() => {
//         res.json({
//             status: "failed",
//             message: "An error occurred while hashing"
//         })
//     })
// }

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ message: 'Name is required.' })
        }
        if (!email) {
            return res.send({ message: 'email is required.' })
        }
        if (!password) {
            return res.send({ message: 'password is required.' })
        }
        if (!phone) {
            return res.send({ message: 'phone is required.' })
        }
        if (!address) {
            return res.send({ message: 'address is required.' })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Registered please Login'
            })
        }

        const hashedPass = await hashPass(password);
        // , verified: false 
        const user = await new userModel({ name, email, password: hashedPass, phone, address}).save();
        // user.then((result) => {
        //     //handle verification
        //     sendVerificationEmail(result, res);
        // })

        res.status(201).send({
            success: true,
            message: 'User Registered Succesfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "email not registered"
            });
        };

        const matchPass = await comparePass(password, user.password);
        if (!matchPass) {
            return res.status(500).send({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
};

export const testController = async (req, res) => {
    res.send('protected route');
};
