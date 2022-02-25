import prismaClient from "../prisma/index.js";

class GetRecipeService {
    async execute(recipeId) {
        const recipe = await prismaClient.recipe.findUnique({
            where: { id: recipeId },
            include: {
                information: {
                    include: {
                        ingredients: true,
                        directions: true
                    }
                },
                views: true,
                reviews: true
            }
        })
        
        return recipe
    }
}

export { GetRecipeService }