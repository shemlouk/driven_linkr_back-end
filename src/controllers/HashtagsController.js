import HashtagsRepository from "../repositories/HashtagsRepository.js"

class HashtagsController {
    async setHashtagName(req, res) {
        try {
            const name = req.body.name;

            const data = (await HashtagsRepository.getHashtagByName(name)).rows[0];
            
            if (data === undefined) {
                const hashtagId = (await HashtagsRepository.create(name)).rows[0];
                return res.status(201).send(hashtagId);
            }

            const updated = (await HashtagsRepository.updateQuantityByOne(data.quantity, data.id)).rows[0];
            res.status(200).send(updated);
        } catch (error) {
            console.error(`create ${error}`);
            res.sendStatus(500);
        }
    }
    async getHashtagByName(req, res) {
        try {
            const {name} = req.params;
            
            const data = (await HashtagsRepository.getHashtagByName(name)).rows[0];
            res.send(data);
        } catch (error) {
            console.error(`getHashtagByName ${error}`);
            res.sendStatus(500);
        }
    }
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
    async savePostHashtags(req, res) {
        try {
            const data = {
                post_id: Number(req.body.post_id) || 0,
                hashtag_id: Number(req.body.hashtag_id) || 0
            };
            if (data.post_id === 0 || data.hashtag_id === 0) res.sendStatus(400);

            const response = (await HashtagsRepository.createPostHashtag(data)).rowCount;
            response === 1 ? res.sendStatus(201) : res.send(409);
        } catch (error) {
            console.error(`getPostsWithHashtagId ${error}`);
            res.sendStatus(500);
        }
    }
}

export default new HashtagsController();