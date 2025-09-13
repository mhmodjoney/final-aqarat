const { cloudinary_js_config } = require('../config/cloudecfg');
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
    return decoded.id;
  } catch (err) {
    return null;
  }
};

exports.create = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      currency,
      city,
      address,
      longitude,
      latitude,
      type,
      rooms_number,
      baths_number,
      purpose,
      object,
      size,
      furnished
    } = req.body;
    
    const user_id = await getUserIdFromToken(req);
    

    
    const result = await realEstateModel.create({
      title,
      description,
      price,
      currency,
      city,
      address,
      longitude,
      latitude,
      type,
      rooms_number,
      baths_number,
      purpose,
      object,
      size,
      user_id,
      furnished
    });

    if(result.resault=='user_id'){
      return res.status(400).json({message:"NO_USER"});
    }
    if (result.resault === "banned_acc") {
      return res.status(401).json({ message: 'ACCOUNT_BANNED' });
    } else if (result.resault === "inactivated") {
      return res.status(401).json({ message: 'ACCOUNT_INACTIVATED' });
    } else if (result.resault === "deleted_acc") {
      return res.status(401).json({ message: 'ACCOUNT_DELETED' });
    } else {
      return res.status(201).json({ message: 'ESTATE_CREATED', data: result });
    }
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.searchRealEstate = async (req, res) => {
  try {
    const filters = req.body;
    const results = await realEstateModel.getRealEstate(filters);
    return res.status(200).json({ message: 'SEARCH_RESULTS', data: results });
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { real_estate_id } = req.body;
    const user_id = getUserIdFromToken(req);
    

    const result = await realEstateModel.delete({ user_id, real_estate_id });
    console.log('Delete result:', result); // Debugging line
    
    
    if(result.resault=='user_id'){
      return res.status(400).json({message:"NO_USER"});
    } else if (result.resault === "banned_acc") {
      return res.status(401).json({ message: 'ACCOUNT_BANNED' });
    } else if (result.resault === "inactivated") {
      return res.status(401).json({ message: 'ACCOUNT_INACTIVATED' });
    } else if (result.resault === "deleted_acc") {
      return res.status(401).json({ message: 'ACCOUNT_DELETED' });
    } else if (result.resault === "not_owner") {
      return res.status(401).json({ message: 'NOT_OWNER' });
    } else if (result.resault === "not_found"){
      return res.status(404).json({ message: 'NO_ESTATE'});
   
    } else {
      return res.status(200).json({ message: 'ESTATE_DELETED', data: result });
    }
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.myestate = async (req, res) => {
  try {
    console.log(req);
    
    const user_id = getUserIdFromToken(req);
    
    const results = await realEstateModel.getByOwner(user_id);
    if(results.resault=='user_id'){
      return res.status(400).json({message:"NO_USER"});
    }
    return res.status(200).json({ message: 'MY_ESTATES', data: results });
    
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      real_estate_id,
      title,
      description,
      price,
      currency,
      city,
      address,
      longitude,
      latitude,
      type,
      rooms_number,
      baths_number,
      purpose,
      object,
      state,
      created_by,
      size,
      furnished
    } = req.body;
    
    const user_id = getUserIdFromToken(req);

    const result = await realEstateModel.update({
      real_estate_id,
      title,
      description,
      price,
      currency,
      city,
      address,
      longitude,
      latitude,
      type,
      rooms_number,
      baths_number,
      purpose,
      object,
      state,
      created_by,
      size,
      user_id,
      furnished
    });

    if (result.resault === "banned_acc") {
      return res.status(401).json({ message: 'ACCOUNT_BANNED' });
    } else if (result.resault === "inactivated") {
      return res.status(401).json({ message: 'ACCOUNT_INACTIVATED' });
    } else if (result.resault === "deleted_acc") {
      return res.status(401).json({ message: 'ACCOUNT_DELETED' });
    } else if (result.resault === "not_owner") {
      return res.status(401).json({ message: 'NOT_OWNER' });
    } else {
      return res.status(200).json({ message: 'ESTATE_UPDATED', data: result });
    }
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};