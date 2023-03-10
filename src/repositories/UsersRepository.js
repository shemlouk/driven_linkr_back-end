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
        SELECT posts.*, users.name, users.profile_picture, likes.likes_count, likes.likes_names
        FROM posts 
        JOIN users ON posts.user_id = users.id
        LEFT JOIN (
          SELECT post_id, COUNT(*) AS likes_count, string_agg(users.name, ', ') AS likes_names
          FROM posts_likes JOIN users ON posts_likes.user_id = users.id
          GROUP BY post_id
        ) 
        AS likes ON posts.id = likes.post_id;
      `
    );
    return res;
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
      `INSERT INTO posts (description, url, preview_title, preview_desc, preview_img, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
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
  async getPostById(id) {
    const res = await db.query(
      `
        SELECT posts.*, users.name, users.profile_picture, likes.likes_count, likes.likes_names
        FROM posts 
        JOIN users ON posts.user_id = users.id
        LEFT JOIN (
          SELECT post_id, COUNT(*) AS likes_count, string_agg(users.name, ', ') AS likes_names
          FROM posts_likes JOIN users ON posts_likes.user_id = users.id
          GROUP BY post_id
        ) 
        AS likes ON posts.id = likes.post_id
        WHERE users.id = $1
        ORDER BY posts.created_at DESC;
      `,
      [id]
    );
    return res;
  }
  async getPostByPostId(id) {
    const res = await db.query(
      `SELECT posts.* FROM posts WHERE id = $1;`,
      [id]);
    return res;
  }
  async getByName(string) {
    const searchString = string + "%";
    const res = await db.query(
      `SELECT id,
              name,
              profile_picture AS "profilePicture"
        FROM users
        WHERE LOWER(name) LIKE LOWER($1)`,
      [searchString]
    );
    return res;
  }
  async deletePostById(id) {
    const res = await db.query(`DELETE FROM posts * WHERE id = $1`, [id]);
    return res;
  }
}

export default new UsersRepository();
