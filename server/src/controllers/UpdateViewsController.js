import { UpdateViewsService } from "../services/UpdateViewsService.js";

class UpdateViewsController {
    async handle(req, res) {
        const { recipeId } = req.params

        const service = new UpdateViewsService
        const result = await service.execute(recipeId)
        
        return res.json(result)
    }
}

export { UpdateViewsController }