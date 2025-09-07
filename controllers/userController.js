const userModel =require('../models/userModel');
const jwt =require('jsonwebtoken');
const bcrypt= require("bcrypt");

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
    console.log('/user/delete');
    
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
        if (deleted.resault=="deleted")
            return res.status(201).json({message:"ACC_DELETED"});
    }catch(err){       
        console.log(err);
        return res.status(500).json({message:"SERVER_ERROR",data:{err:err}})    
    };
};

exports.update = async(req,res)=>{
    console.log('/user/update');
    
    try{
        const {fullName=null, phoneNumber=null, whatsappNumber=null, email=null, userName=null, password=null}=req.body;
        // console.log({fullName, phoneNumber, whatsappNumber, email, userName, password});
        
        const user_id = getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        }
        let hashed =null
        if (password){
            hashed =await bcrypt.hash(password,10);
        }
        // console.log(whatsappNumber);
        
        let user = await userModel.update({user_id:user_id,full_name:fullName,phone_number:phoneNumber, whatsapp_number: whatsappNumber, email: email, user_name: userName, password: hashed})
        
        if(user.resault=='email'){
            return res.status(400).json({message:"EMAIL_EXIST"});
        }
        if(user.resault=='user_name'){
            return res.status(400).json({message:"USERNAME_EXISTS"});
        }
        if(user.resault=='phone_number'){
            return res.status(400).json({message:"PHONE_EXISTS"});
        }
        if(user.resault=='user_id'){
            return res.status(400).json({message:"NO_USER"});
        }
        
        delete user.password;
        delete user.otp_code;
        delete user.otp_expires_at;
        const token =jwt.sign({id:user.user_id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN || '1d'})
        return res.status(201).json({message:"ACC_UPDATED",data:{user:user,token:token}})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"SERVERE_ERROR"});
    };
};

exports.profile = async(req,res)=>{
    console.log('/user/profile');
    try{
        const {user_name} =req.body
        const user_id = getUserIdFromToken(req);
        let user;
        if (user_name){
            user = await userModel.profileUserName({user_name:user_name})
        }
        else if (user_id){
            user = await userModel.profileId({user_id:user_id});
        }else{
            return res.status(401).json({message:"UNAUTHORIZED"});
        }
        if(user.resault=="user_id"){
            return res.status(404).json({message:"NO_USER"});
        }
        if(user.resault=="user_name"){
            return res.status(404).json({message:"NO_USER"});
        }
        
        delete user.password;
        delete user.otp_code;
        delete user.otp_expires_at;
        return res.status(200).json({message:"USER_PROFILE",data:{user:user}});
    }catch(err){};
};