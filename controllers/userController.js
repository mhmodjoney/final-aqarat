const userModel =require('../models/userModel');
const jwt =require('jsonwebtoken');

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
        console.log(err);
      return null;
    }
};

exports.delete = async(req,res)=>{
    console.log('delete acc');
    
    try{
        const user_id=getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        }
        
        const deleted = await userModel.delete({user_id:user_id});
        // console.log(user_id);
        if(deleted.resault=="user_id"){
            return res.status(401).json({message:'NO_USER'});
        }
        return res.status(201).json({message:"ACC_DELETED"});
    }catch(err){       
        console.log(err);
        return res.status(500).json({message:"SERVER_ERROR",data:{err:err}})    
    };
};

exports.update = async(req,res)=>{
    try{
        const {full_name, phone_number, whatsapp_number, email, user_name, password}=req.body;
        const user_id = getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        }
        let user = await userModel.update({user_id:user_id,full_name:full_name,phone_number:phone_number, whatsapp_number: whatsapp_number, email: email, user_name: user_name, password: password})
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
        return res.status(201).json({message:"ACC_UPDATED",data:{user:user}})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"message"});
    };
};

exports.profile = async(req,res)=>{
    try{
        const user_id = getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        }
        let user = await userModel.profile({user_id:user_id});
        if(user.resault=="user_id"){
            return res.status(404).json({message:"NO_USER"});
        }
        delete user.password;
        delete user.otp_code;
        delete user.otp_expires_at;
        return res.status(200).json({message:"USER_PROFILE",data:{user:user}});
    }catch(err){};
};