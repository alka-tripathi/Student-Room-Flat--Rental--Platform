const Joi = require('joi');

const roomSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 5 characters',
  }),

  location: Joi.string().required().messages({
    'string.empty': 'Location is required',
  }),

  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be greater than 0',
  }),

  description: Joi.string().allow(''),

  contactNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Enter valid 10-digit number',
      'string.empty': 'Contact number is required',
    }),
});

//now using the middleware function that uses this schema
const newRoomValidate = (req, res, next) => {
  const { error } = roomSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next(); // ✅ move to controller
};

module.exports = newRoomValidate;
