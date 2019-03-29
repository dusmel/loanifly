import Joi from "joi";

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
        .required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, "")
      });
    }
    next();
  },

  /**
   * get a specific loan request by Id
   *
   * @author mutombo jean-vincent
   * @param req request
   * @param res response
   * @param next next
   * @returns
   */
  getOne(req, res, next) {
    const schema = {
      id: Joi.number().required()
    };
    const result = Joi.validate(req.params, schema);

    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, "")
      });
    }
    next();
  },
  /**
   *
   * @author Grace lungu
   * @param req request
   * @param res response
   * @param next next
   * @returns
   */
  validateUpdateLoan(req, res, next) {
    const schema = {
      amount: Joi.number().required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, "")
      });
    }
    next();
  }
};
export default RequesterValidation;
