import { ModifyRecipeService } from "../services/ModifyRecipeService.js";

class ModifyRecipeController {
    async handle(req, res) {
        const { recipeId } = req.params
        const data = req.body

        const service = new ModifyRecipeService
        const result = await service.execute(data, recipeId)

        return res.json(result)
    }
}

export { ModifyRecipeController }