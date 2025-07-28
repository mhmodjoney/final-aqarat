const userModel =require('../models/userModel');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt');

exports.create = async(req,res )=>{
    const {fullName,userName,password,phoneNum,whatsappNum,email,type}=req.body;
    console.log({fullName,userName,password,phoneNum,whatsappNum,email,type});
    const hashed =await bcrypt.hash(password,10);

    try{
        const emailUsed=await userModel.getUserByEmail({email:email});
        if(emailUsed)
            return res.status(400).json({message:"email already used"})
        
        const userUsed=await userModel.getUserByUsername({user_name:userName})
        if(userUsed)
            return res.status(400).json({message:"username already used"})
        console.log(emailUsed);
        console.log(userUsed);

    }catch(err){
        return res.status(500).json({message:"Server Error",err:err})
    }

    try{
        const user=await userModel.create({email:email,password:hashed,user_name:userName,full_name:fullName,phone_number:phoneNum,whatsapp_number:whatsappNum,type:type,createdBy:userName});
        const token =jwt.sign({userId:user.user_id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRESIN || '1d' });
        res.status(201).json({message:'user created and loged in',token:token})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error',errMessage:err });
    }
};

exports.login = async (req,res)=>{
    try{
        const {email,passwd}=req.body;
        const user= await userModel.getUserByEmail({email:email})
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        };
// this line is crashing heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer

        const match =await bcrypt.compare(passwd,user.password);
        console.log(user);
        if(!match){
            return res.status(401).json({message:"Invalid email or password"});
        };
        const token =jwt.sign({userId:user.userId},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
        res.json({message:"Login successful",token:token})
    } catch(err){
        res.status(500).json({err:"server error",errMessage:err})
    };
};

exports.logout = async (req, res) => {

    return res.status(200).json({ message: "Logged out successfully. Please remove the token on the client side." });
}