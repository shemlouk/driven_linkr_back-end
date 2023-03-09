import db from "../config/database.js";

class HashtagsRepository {
    async create(hashtagName) {
        const res = db.query(
            `INSERT INTO hashtags (name, quantity) VALUES ($1, 1) RETURNING id;`,
            [hashtagName]);
        return res;
    }
    async updateQuantityByOne(quantity, id) {
        const res = db.query(`UPDATE hashtags SET quantity = $1 WHERE id = $2 RETURNING id;`, [(quantity + 1), id]);
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
            `SELECT u.name, u.profile_picture, p.* FROM posts p JOIN posts_hashtags ph ON p.id = ph.post_id JOIN hashtags h ON h.id = ph.hashtag_id JOIN users u ON p.user_id = u.id WHERE ph.hashtag_id = $1 ORDER BY created_at DESC;`,
            [hashtagId]);
        return res;
    }
}

export default new HashtagsRepository();