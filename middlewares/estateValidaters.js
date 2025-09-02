// middlewares/estateValidaters.js
const Joi = require('joi');

// Reusable validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    if (error) {
      const errorMessage = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));
      return res.status(400).json({
        message: 'VALIDATION_FAILED',
        errors: errorMessage
      });
    }
    req.body = value;
    next();
  };
};

// Create estate schema
const createEstateSchema = Joi.object({
  title: Joi.string().min(3).max(150).required().messages({
    'string.min': 'TITLE_MIN',
    'string.max': 'TITLE_MAX',
    'any.required': 'TITLE_REQUIRED'
  }),
  description: Joi.string().allow('').optional(),
  price: Joi.number().min(0).precision(2).optional().messages({
    'number.base': 'PRICE_INVALID'
  }),
  currency: Joi.string().max(10).required(),
  city: Joi.string().max(100).required(),
  address: Joi.string().max(255).required(),
  type: Joi.string().max(50).required(),
  rooms_number: Joi.number().integer().min(1).required(),
  baths_number: Joi.number().integer().min(1).required(),
  purpose: Joi.string().max(50).required(),
  size: Joi.number().integer().required(),
  furnished: Joi.boolean().required()
});

// Update estate schema
const updateEstateSchema = Joi.object({
  real_estate_id: Joi.number().integer().required().messages({
    'any.required': 'REAL_ESTATE_ID_REQUIRED'
  }),
  title: Joi.string().min(3).max(150).optional(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().min(0).precision(2).optional(),
  currency: Joi.string().max(10).optional(),
  city: Joi.string().max(100).optional(),
  address: Joi.string().max(255).optional(),
  longitude: Joi.number().optional(),
  latitude: Joi.number().optional(),
  type: Joi.string().max(50).optional(),
  rooms_number: Joi.number().integer().min(0).optional(),
  baths_number: Joi.number().integer().min(0).optional(),
  purpose: Joi.string().max(50).optional(),
  object: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
  state: Joi.string().max(50).optional(),
  created_by: Joi.string().max(50).optional(),
  size: Joi.number().integer().min(0).optional(),
  furnished: Joi.boolean().optional()
});

// Delete estate schema
const deleteEstateSchema = Joi.object({
  real_estate_id: Joi.number().integer().required().messages({
    'any.required': 'REAL_ESTATE_ID_REQUIRED'
  })
});

// Search estate schema
const searchEstateSchema = Joi.object({
  real_estate_id: Joi.number().integer().optional(),
  min_price: Joi.number().min(0).precision(2).optional(),
  max_price: Joi.number().min(0).precision(2).optional(),
  currency: Joi.string().max(10).optional(),
  city: Joi.string().max(100).optional(),
  address: Joi.string().max(255).optional(),
  type: Joi.string().max(50).optional(),
  rooms_number: Joi.number().integer().min(0).optional(),
  baths_number: Joi.number().integer().min(0).optional(),
  purpose: Joi.string().max(50).optional(),
  state: Joi.string().max(50).optional(),
  created_by: Joi.string().max(50).optional(),
  size: Joi.number().integer().min(0).optional(),
  user_id: Joi.number().integer().optional(),
  furnished: Joi.boolean().optional(),
  sort_by: Joi.string().valid('price', 'size').optional(),
  page: Joi.number().integer().optional()

});

module.exports = {
  validateRequest,
  createEstateSchema,
  updateEstateSchema,
  deleteEstateSchema,
  searchEstateSchema
}; 