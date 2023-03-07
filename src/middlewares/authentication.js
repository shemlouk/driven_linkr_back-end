import repository from "../repositories/SessionsRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const KEY = process.env.SECRET_KEY;

const authentication = async (req, res, next) => {
  const token = req.header("authorization")?.replace(/(Bearer )/g, "");
  try {
    const { id } = jwt.verify(token, KEY);
    const { rows, rowCount } = await repository.getById(id);
    if (!rowCount) return res.sendStatus(401);
    res.locals.session = rows[0];
    next();
  } catch ({ name, message }) {
    console.error(message);
    if (name === "JsonWebTokenError") return res.status(401).json(message);
    res.status(500).json(message);
  }
};

export default authentication;
