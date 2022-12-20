export function schemaValidate(schema) {
  return (req, res, next) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) return res.sendStatus(422);
    next();
  };
}
