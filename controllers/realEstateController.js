const realEstateModel = require('../models/realEstateModel');

exports.getAllRealEstate = async (req, res) => {
  try {
    const filters = req.body;  // optional JSON body
    const results = await realEstateModel.getRealEstate(filters);
    // console.log(filters)
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
  // console.log(res.body)
};
