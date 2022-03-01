import { AuthenticateUserWithGoogleService } from "../services/AuthenticateUserWithGoogleService.js"


class AuthenticateUserWithGoogleController {
    async handle(req, res) {
        const { token } = req.body

        const service = new AuthenticateUserWithGoogleService
        const result = await service.execute(token)

        return res.json(result)
    }
}

export { AuthenticateUserWithGoogleController }