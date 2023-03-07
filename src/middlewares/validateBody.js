import Schemas from "../schemas/index.js";

const validateBody = (req, res, next) => {
  const route = req.path.split("/")[1];
  const { error } = Schemas[route]().validate(req.body, { abortEarly: false });
  if (error) return res.status(422).send(error.details);
  next();
};

export default validateBody;
