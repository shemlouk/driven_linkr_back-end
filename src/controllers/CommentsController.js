import CommentsRepository from "../repositories/CommentsRepository.js"

class CommentsController {
    async create(req, res) {
        try {
            const { userId } = res.locals.session;
            const { message, post_id } = req.body;
            
            const { rowCount } = (await CommentsRepository.create(message, userId, post_id));
            rowCount === 1 ? res.send(201) : res.send(500);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default new CommentsController();