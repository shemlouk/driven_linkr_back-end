import db from "../config/database.js";

class HashtagsRepository {
    async getTrending () {
        const res = db.query(`SELECT * FROM hashtags ORDER BY quantity DESC LIMIT 10;`);
        return res;
    }
}

export default new HashtagsRepository();