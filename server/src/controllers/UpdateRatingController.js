import { UpdateRatingService } from "../services/UpdateRatingService.js";

class UpdateRatingController {
    async handle(req, res) {
        const { recipeId } = req.params
        const data = req.body

        const service = new UpdateRatingService
        const result = await service.execute(recipeId, data.rating)

        return res.json(result)
    }
}

export { UpdateRatingController }