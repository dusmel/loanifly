import Joi from 'joi';

const UserValidation = {
  signup(req, res, next) {
    const isAndelan = req.body.email.split('@')[1].split('.')[0] === 'andela';
    if (!isAndelan) {
      return res.status(400).json({
        status: 400,
        message: 'You have to be an andelan',
      });
    }
    const schema = {
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .required(),
      role: Joi.number()
        .required()
        .valid([0, 1, 2]),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    }
    next();
  },
  signin(req, res, next) {
    const schema = {
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    }
    next();
  },
};
export default UserValidation;
