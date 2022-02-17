import { CreateRecipeService } from "../services/CreateRecipeService.js";

class CreateRecipeController {
    async handle(req, res) {
        const data = req.body

        const service = new CreateRecipeService
        const result = service.execute(data)

        return res.json(result)
    }
}

export { CreateRecipeController }