import prismaClient from "../prisma/index.js";

class UpdateViewsService {
    async execute(recipeId, userId ) {

        const updateViews = await prismaClient.recipe.update({
            where: { id: recipeId },
            data: { views: { create: { user_id: userId } } }
        })

        return updateViews
    }
}

export { UpdateViewsService }