import { DeleteRecipeService } from "../services/DeleteRecipeService.js";

class DeleteRecipeController {
    async handle(req, res) {
        const { recipeId } = req.params
        const service = new DeleteRecipeService

        const result = await service.execute(recipeId)

        return res.json(result)
    }
}

export { DeleteRecipeController }