import db from "../config/database.js";

class SessionsRepository {
  async create(userId) {
    const res = await db.query(
      "INSERT INTO sessions (user_id) VALUES ($1) RETURNING id",
      [userId]
    );
    return res;
  }
}

export default new SessionsRepository();
