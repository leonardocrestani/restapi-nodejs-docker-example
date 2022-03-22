const Joi = require('joi');
const gender = require('../../enums/genderEnum');
const pattern = /^(?!\s*$).+/

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.number(),
      full_name: Joi.string().pattern(pattern).min(4).required(),
      gender: Joi.string().valid(...gender).required(),
      birth_date: Joi.date().required(),
      city: Joi.string().pattern(pattern).min(3).required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error
    return next();
  } 
  catch(erro) {
    return res.status(400).json({
      message: erro.message
  })}
}