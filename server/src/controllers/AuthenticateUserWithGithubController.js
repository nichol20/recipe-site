import { AuthenticateUserWithGithubService } from "../services/AuthenticateUserWithGithubService.js"

class AuthenticateUserWithGithubController {
    async handle(req, res) {
        const { code } = req.body

        const service = new AuthenticateUserWithGithubService

        try {
            const result = await service.execute(code);
            return res.json(result);
        } catch (err) {
            return res.json({ error: err.message });
        }
    }
}

export { AuthenticateUserWithGithubController }