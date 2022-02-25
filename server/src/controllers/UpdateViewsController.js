import { UpdateViewsService } from "../services/UpdateViewsService.js";

class UpdateViewsController {
    async handle(req, res) {
        const { recipeId } = req.params
        const { user_id } = req.body

        const service = new UpdateViewsService
        const result = await service.execute(recipeId, user_id)
        
        return res.json(result)
    }
}

export { UpdateViewsController }