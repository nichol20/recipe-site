import prismaClient from "../prisma/index.js";

class GetRecipeService {
    async execute(id) {
        const recipe = await prismaClient.recipe.findUnique({
            where: {
                id: id
            },
            include: {
                information: {
                    include: {
                        ingredients: true,
                        directions: true
                    }
                }
            }
        })
        
        return recipe
    }
}

export { GetRecipeService }