import db from "../config/database.js";

class SessionsRepository {
  async create(userId) {
    const res = await db.query(
      "INSERT INTO sessions (user_id) VALUES ($1) RETURNING id",
      [userId]
    );
    return res;
  }
  async getById(id) {
    const res = await db.query(
      `SELECT id, user_id AS "userId" FROM sessions WHERE id = $1`,
      [id]
    );
    return res;
  }
}

export default new SessionsRepository();
