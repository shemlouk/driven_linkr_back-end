import SessionsRepository from "../repositories/SessionsRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const EXPIRATION = { expiresIn: 60 * 60 * 24 }; // 1 day
const KEY = process.env.JWT_SECRET;

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    try {
      const { rows, rowCount } = await UsersRepository.getByEmail(email);
      if (!rowCount) return res.sendStatus(404);

      const { id, username, hashedPassword, profilePicture } = rows[0];
      if (!bcrypt.compareSync(password, hashedPassword))
        return res.sendStatus(401);

      const sessionId = (await SessionsRepository.create(id)).rows[0];
      const token = jwt.sign(sessionId, KEY, EXPIRATION);

      res.send({ token, username, profilePicture });
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }
  async delete(req, res) {
    const { id } = res.locals.session;
    try {
      await SessionsRepository.deleteById(id);
      res.sendStatus(204);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }
}

export default new SessionsController();
