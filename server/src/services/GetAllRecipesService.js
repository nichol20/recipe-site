import prismaClient from '../prisma/index.js'

class GetAllRecipesService {
    async execute() {
        const recipes = await prismaClient.recipe.findMany({
            include: {
                information: {
                    include: {
                        ingredients: true,
                        directions: true
                    }
                }
            }
        })

        return recipes
    }
}

export { GetAllRecipesService }