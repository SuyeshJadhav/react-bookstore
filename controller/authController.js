import userModel from "../models/userModel.js";
import { comparePass, hashPass } from "../utils/authUtil.js";
import Jwt from "jsonwebtoken";

export const registerController = async(req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        if(!name){
            return res.send({error: 'Name is required.'})
        }
        if(!email){
            return res.send({error: 'email is required.'})
        }
        if(!password){
            return res.send({error: 'password is required.'})
        }
        if(!phone){
            return res.send({error: 'phone is required.'})
        }
        if(!address){
            return res.send({error: 'address is required.'})
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'Already Registered please Login'
            })
        }

        const hashedPass = await hashPass(password);

        const user = await new userModel({name,email,password: hashedPass,phone,address}).save();

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

export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(500).send({
                success: false,
                message: "email not registered"
            });
        };

        const match = await comparePass(password,user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user:{
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

export const testController = async(req, res) => {
    res.send('protected route');
};
