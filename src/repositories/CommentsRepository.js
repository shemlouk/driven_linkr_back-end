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
}

export default new CommentsRepository();