const realEstateModel = require('../models/realEstateModel');
const jwt=require('jsonwebtoken');

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

exports.create = async (req, res) => {
  console.log('/realestate/create');
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

    if(!user_id)
      return res.status(401).json({message:'UNAUTHORIZED'});

    const result = await realEstateModel.create({
      title,
      description,
      price,
      currency,
      city,
      address,
      type,
      rooms_number,
      baths_number,
      purpose,
      size,
      user_id,
      furnished
    });
    // console.log(result);
    
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
  console.log('/realestate/search');
  try {
    
    const filters = req.body;
    // console.log(filters);
    const results1 = await realEstateModel.getRealEstate(filters);
    // console.log(results1[1][0]);
    
    let results=results1[0];
    let realEstates = results || [];
    let responseData = { rows_count: realEstates.length };
    realEstates.forEach((row, index) => {
      responseData[index] = row;
    });
    // responseData={responseData,total:results.total}
    let data=responseData;
    data.total=results1[1][0].total
    // console.log(data);
    return res.status(200).json({ message: 'SEARCH_RESULTS', data});
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.delete = async (req, res) => {
  console.log('/realestate/delete');  
  try {
    const { real_estate_id } = req.body;
    const user_id = getUserIdFromToken(req);
    
    if (!user_id)
      return res.status(401).json({ message: 'UNAUTHORIZED' });

    const result = await realEstateModel.delete({ user_id, real_estate_id });
    
    if (result.resault === "banned_acc") {
      return res.status(401).json({ message: 'ACCOUNT_BANNED' });
    } else if (result.resault === "inactivated") {
      return res.status(401).json({ message: 'ACCOUNT_INACTIVATED' });
    } else if (result.resault === "deleted_acc") {
      return res.status(401).json({ message: 'ACCOUNT_DELETED' });
    } else if (result.resault === "not_owner") {
      return res.status(401).json({ message: 'NOT_OWNER' });
    } else if (result.resault === "not_found" ) {
      return res.status(200).json({ message: 'NOT_FOUND' });
    } else if  (result.resault == "cant_delete"){
      return res.status(401).json({ message: 'CANT_DELETE' });
    } else if  (result.resault == "deleted"){
      return res.status(200).json({ message: 'ESTATE_DELETED' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.myestate = async (req, res) => {
  console.log('/realestate/mystate');
  
  try {
    const user_id = getUserIdFromToken(req);
    if (!user_id)
      return res.status(401).json({ message: 'UNAUTHORIZED' });
    
    const results1 = await realEstateModel.getByOwner(user_id);
    let results=results1[0];
    let realEstates = results || [];
    let responseData = { rows_count: realEstates.length };
    
    realEstates.forEach((row, index) => {
      responseData[index] = row;
    });
    // console.log(results);
    return res.status(200).json({ message: 'MY_ESTATES', data: responseData });
  
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};

exports.update = async (req, res) => {
  console.log('/realestate/update');
  
  try {
    const {
      real_estate_id=null,
      title=null,
      description=null,
      price=null,
      currency=null,
      city=null,
      address=null,
      longitude=null,
      latitude=null,
      type=null,
      rooms_number=null,
      baths_number=null,
      purpose=null,
      object=null,
      state=null,
      created_by=null,
      size=null,
      furnished=null
    } = req.body;
    const user_id = getUserIdFromToken(req);
    
    if (!user_id)
      return res.status(401).json({ message: 'UNAUTHORIZED' });
    // console.log(user_id);

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
    } else if (result.resault === "not_found" ) {
      return res.status(200).json({ message: 'NOT_FOUND' });
    } else {
      return res.status(200).json({ message: 'ESTATE_UPDATED', data: result });
    }
  } catch (err) {
    return res.status(500).json({ message: 'SERVER_ERROR', err: err.message });
  }
};