const favModel=require("../models/favModel");
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

exports.add= async (req,res)=> {
    try{
        const {estate_d}=req.body;
        const user_id = getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});
        }
        let fav= await favModel.add({user_id:user_id,estate_id:estate_d})
        if (fav.resault=="done"){
            delete fav.resault;
            return res.status(201).json({message:"FAV_ADDED",data:{fav:fav}})
        }
        return res.status(500).json({message:"DATA_ERROR",data:{err:err}})

    }catch(err){
        return res.status(500).json({message:"SERVER_ERROR",data:{err:err}})
    };

};
exports.list= async (req,res)=> {
    try{
        const user_id =getUserIdFromToken(req);
        if(!user_id){
            return res.status(401).json({message:'UNAUTHORIZED'});    
        }
        const favList=await favModel.list({user_id:user_id});
        
    }catch(err){
        return res.status(500).json({message:'SERVER_ERROR',data:{err:err}})
    };

};
exports.remove= async (req,res)=> {
    

};
