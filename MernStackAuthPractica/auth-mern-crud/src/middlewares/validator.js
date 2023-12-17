const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(200).json({
      status: "error",
      errors: error.errors.map((e) => e.message),
    });
  }
};

export default validateSchema;
