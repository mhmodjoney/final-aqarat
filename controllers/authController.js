const authModel =require('../models/authModel');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt');

exports.create = async(req,res )=>{
    try{
        const {fullName,userName,password,phoneNum,whatsappNum,email,type}=req.body;
        // console.log({fullName,userName,password,phoneNum,whatsappNum,email,type});
        const hashed =await bcrypt.hash(password,10);
        const user=await authModel.create({email:email,password:hashed,user_name:userName,full_name:fullName,phone_number:phoneNum,whatsapp_number:whatsappNum,type:type,createdBy:userName});
        // console.log(user.resault);
        if(user.resault=='email'){
            return res.status(400).json({message:"email is alrady used try login"});
        }else if(user.resault=='user_name'){
            return res.status(400).json({message:"user name is alrady used try login"});
        }else if(user.resault=='phone_number'){
            return res.status(400).json({message:"phone number is alrady used try login"});
        }else if(Number.isInteger(user.resault)){
            // console.log(Number.isInteger(user.resault))
            const token =jwt.sign({userId:user.resault},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRESIN || '1d' });
            return res.status(201).json({message:'user created and loged in',token:token})
        }else{
            return res.status(500).json({message:"Server Error",err:err})    
        }
    }catch(err){
        return res.status(500).json({message:"Server Error",err:err})
    }

};

exports.login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const hashed=await bcrypt.hash(password,10);
        // console.log(email);
        // console.log(hashed);
        const user= await authModel.login({email:email})
        // console.log(user);

        if(!user)
        {
            // console.log("!user.resault")
            return res.status(401).json({message:"Invalid username or password"});    
        }
        const isMach = await bcrypt.compare(password,user.password);
        if(!isMach)
        {
            // console.log("!isMach")
            return res.status(401).json({message:"Invalid username or password"});        
        }
        const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
        return res.status(200).json({message:"Login successful",token:token})
    
    } catch(err){
        res.status(500).json({err:"server error",errMessage:err})
    };
};

exports.logout = async (req, res) => {
    return res.status(200).json({ message: "Logged out successfully. Please remove the token on the client side." });
};