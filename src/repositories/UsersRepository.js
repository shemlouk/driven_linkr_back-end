import db from "../config/database.js";

class UsersRepository {
  async create({ username, email, password, profilePicture }) {
    const res = await db.query(
      "INSERT INTO users (username, email, password, profile_picture) VALUES ($1, $2, $3, $4)",
      [username, email, password, profilePicture]
    );
    return res;
  }
}

export default new UsersRepository();
