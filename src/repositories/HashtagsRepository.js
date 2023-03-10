import db from "../config/database.js";

class HashtagsRepository {
    async create(hashtagName) {
        const res = db.query(
            `INSERT INTO hashtags (name, quantity) VALUES ($1, 1) RETURNING id;`,
            [hashtagName]);
        return res;
    }
    async updateQuantityByOne(quantity, id, addValue = 1) {
        const res = db.query(`UPDATE hashtags SET quantity = $1 WHERE id = $2 RETURNING id;`, [(quantity + addValue), id]);
        return res;
    }
    async getHashtagByName(hashtagName) {
        const res = db.query(
            `SELECT * FROM hashtags WHERE name = $1;`,
            [hashtagName]);
        return res;
    }
    async getTrending() {
        const res = db.query(`SELECT * FROM hashtags ORDER BY quantity DESC LIMIT 10;`);
        return res;
    }
    async getPostsWithHashtagId(hashtagId) {
        const res = db.query(
            `
                SELECT posts.*, users.name, users.profile_picture, likes.likes_count, likes.likes_names
                FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN posts_hashtags AS ph ON ph.post_id = posts.id 
                LEFT JOIN (
                    SELECT post_id, COUNT(*) AS likes_count, string_agg(users.name, ', ') AS likes_names
                    FROM posts_likes JOIN users ON posts_likes.user_id = users.id
                    GROUP BY post_id
                )
                AS likes ON posts.id = likes.post_id
                WHERE ph.hashtag_id = $1
                ORDER BY posts.created_at DESC;
            `,
            [hashtagId]);
        return res;
    }
    async createPostHashtag({post_id, hashtag_id}) {
        const res = db.query(
            `INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2);`,
            [post_id, hashtag_id]);
        return res;
    }
    async deletePostHashtag(post_id) {
        const res = db.query(
            `DELETE FROM posts_hashtags WHERE post_id = $1`,
            [post_id]);
        return res;
    }
}

export default new HashtagsRepository();