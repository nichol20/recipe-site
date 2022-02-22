import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { router } from './routes.js'

const app = express()
const PORT = process.env.PORT || 4000
const gitOauthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`

app.use(cors())
app.use(express.json())
app.use(router)

app.get('/github', (req, res) => res.send(gitOauthUrl))

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT} 🥵🥶🤡`))