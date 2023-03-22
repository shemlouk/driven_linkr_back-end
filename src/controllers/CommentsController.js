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
    async getComments(req, res) {
        try {
            const postId = req.params.id;

            const { rows, rowCount } = await CommentsRepository.selectCommentsByPostId(postId);
            if (rowCount === 0)  return res.sendStatus(404);

            res.send(rows);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default new CommentsController();