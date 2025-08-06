// middlewares/authValidator.js
const Joi = require('joi');

// Registration validation schema
const registrationSchema = Joi.object({
  // Required fields
  fullName: Joi.string()
    .min(3)
    .max(100)
    // if the full name is required or not 
    // .required()
    .messages({
      'string.min': 'يجب أن يكون الاسم الكامل 3 أحرف على الأقل',
      'string.max': 'يجب أن يكون الاسم الكامل أقل من 100 حرف',
      'any.required': 'الاسم الكامل مطلوب'
    }),

  userName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      'string.pattern.base': 'يجب أن يحتوي اسم المستخدم على أحرف وأرقام وشرطة سفلية فقط',
      'string.min': 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل',
      'string.max': 'يجب أن يكون اسم المستخدم أقل من 50 حرف',
      'any.required': 'اسم المستخدم مطلوب'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      'any.required': 'كلمة المرور مطلوبة'
    }),

  phoneNum: Joi.string()
    .pattern(/^09\d{8}$/)
    .required()
    .messages({
      'string.pattern.base': 'يجب أن يبدأ رقم الهاتف بـ 09 وأن يكون 10 أرقام بالضبط',
      'any.required': 'رقم الهاتف مطلوب'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'يرجى إدخال بريد إلكتروني صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),

  type: Joi.string()
    .valid('user', 'admin', 'agent')
    .required()
    .messages({
      'any.only': 'يجب أن يكون النوع مستخدم أو مدير أو وكيل',
      'any.required': 'النوع مطلوب'
    }),

  // Optional field
  whatsappNum: Joi.string()
    .pattern(/^09\d{8}$/)
    .optional()
    .messages({
      'string.pattern.base': 'يجب أن يبدأ رقم الواتساب بـ 09 وأن يكون 10 أرقام بالضبط'
    })
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'string.email': 'يرجى إدخال بريد إلكتروني صحيح',
      'any.required': 'البريد الإلكتروني أو اسم المستخدم أو رقم الهاتف مطلوب'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'كلمة المرور مطلوبة'
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
        message: 'فشل في التحقق من صحة البيانات',
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
  validateRequest
};
