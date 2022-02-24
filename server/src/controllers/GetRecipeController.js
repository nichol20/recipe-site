import { GetRecipeService } from "../services/GetRecipeService.js";

class GetRecipeController {
    async handle(req, res) {
        const { recipeId } = req.params
        
        const service = new GetRecipeService
        const result = await service.execute(recipeId)
        
        return res.json(result)
    }
}

export { GetRecipeController }