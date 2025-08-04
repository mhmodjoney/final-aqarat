const realEstateModel = require('../models/realEstateModel');
const jwt=require('jsonwebtoken');

function getUserIdFromToken(req) {
  // 1. Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;

  // 2. Remove "Bearer " if present
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // 3. Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Return the userId from the payload
    return decoded.userId;
  } catch (err) {
    // Token is invalid or expired
    return null;
  }
};

exports.create = async (req,res)=>{
  try{
    const {title,description,price,currency,city,region,type,purpose}=req.body;
    const authed = await getUserIdFromToken(req);
    if(!authed)
      return req.status(401).json({message:'unauthorized'});

    const resault=await realEstateModel.create({estateData:{title,description,price,currency,city,region,type,purpose},owner:authed});
    return res.status(201).json({message:'estate created successfully'});
  
  }catch(err){
    return res.status(500).json({message:'server error',err:err});
  };
};



exports.getAllRealEstate = async (req, res) => {
  try {
    const filters = req.body; 
    const results = await realEstateModel.getRealEstate(filters);

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
  
};
