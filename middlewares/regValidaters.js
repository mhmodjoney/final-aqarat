// middlewares/authValidator.js
const Joi = require('joi');

// Registration validation schema
const registrationSchema = Joi.object({
  // Required fields
  
  userName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      'string.pattern.base': 'USERNAME_PATTERN',
      'string.min': 'USERNAME_MIN',
      'string.max': 'USERNAME_MAX',
      'any.required': 'USERNAME_REQUIRED'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'PASSWORD_MIN',
      'any.required': 'PASSWORD_REQUIRED'
    }),

  phoneNum: Joi.string()
    .pattern(/^09\d{8}$/)
    .required()
    .messages({
      'string.pattern.base': 'PHONE_PATTERN',
      'any.required': 'PHONE_REQUIRED'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'EMAIL_INVALID',
      'any.required': 'EMAIL_REQUIRED'
    }),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'any.required': 'LOGIN_EMAIL_REQUIRED'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'PASSWORD_REQUIRED'
    })
});

// Verify OTP schema NEED EDITSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
const verifyOtpSchema = Joi.object({
  otp_code: Joi.string().pattern(/^\d{6}$/).required().messages({
    'string.pattern.base': 'OTP_PATTERN',
    'any.required': 'OTP_REQUIRED'
  })
});

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

module.exports = {
  registrationSchema,
  loginSchema,
  verifyOtpSchema,
  validateRequest
};
