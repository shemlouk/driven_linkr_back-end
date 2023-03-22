import HashtagsRepository from "../repositories/HashtagsRepository.js";
import NetworkRepository from "../repositories/NetworkRepository.js";
import repository from "../repositories/UsersRepository.js";
import urlMetadata from "url-metadata";
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

      const post = await repository.insertPost(
        description,
        url,
        metadata.title,
        metadata.description,
        metadata.image,
        userId
      );

      res.status(201).send(post.rows[0]);
    } catch (message) {
      res.status(500).json(message);
    }
  }

  async likePost(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.session;
    try {
      const result = await repository.likePost(postId, userId);
      if (!result) return res.sendStatus(404);
      if (result.command === "INSERT") return res.sendStatus(201);
      if (result.command === "DELETE") return res.sendStatus(200);
    } catch (message) {
      res.status(500).json(message);
    }
  }

  async listUserPosts(req, res) {
    const { id } = req.params;
    try {
      const postList = await repository.getPostById(id);
      res.status(200).send(postList.rows);
    } catch (message) {
      res.status(500).json(message);
    }
  }

  async filterByName(req, res) {
    const { name } = req.query;
    try {
      const { rows } = await repository.getByName(name);
      res.send(rows);
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }

  async deletePost(req, res) {
    const { userId } = res.locals.session;
    const id = Number(req.params.id);
    try {
      const { rows, rowCount } = await repository.getPostByPostId(id);

      if (!rowCount) return res.sendStatus(404);
      if (rows[0].user_id !== userId) return res.sendStatus(401);

      await HashtagsRepository.deletePostHashtag(id);

      await repository.updateToDelete(id);
      res.sendStatus(200);
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }

  async editPost(req, res) {
    const { userId } = res.locals.session
    const { description } = req.body
    const { id } = req.params

    try {
      const { rows, rowCount } = await repository.getPostByPostId(id);

      if (!rowCount) return res.sendStatus(404);
      if (rows[0].user_id !== userId) return res.sendStatus(401);

      await repository.updatePostById(description, id);
      res.sendStatus(200);
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }

  async network(req, res) {
    const followingId = Number(req.params.id);
    const { userId } = res.locals.session;
    if (followingId === userId)
      return res.status(400).json("Can't follow yourself");
    try {
      const { rowCount } = await NetworkRepository.getId(userId, followingId);
      if (rowCount) {
        await NetworkRepository.delete(userId, followingId);
        res.sendStatus(200);
      } else {
        await NetworkRepository.create(userId, followingId);
        res.sendStatus(201);
      }
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }

  async getNetwork(req, res) {
    const { userId } = res.locals.session;
    try {
      const { rows } = await NetworkRepository.getNetworkFromId(userId);
      res.send(rows);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }
}

export default new UsersController();
