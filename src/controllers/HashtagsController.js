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
}

export default new HashtagsController();