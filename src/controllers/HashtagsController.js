import HashtagsRepository from "../repositories/HashtagsRepository.js"

class HashtagsController {
    async getTrending(req, res) {
        try {
            const hashtags = (await HashtagsRepository.getTrending()).rows;
            res.send(hashtags);
        } catch (error) {
            console.error(`getTrending ${error}`);
            res.sendStatus(500);
        }
    }
    async getPostsWithHashtagId(req, res) {
        try {
            const hashtagId = Number(req.params.id) || 0;
            const posts = (await HashtagsRepository.getPostsWithHashtagId(hashtagId)).rows;
            res.send(posts);
        } catch (error) {
            console.error(`getPostsWithHashtagId ${error}`);
            res.sendStatus(500);
        }
    }
}

export default new HashtagsController();