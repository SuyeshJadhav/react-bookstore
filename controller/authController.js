import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"
import { comparePass, hashPass } from "../utils/authUtil.js";
import Jwt from "jsonwebtoken";

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
        const user = await new userModel({ name, email, password: hashedPass, phone, address }).save();

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
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
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

//update profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length < 8) {
            return res.json({ error: 'Password is required and should be 8 character or more' })
        }
        const hasedPass = password ? await hashPass(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hasedPass || user.password,
            phone: phone || user.phone,
            address: address || user.address,
        }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while updating profile"
        })
    }
}

//orders controller
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
}

//orders controller
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: '-1' })
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Geting Orders",
            error,
        });
    }
}

//status update
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updating Status",
            error,
        });
    }
}