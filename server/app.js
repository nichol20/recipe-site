import express from 'express'
import cors from 'cors'

import { CreateRecipeController } from './src/controllers/CreateRecipeController.js'
import { GetAllRecipesController } from './src/controllers/GetAllRecipesController.js'
import { GetRecipeController } from './src/controllers/GetRecipeController.js'
import { DeleteRecipeController } from './src/controllers/DeleteRecipeController.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/recipes', new GetAllRecipesController().handle)

app.get('/recipes/:recipeId', new GetRecipeController().handle)

app.post('/recipes', new CreateRecipeController().handle)

app.delete('/recipes/:recipeId', new DeleteRecipeController().handle)

app.listen(4000, () => console.log(`Server is running on PORT 4000`))