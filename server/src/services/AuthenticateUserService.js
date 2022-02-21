import axios from "axios"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import prismaClient from "../prisma/index.js"

class AuthenticateUserService {
    async execute(code) {
        const urlGithubAccessToken = `https://github.com/login/oauth/access_token`

        const { data: tokenData } = await axios.post(urlGithubAccessToken, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers : {
                "Accept": "application/json"
            }
        })

        const { login, id, avatar_url, name } = await axios.get('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${tokenData.access_token}`
            }
        })

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = jwt.sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return { token, user }
    }
}

export { AuthenticateUserService }