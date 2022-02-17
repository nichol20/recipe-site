import { Router } from "express";

import { CreateRecipeController } from './src/controllers/CreateRecipeController.js'
import { GetAllRecipesController } from './src/controllers/GetAllRecipesController.js'
import { GetRecipeController } from './src/controllers/GetRecipeController.js'
import { DeleteRecipeController } from './src/controllers/DeleteRecipeController.js'
import { UpdateRatingController } from './src/controllers/UpdateRatingController.js'
import { UpdateViewsController } from './src/controllers/UpdateViewsController.js'

const router = Router()

router.get('/recipes', new GetAllRecipesController().handle)

router.get('/recipes/:recipeId', new GetRecipeController().handle)

router.post('/recipes', new CreateRecipeController().handle)

router.put('/recipes/:recipeId/update-rating', new UpdateRatingController().handle)

router.put('/recipes/:recipeId/update-views', new UpdateViewsController().handle)

router.delete('/recipes/:recipeId', new DeleteRecipeController().handle)

export { router }