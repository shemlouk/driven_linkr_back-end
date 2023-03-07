import HashtagsRepository from "../repositories/HashtagsRepository.js"

class HashtagsController {
    async getTrending(_, res) {
        try {
            const hashtags = (await HashtagsRepository.getTrending()).rows;
            res.send(hashtags);
        } catch ({code, message}) {
            console.log(`getTrending Error ${code}: ${message}`);
        }
    }
}

export default new HashtagsController();