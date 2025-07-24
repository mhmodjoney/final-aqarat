const userModel =require('../models/userModel');
const jwt =require('jsonwebtoken')
const crypt=require('bcrypt')

exports.create = async(req,res )=>{
    try{
        const {fullName,userName,passwd,phoneNum,whatsappNum,email,type,createdBy="user" }=req.body;
        const hashed =await crypt.hash(passwd,10);
        const user=await userModel.create({email,passwd:hashed,userName,fullName,phoneNum,whatsappNum,type,createdBy});
        const token =jwt.sign({userId:user.userId},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRESIN || '1d' });
        res.status(201).json({message:'user created and loged in'},token)
    }

};