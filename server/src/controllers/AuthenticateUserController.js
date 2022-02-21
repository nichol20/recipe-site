import { AuthenticateUserService } from "../services/AuthenticateUserService.js"

class AuthenticateUserController {
    async handle(req, res) {
        const { code } = req.body

        const service = new AuthenticateUserService

        try {
            const result = await service.execute(code);
            return res.json(result);
        } catch (err) {
            return res.json({ error: err.message });
        }
    }
}

export { AuthenticateUserController }