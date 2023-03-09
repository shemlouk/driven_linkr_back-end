import db from "../config/database.js";

class UsersRepository {
  async create({ name, email, password, profilePicture }) {
    const res = await db.query(
      "INSERT INTO users (name, email, password, profile_picture) VALUES ($1, $2, $3, $4)",
      [name, email, password, profilePicture]
    );
    return res;
  }
  async getByEmail(email) {
    const res = await db.query(
      `SELECT id,
              name,
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
        SELECT posts.*, users.username  AS name, users.profile_picture AS profilePicture FROM posts
        JOIN users ON users.id = posts.user_id 
        ORDER BY created_at DESC LIMIT 20;
      `
    );
    return res
  }
  async insertPost(
    description,
    url,
    previewTitle,
    previewDesc,
    previewImg,
    userId
  ) {
    const res = await db.query(
      `INSERT INTO posts (description, url, preview_title, preview_desc, preview_img, user_id) VALUES ($1, $2, $3, $4, $5, $6);`,
      [description, url, previewTitle, previewDesc, previewImg, userId]
    );
    return res;
  }
  async likePost(postId, userId) {
    try {
      const res = await db.query(
        `INSERT INTO posts_likes (post_id, user_id) VALUES ($1, $2);`,
        [postId, userId]
      );
      return res;
    } catch (error) {
      if (error.code === "23505") {
        const res = await db.query(
          `DELETE FROM posts_likes WHERE post_id = $1 AND user_id = $2;`,
          [postId, userId]
        );
        return res;
      } else {
        throw error;
      }
    }
  }
}

export default new UsersRepository();
