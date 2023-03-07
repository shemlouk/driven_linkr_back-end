import repository from "../repositories/UsersRepository.js";
import bcrypt from "bcrypt";

const DUPLICATE_CODE = "23505";
const SALT_ROUNDS = 10;

class UsersController {
  async create(req, res) {
    const data = req.body;
    try {
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
      data.password = hashedPassword;
      await repository.create(data);
      res.sendStatus(201);
    } catch ({ code, message }) {
      if (code === DUPLICATE_CODE) return res.status(409).json(message);
      res.status(500).json(message);
    }
  }
}

export default new UsersController();
