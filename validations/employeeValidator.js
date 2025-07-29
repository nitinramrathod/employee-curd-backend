import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  department: Joi.string().min(2).required(),
  designation: Joi.string().min(2).required(),
  salary: Joi.number().positive().precision(2).required(),
  joining_date: Joi.date().required(),
  dob: Joi.date().less('now').required()
    .messages({
      'date.less': `"dob" must be a date before today`
    }),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  address: Joi.string().max(255).optional(),
}).unknown(true);