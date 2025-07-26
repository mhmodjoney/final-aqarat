const userModel =require('../models/userModel');
const jwt =require('jsonwebtoken')
const crypt=require('bcrypt');
const { json } = require('express');
exports.create = async(req,res )=>{
    try{
        const {fullName,userName,passwd,phoneNum,whatsappNum,email,type,createdBy="user" }=req.body;
        const hashed =await crypt.hash(passwd,10);
        const user=await userModel.create({email,passwd:hashed,userName,fullName,phoneNum,whatsappNum,type,createdBy});
        const token =jwt.sign({userId:user.userId},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRESIN || '1d' });
        res.status(201).json({message:'user created and loged in'},token)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

};

exports.login = async (req,res)=>{
    try{
        const {email,passwd}=req.body;
        const user= await userModel.getUserByEmail(email)
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        };
        const match =await crypt.compare(passwd,user.password);
        if(!match){
            return res.status(401).json({message:"Invalid email or password"});
        };
        const token =jwt.sign({userId:user.userId},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
        res.json({message:"Login successful",token})
    } catch(err){
        res.status(500).json({err:"server error",detail:err.message})
    };
};