import { GetAllRecipesService } from '../services/GetAllRecipesService.js'

class GetAllRecipesController {
    async handle(req, res) {
        const service = new GetAllRecipesService()

        const result = await service.execute()

        return res.json(result)
    }
}

export { GetAllRecipesController }