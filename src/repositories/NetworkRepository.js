import db from "../config/database.js";

class NetworkRepository {
  async create(userId, followingId) {
    const res = await db.query(
      `INSERT INTO network (user_id, following_id) VALUES ($1, $2)`,
      [userId, followingId]
    );
    return res;
  }
  async delete(userId, followingId) {
    const res = await db.query(
      `DELETE FROM network * WHERE user_id = $1 AND following_id = $2`,
      [userId, followingId]
    );
    return res;
  }
  async getId(userId, followingId) {
    const res = await db.query(
      `SELECT id FROM network WHERE user_id = $1 AND following_id = $2`,
      [userId, followingId]
    );
    return res;
  }
  async getNetworkFromId(userId) {
    const res = await db.query(
      `SELECT array_agg(following_id) AS "ids" FROM network WHERE user_id = $1`,
      [userId]
    );
    return res;
  }
}

export default new NetworkRepository();
