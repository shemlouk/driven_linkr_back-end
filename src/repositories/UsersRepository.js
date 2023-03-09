import db from "../config/database.js";

class UsersRepository {
  async create({ username, email, password, profilePicture }) {
    const res = await db.query(
      "INSERT INTO users (username, email, password, profile_picture) VALUES ($1, $2, $3, $4)",
      [username, email, password, profilePicture]
    );
    return res;
  }
  async getByEmail(email) {
    const res = await db.query(
      `SELECT id, 
              username,
              email, 
              password AS "hashedPassword",
              profile_picture AS "profilePicture",
              created_at AS "createdAt"
        FROM users 
        WHERE email = $1`,
      [email]
    );
    return res;
  }
  async getPostList() {
    const res = await db.query(
      `
        SELECT posts.* FROM posts
        JOIN users ON users.id = posts.user_id 
        ORDER BY created_at DESC LIMIT 20;
      `
    );
    return res
  }
  async insertPost(description, url, previewTitle, previewDesc, previewImg, userId) {
    const res = await db.query(
      `INSERT INTO posts (description, url, preview_title, preview_desc, preview_img, user_id) VALUES ($1, $2, $3, $4, $5, $6);`,
      [description, url, previewTitle, previewDesc, previewImg, userId]
    )
    return res
  }
}



export default new UsersRepository();
