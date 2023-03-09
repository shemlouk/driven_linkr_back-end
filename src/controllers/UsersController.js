import repository from "../repositories/UsersRepository.js";
import bcrypt from "bcrypt";
import urlMetadata from "url-metadata";

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

  async listPosts(req, res) {
    try {
      const postList = await repository.getPostList();
      res.status(200).send(postList.rows);
    } catch (message) {
      res.status(500).json(message);
    }
  }

  async publishPost(req, res) {
    const { description, url } = req.body;
    const { userId } = res.locals.session;

    try {
      if (!url) {
        return sendStatus(404);
      }
      const metadata = await urlMetadata(url);
      console.log(metadata);

      await repository.insertPost(
        description,
        url,
        metadata.title,
        metadata.description,
        metadata.image,
        userId
      );

      res.sendStatus(201);
    } catch (message) {
      res.status(500).json(message);
    }
  }
}

export default new UsersController();
