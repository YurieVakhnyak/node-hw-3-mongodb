const Joi = require("joi");

module.exports = {
  addContactValidation: async (req, res, next) => {
    const input = req.body;
    try {
      const schema = Joi.object({
        name: Joi.string()
          .min(2)
          .max(50)
          .regex(/^[a-zA-Z\s\d]+$/)
          .required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
          .pattern(/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)
          .required(),
        favorite: Joi.boolean().optional(),
      });
      await schema.validateAsync(input);
      next();
    } catch (error) {
      return res.status(400).json({ status: error.details });
    }
  },
  patchContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string().alphanum().min(10).max(400).optional(),
    });

    validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
