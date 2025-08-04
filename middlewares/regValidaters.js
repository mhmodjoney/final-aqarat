
const Joi = require('joi');

const registrationSchema = Joi.object({
  // Required fields
  
  userName: Joi.string()
  .min(3)
  .max(50)
  .pattern(/^[a-zA-Z0-9_]+$/)
  .required()
  .messages({
      'string.pattern.base': 'Username must contain only letters, numbers, and underscores',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must be less than 50 characters',
      'any.required': 'Username is required'
    }),
    
    password: Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    }),
    
    phoneNum: Joi.string()
    .pattern(/^09\d{8}$/)
    .length(10)
    .required()
    .messages({
        'string.pattern.base': 'Phone number must start with 09 and be 10 digits',
        'string.length': 'Phone number must be exactly 10 digits',
        'any.required': 'Phone number is required'
    }),
    
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),
    
    type: Joi.string()
    .valid('user', 'admin', 'agent')
    .required()
    .messages({
        'any.only': 'Type must be user, admin, or agent',
        'any.required': 'Type is required'
    }),
    
    // Optional field
    fullName: Joi.string()
      .min(3)
      .max(100)
      .optional()
      .messages({
        'string.min': 'Full name must be at least 3 characters',
        'string.max': 'Full name must be less than 100 characters',
        'any.required': 'Full name is required'
      }), 
    whatsappNum: Joi.string()
    .pattern(/^09\d{8}$/)
    .length(10)
    .optional()
    .messages({
        'string.pattern.base': 'WhatsApp number must start with 09 and be 10 digits',
        'string.length': 'WhatsApp number must be exactly 10 digits'
    })
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid ,username or phone number',
      'any.required': 'Email ,username or phone number is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

module.exports = {
  registrationSchema,
  loginSchema
};
