const realEstateModel = require('../models/realEstateModel');
const jwt=require('jsonwebtoken');

function getUserIdFromToken(req) {
  // 1. Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;

  // 2. Remove "Bearer " if present
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

exports.create = async (req,res)=>{
  try{
    const {title,description,price,currency,city,region,type,purpose}=req.body;
    const authed = await getUserIdFromToken(req);
    
    if(!authed)
      return req.status(401).json({message:'غير مصرح'});
//  this one is not created yet
    const resault=await realEstateModel.create({estateData:{title,description,price,currency,city,region,type,purpose},owner:authed});
    if(resault.notActiv){
      return res.status(401).json({message:'تم تقييد حسابك تواصل مع الدعم لتفعيله'});
    }else if(resault.noAccount){
      return res.status(401).json({message:'انشئ حساب لانشاء عقارات او قم بتسجيل الدخول مرة اخرى'});
    }else if(resault.created){
      return res.status(201).json({message:'تم إنشاء العقار بنجاح'});
    }else{
      return res.status(500).json({message:'خطأ في الخادم',err:err});
    };
  }catch(err){
    return res.status(500).json({message:'خطأ في الخادم',err:err});
  };

};


exports.searchRealEstate = async (req, res) => {
  try {
    const filters = req.body; 
    const results = await realEstateModel.getRealEstate(filters);
    return res.status(200).json({message:'نتائج البحث',data:{results}});
  } catch (err) {
    return res.status(500).json({ message: 'خطأ في الخادم',data:{err:err}});
  };
  
};

exports.delete = async (req,res)=>{
  try{
    const {real_estate_id}=req.body;
    const user_id=getUserIdFromToken(req);
    if(!user_id)
      return res.status(401).json({message:'غير مصرح'})
    const resault=realEstateModel.delete({user_id:user_id,real_estate_id:real_estate_id});
    if(resault.notActiv){
      return res.status(401).json({message:'تم تقييد حسابك تواصل مع الدعم لتفعيله'});
    }else if(resault.noAccount){
      return res.status(401).json({message:'انشئ حساب لانشاء عقارات او قم بتسجيل الدخول مرة اخرى'});
    }else if (resault.notOwnd){
      return res.status(401).json({message:'العقار ليس ملكك لتقوم بحذفه'});
    }else if(resault.deleted){
      return res.status(201).json({message:'تم حذف العقار بنجاح'});
    }else{
      return res.status(500).json({message:'خطأ في الخادم',err:err});
    };
  } catch (err) {
    return res.status(500).json({ message: 'خطأ في الخادم',data:{err:err} });
  };
};

exports.myestate= async (req,res)=>{
  return res.status(200).json({message:'روح من خلقتي'});
};

exports.update =async(req,res)=>{

};