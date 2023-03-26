import NetworkRepository from "../repositories/NetworkRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import repository from "../repositories/RepostsRepository.js";

class RepostsController {
  async create(req, res) {
    const { userId } = res.locals.session;
    const postId = Number(req.params.id);
    if (!postId) return res.sendStatus(400);
    try {
      const { ids } = (await repository.getRepostsIdsByUserId(userId)).rows[0];
      if (ids?.includes(postId)) return res.sendStatus(409);
      const { rows, rowCount } = await UsersRepository.getPostByPostId(postId);
      if (!rowCount) return res.sendStatus(404);
      if (rows[0].deleted_at) return res.sendStatus(403);
      await repository.create(userId, postId);
      res.sendStatus(201);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }
  async delete(req, res) {
    const { userId } = res.locals.session;
    const postId = Number(req.params.id);
    if (!postId) return res.sendStatus(400);
    try {
      const { ids } = (await repository.getRepostsIdsByUserId(userId)).rows[0];
      if (!ids?.includes(postId)) return res.sendStatus(404);
      await repository.delete(userId, postId);
      res.sendStatus(204);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }
  async getRepostsByNetwork(req, res) {
    const { userId } = res.locals.session;
    try {
      const { rows } = await NetworkRepository.getNetworkFromId(userId);
      res.sendStatus(204);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(message);
    }
  }
}

export default new RepostsController();
