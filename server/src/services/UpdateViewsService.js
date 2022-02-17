import prismaClient from "../prisma/index.js";

class UpdateViewsService {
    async execute(recipeId) {
        const current = await prismaClient.recipe.findFirst({
            where: {
                id: recipeId
            },
            select: {
                views: true
            }
        })

        const updateViews = await prismaClient.recipe.update({
            where: {
                id: recipeId
            },
            data: {
                views: current.views + 1
            }
        })

        return updateViews
    }
}

export { UpdateViewsService }