import { CreateRecipeService } from "../services/CreateRecipeService.js";

class CreateRecipeController {
    async handle(req, res) {
        const data = req.body
        const { user_id } = req

        const service = new CreateRecipeService
        const result = await service.execute(data, user_id)

        return res.json(result)
    }
}

export { CreateRecipeController }