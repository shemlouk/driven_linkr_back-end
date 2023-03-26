import db from "../config/database.js";

class RepostsRepository {
  async create(userId, postId) {
    const res = await db.query(
      "INSERT INTO posts_reposts (user_id, post_id) VALUES ($1, $2) RETURNING id",
      [userId, postId]
    );
    return res;
  }
  async delete(userId, postId) {
    const res = await db.query(
      `DELETE FROM posts_reposts * WHERE user_id = $1 AND post_id = $2`,
      [userId, postId]
    );
    return res;
  }
  async getRepostsIdsByUserId(userId) {
    const res = await db.query(
      `SELECT array_agg(post_id) as "ids" FROM posts_reposts WHERE user_id = $1`,
      [userId]
    );
    return res;
  }
  async getReposts(timestamp, network) {
    const res = await db.query(
      `
      SELECT  COUNT(posts_reposts.post_id) AS "num_reposts",
              posts_reposts.created_at AS "rb_created_at",
              posts.*,
              users.name,
              users.profile_picture,
              likes.likes_count,
              likes.likes_names,
              comments.num_comments,
              reposted_by.*
      FROM posts_reposts
      JOIN posts ON posts.id = posts_reposts.post_id
      JOIN users ON posts.user_id = users.id
        LEFT JOIN (
          SELECT  post_id,
                  COUNT(*) AS likes_count,
                  string_agg(users.name, ', ') AS likes_names
          FROM posts_likes
          JOIN users ON posts_likes.user_id = users.id
          GROUP BY post_id
        ) AS likes ON posts.id = likes.post_id
        LEFT JOIN (
          SELECT  post_id,
                  COUNT(*) AS num_comments
          FROM posts_comments
          GROUP BY post_id
        ) AS comments ON posts.id = comments.post_id
        LEFT JOIN (
          SELECT	users.id AS "rb_user_id",
                  users.name AS "rb_user_name"
          FROM posts_reposts
          JOIN users ON posts_reposts.user_id = users.id
        ) AS reposted_by ON posts_reposts.user_id = reposted_by.rb_user_id
      WHERE posts.deleted_at IS NULL
            AND posts_reposts.user_id = ANY ($2::int[])
            AND posts_reposts.created_at <= $1
      GROUP BY	posts_reposts.user_id,
                posts.id,
                users.name,
                users.profile_picture,
                likes.likes_count,
                likes.likes_names,
                comments.num_comments,
                reposted_by.rb_user_id,
                reposted_by.rb_user_name,
                posts_reposts.created_at
      ORDER BY posts.created_at DESC
      `,
      [timestamp, network]
    );
    return res;
  }
}

export default new RepostsRepository();
