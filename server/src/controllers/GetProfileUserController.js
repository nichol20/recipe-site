import { GetProfileUserService } from "../services/GetProfileUserService.js"

class GetProfileUserController {
    async handle(req, res) {
        const { user_id } = req
        
        const service = new GetProfileUserService
        const result = await service.execute(user_id)

        return res.json(result)
    }
}

export { GetProfileUserController }