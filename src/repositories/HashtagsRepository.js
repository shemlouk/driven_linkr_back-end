import db from "../config/database.js";

class HashtagsRepository {
    async getTrending () {
        const res = db.query(`SELECT * FROM hashtags ORDER BY quantity DESC LIMIT 10;`);
        return res;
    }
    async getPostsWithHashtagId(hashtagId) {
        const res = db.query(
            `SELECT p.*, h.name FROM posts p JOIN posts_hashtags ph ON p.id = ph.post_id JOIN hashtags h ON h.id = ph.hashtag_id WHERE ph.hashtag_id = $1 ORDER BY created_at DESC;`,
            [hashtagId]);
        return res;
    }
}

export default new HashtagsRepository();