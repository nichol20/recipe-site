import axios from "axios"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import prismaClient from "../prisma/index.js"

class AuthenticateUserWithGithubService {
    async execute(code) {
        const githubAccessTokenUrl = `https://github.com/login/oauth/access_token`

        const { data: tokenData } = await axios.post(githubAccessTokenUrl, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers : {
                "Accept": "application/json"
            }
        })

        const fetchGitUser = await axios.get('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${tokenData.access_token}`
            }
        })

        const { email, id, avatar_url, name } = await fetchGitUser.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user) {
            user = await prismaClient.user.create({
                data: {
                    name: name ?? 'undefined',
                    avatar_url,
                    email: email ?? 'undefined',
                    github_id: id,
                }
            })
        }

        const token = jwt.sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    email: user.email,
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

export { AuthenticateUserWithGithubService }