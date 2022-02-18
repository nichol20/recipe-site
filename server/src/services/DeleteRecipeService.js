import prismaClient from "../prisma/index.js";

class DeleteRecipeService {
    async execute(id) {
        const deleteRecipe = await prismaClient.recipe.delete({
            where : { id: id }
        })

        return deleteRecipe
    }
}

export { DeleteRecipeService }