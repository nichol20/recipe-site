import prismaClient from "../prisma/index.js";
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class AuthenticateUserWithGoogleService {
    async execute(googleToken) {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const { sub, name, email, picture } = ticket.getPayload()

        let user = await prismaClient.user.findFirst({
            where: {
                google_id: sub
            }
        })

        if(!user) {
            user = await prismaClient.user.create({
                data: {
                    name: name,
                    avatar_url: picture,
                    email: email ?? 'undefined',
                    google_id: sub
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
                expiresIn: '1d'
            }
        )

        return { token, user }
    }
}

export { AuthenticateUserWithGoogleService }