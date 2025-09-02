const authModel =require('../models/authModel');
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt');
const {sendOtpEmail}=require('../utils/mailer');

function getUserIdFromToken(req) {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    
    // 2. Remove "Bearer " if present
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    try {
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (err) {
      return null;
    }
};

exports.create = async(req,res )=>{
    console.log('create');
    try{
        const {userName,password,phoneNum,email}=req.body;
        // console.log({fullName,userName,password,phoneNum,whatsappNum,email,type});
        const hashed =await bcrypt.hash(password,10);
        let user=await authModel.create({email:email,password:hashed,user_name:userName,phone_number:phoneNum});
        // console.log(user.resault);
        if(user.resault=='email'){
            return res.status(400).json({message:"EMAIL_EXIST"});
        }
        if(user.resault=='user_name'){
            return res.status(400).json({message:"USERNAME_EXISTS"});
        }
        if(user.resault=='phone_number'){
            return res.status(400).json({message:"PHONE_EXISTS"});
        }
        
        delete user.password;
        delete user.otp_code;
        delete user.otp_expires_at;
        const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
        return res.status(201).json({message:'ACC_CREATED',data:{user:user,token:token}});
        
    }catch(err){
        return res.status(500).json({message:"SERVER_ERROR",data:{err:err}})    
    };

};

exports.login = async (req,res)=>{
    console.log('login');
    try{
        const {email,password}=req.body;
        let user= await authModel.login({email:email})
        
        if(user.resault=="email"){
            return res.status(401).json({message:"INCORRECT_DATA"});    
        }
        const isMach = await bcrypt.compare(password,user.password);
        if(!isMach){
            return res.status(401).json({message:"INCORRECT_DATA"});        
        }
        else if (user.state=="deleted"){
            return res.status(401).json({message:"DELETED_ACC"});
        }
        else if(user.state=="banned"){
            return res.status(401).json({message:"BANNED_ACC"});
        }
        else if (user.state=="activated"||user.state=="inactivated"){
            delete user.password;
            delete user.otp_code;
            delete user.otp_expires_at;
            const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
            return res.status(200).json({message:"LOGED_IN",data:{user:user,token:token}});
        }
        else{
            return res.status(201).json({message:"ACC_ERROR"});
        }
    } catch(err){
        return res.status(500).json({err:"SERVER_ERROR",data:{errMessage:err}})
    };
};

exports.logout = async (req, res) => {
    // console.log(req.body);
    console.log('logout');

    return res.status(200).json({ message: "LOGED_OUT" });
};

exports.otpVerification = async(req,res)=>{
    console.log('verify');
    
    try{
        const {otpCode}=req.body;
        const user_id=getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        };
        let user= await authModel.verifyOtpById({user_id:user_id,otp_code:otpCode});
        if(user.resault=="user_id"){
            return res.status(404).json({message:'NO_USER'});
        }
        if(user.resault=="wrong"){
            return res.status(401).json({message:'INCORRECT_OTP'});
        }
        if(user.resault=="expired"){
            return res.status(400).json({message:'EXPIRED_OTP'});
        }
        if(user.resault=="already_act"){
            return res.status(400).json({message:'ALREADY_ACT'});
        }
        delete user.password;
        delete user.otp_code;
        delete user.otp_expires_at;
        const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})

        return res.status(201).json({message:'ACTIVATED_ACC',data:{user:user,token:token}});

    }catch(err){
        return res.status(500).json({message:'SERVER_ERROR',data:{err:err}});
    }
};

exports.setOtp = async(req,res)=>{
    console.log('set OTP');
    try{
        const{otpCode}=req.body;
        const user_id=getUserIdFromToken(req);
        // console.log(user_id);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        }
        const isSet = await authModel.setOtp({user_id:user_id,otp_code:otpCode});
        if(isSet.resault=="user_id"){
            return res.status(401).json({message:'NO_USER'});
        }
        if(isSet.email){
            try {
                await sendOtpEmail({ to: isSet.email, otpCode: otpCode });
            } catch (emailErr) {
                console.error('Email send failed:', emailErr);
                // Continue with verification even if email fails
            }
            return res.status(201).json({message:'OTP_SET'});
        }
        return res.status(500).json({message:'SERVER_ERROR'});

    }catch(err){
        return res.status(500).json({message:'SERVER_ERROR'});

    };

};