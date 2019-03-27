import Joi from 'joi';

const RequesterValidation = {
  /**
   * contribution validation
   * @author mutombo jean-vincent
   * @param req request
   * @param res response
   * @param next next
   */
  create(req, res, next) {
    const schema = {
      amount: Joi.number()
        .min(100)
        .max(1000000)
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
export default RequesterValidation;
