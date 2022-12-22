import { wrongSchemaError } from "../utils/errorUtils.js";

export function schemaValidate(schema) {
  return (req, res, next) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) throw wrongSchemaError(error.details[0].message);
    next();
  };
}
