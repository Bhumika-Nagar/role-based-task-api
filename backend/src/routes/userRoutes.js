import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerSchema , loginSchema } from "../validators/userValidator.js";
import { safeParse } from "zod";
const userRouter = express.Router();

const generateToken = (user) => {
return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
};

userRouter.post("/signup",async(req,res)=>{
    try{
    const {email, name, password, role} = req.body;

    const { success }= registerSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"incorrect inputs"
        });
    }

    const existingUser= await User.findOne({
        email
    });
    if(existingUser){
        return res.status(404).json({
            msg:"user already exists"
        });
    }

    const hashedPassowrd= await bcrypt.hash(password,10);
    const user= await User.create({
        email,
        name,
        password:hashedPassowrd,
        role
    });

    const userId = user._id;
    const token= generateToken(user);

    res.status(201).json({
        msg:"user created successfully",
        token
    })
    }catch (err) {
    res.status(500).json({ msg: err.message });
    }
});


userRouter.post("/signin", async (req, res) => {
    try{
    const { email, password } = req.body;

    const { success }= registerSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"incorrect inputs"
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "invalid credentials"
        });
    }

    const token = generateToken(user);

    res.json({
        message: "login successful",
        token
    });
    }catch (err) {
    res.status(500).json({ msg: err.message });
    }
});

export default userRouter;
