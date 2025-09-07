// middlewares/userValidaters.js
const Joi = require('joi');

// Update user validation schema
const updateSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[\u0600-\u06FFa-zA-Z\s-]+$/)
    .optional()
    .allow('', null).default(null)
    .messages({
      'string.pattern.base': 'FULLNAME_PATTERN',
      'string.min': 'FULLNAME_MIN',
      'string.max': 'FULLNAME_MAX',
    }),

  userName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .optional()
    .allow('', null).default(null)
    .messages({
      'string.pattern.base': 'USERNAME_PATTERN',
      'string.min': 'USERNAME_MIN',
      'string.max': 'USERNAME_MAX',
    }),

  password: Joi.string()
    .min(6)
    .optional()
    .allow('', null).default(null)
    .messages({
      'string.min': 'PASSWORD_MIN',
    }),

  phoneNumber: Joi.string()
    .pattern(/^09\d{8}$/)
    .optional()
    .allow('', null).default(null)
    .messages({
      'string.pattern.base': 'PHONE_PATTERN',
    }),

  email: Joi.string()
    .email()
    .optional()
    .allow('', null).default(null)
    .messages({
      'string.email': 'EMAIL_INVALID',
    }),

  whatsappNumber: Joi.string()
    .pattern(/^09\d{8}$/)
    .optional()
    .allow('', null).default(null)
    .messages({
      'string.pattern.base': 'WHATS_PATTERN',
    }),



});

// Delete user validation schema
// const deleteSchema = Joi.object({
//   userId: Joi.string()
//     .required()
//     .messages({
//       'any.required': 'USER_ID_REQUIRED'
//     })
// });

// Get user validation schema
// const getUserSchema = Joi.object({
//   userId: Joi.string()
//     .optional()
//     .messages({
//       'string.base': 'USER_ID_INVALID'
//     })
// });

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
  updateSchema,
  // deleteSchema,
  // getUserSchema,
  validateRequest
};