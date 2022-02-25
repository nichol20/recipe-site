import { UpdateRatingService } from "../services/UpdateRatingService.js";

class UpdateRatingController {
    async handle(req, res) {
        const { recipeId } = req.params
        const { rating, user_id } = req.body

        const service = new UpdateRatingService
        const result = await service.execute(recipeId, rating, user_id)
        
        return res.json(result)
    }
}

export { UpdateRatingController }