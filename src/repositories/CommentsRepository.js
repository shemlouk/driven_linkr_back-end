import db from "../config/database.js";

class CommentsRepository {
    async create(message, userId, postId) {
        const res = await db.query(
            `INSERT INTO posts_comments
                (message, user_id, post_id)
                VALUES
                ($1, $2, $3);`,
            [message, userId, postId]);
        return res;
    }
    async selectCommentsByPostId(postId) {
        const res = await db.query(
            `SELECT pc.*, u.name, u.profile_picture FROM posts_comments AS pc JOIN users AS u ON pc.user_id = u.id WHERE pc.post_id = $1`,
            [postId]);
        return res;
    }
}

export default new CommentsRepository();