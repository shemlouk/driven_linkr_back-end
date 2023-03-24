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
  async getPostList(offset) {
    //obtem a contagem total de posts não deletados
    const postCount = await db.query(
      `SELECT COUNT(*) AS total FROM posts WHERE deleted_at IS NULL;`
    )
    // Se offset >= a contagem total, retorna um array vazio
    const total = postCount.rows[0].total
    if (offset >= total) {
      return []
    }
    //verifica qual é o menor valor 10 ou o restante de posts da contagem
    //se 10 for menor, limita a 10 a quantidade de posts
    //Se limit for menor, retorna somente a quantidade de posts restantes
    //impedindo que retorna posts repetidos
    const limit = Math.min(10, total - offset)
    const res = await db.query(
      `
        SELECT posts.*, users.name, users.profile_picture, likes.likes_count, likes.likes_names, comments.num_comments
        FROM posts 
        JOIN users ON posts.user_id = users.id
        LEFT JOIN (
          SELECT post_id, COUNT(*) AS likes_count, string_agg(users.name, ', ') AS likes_names
          FROM posts_likes JOIN users ON posts_likes.user_id = users.id
          GROUP BY post_id
        ) AS likes ON posts.id = likes.post_id
        LEFT JOIN (
					SELECT post_id, COUNT(*) AS num_comments
					FROM posts_comments
					GROUP BY post_id
				) AS comments ON posts.id = comments.post_id
        WHERE posts.deleted_at IS NULL
        ORDER BY posts.created_at DESC
        LIMIT $1 OFFSET $2;
      `, [limit, offset]
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
        SELECT posts.*, users.name, users.profile_picture, likes.likes_count, likes.likes_names, comments.num_comments
        FROM posts 
        JOIN users ON posts.user_id = users.id
        LEFT JOIN (
          SELECT post_id, COUNT(*) AS likes_count, string_agg(users.name, ', ') AS likes_names
          FROM posts_likes JOIN users ON posts_likes.user_id = users.id
          GROUP BY post_id
        ) AS likes ON posts.id = likes.post_id
        LEFT JOIN (
					SELECT post_id, COUNT(*) AS num_comments
					FROM posts_comments
					GROUP BY post_id
				) AS comments ON posts.id = comments.post_id
        WHERE users.id = $1 AND posts.deleted_at IS NULL
        ORDER BY posts.created_at DESC;
      `,
      [id]
    );
    return res;
  }
  async getPostByPostId(id) {
    const res = await db.query(`SELECT posts.* FROM posts WHERE id = $1;`, [
      id,
    ]);
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
  async updateToDelete(id) {
    const res = await db.query(
      `UPDATE posts SET deleted_at = NOW() WHERE id = $1`,
      [id]
    );
    return res;
  }
  async updatePostById(description, id) {
    const res = await db.query(
      `UPDATE posts SET description = $1, updated_at = NOW() WHERE id = $2;`,
      [description, id]
    );
    return res;
  }
  async getById(id) {
    const res = await db.query(
      `SELECT name, profile_picture FROM users WHERE id = $1`,
      [id]
    );
    return res;
  }
}

export default new UsersRepository();
