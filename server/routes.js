import { Router } from "express";

import { CreateRecipeController } from './src/controllers/CreateRecipeController.js'
import { GetAllRecipesController } from './src/controllers/GetAllRecipesController.js'
import { GetRecipeController } from './src/controllers/GetRecipeController.js'
import { DeleteRecipeController } from './src/controllers/DeleteRecipeController.js'
import { UpdateRatingController } from './src/controllers/UpdateRatingController.js'
import { UpdateViewsController } from './src/controllers/UpdateViewsController.js'
import { ModifyRecipeController } from "./src/controllers/ModifyRecipeController.js";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController.js";
import { ensureAuthenticated } from "./src/middleware/ensureAuthenticated.js";
import { GetProfileUserController } from './src/controllers/GetProfileUserController.js'

const router = Router()

/*-----------GET--------------*/
router.get('/recipes', new GetAllRecipesController().handle)

router.get('/recipes/:recipeId', new GetRecipeController().handle)

router.get('/profile', ensureAuthenticated, new GetProfileUserController().handle)

/*-----------POST--------------*/
router.post('/recipes', ensureAuthenticated, new CreateRecipeController().handle)

router.post("/authenticate", new AuthenticateUserController().handle)

/*-----------PUT--------------*/
router.put('/recipes/:recipeId/update-rating', ensureAuthenticated, new UpdateRatingController().handle)

router.put('/recipes/:recipeId/update-views', new UpdateViewsController().handle)

router.put('/recipes/:recipeId/modify-recipe', ensureAuthenticated, new ModifyRecipeController().handle)

/*-----------DEL--------------*/
router.delete('/recipes/:recipeId', ensureAuthenticated, new DeleteRecipeController().handle)

export { router }