import Joi from "joi";

const contributionsValidations = {
  validateContribute(req, res, next) {
    const schema = {
      amount: Joi.number()
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

export default contributionsValidations;
