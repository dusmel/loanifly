import Joi from 'joi';

const loansValidatons = {
  validateRejectGrant(req, res, next) {
    const schema = {
      status: Joi.number()
        .required()
        .valid([1, 3]),
    };
    const result = Joi.validate(req.body, schema);
    const schemaParam = {
      id: Joi.number().required(),
    };
    const resultParam = Joi.validate(req.params, schemaParam);
    if (result.error || resultParam.error) {
      return res.status(400).json({
        status: 400,
        message: `${
          !result.error
            ? ''
            : result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
        } || ${
          !resultParam.error
            ? ''
            : resultParam.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
        }`,
      });
    }
    next();
  },
  validateParams(req, res, next) {
    const schema = {
      id: Joi.number().required(),
    };
    const result = Joi.validate(req.params, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    }
    next();
  },
};

export default loansValidatons;
