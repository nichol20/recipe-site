import prismaClient from "../prisma/index.js";

class ModifyRecipeService {
    async execute(data, recipeId) {
        const { 
            title, 
            recipe_description,
            ingredients, 
            directions,
            prep_time,
            cook_time, 
            cook_note, 
            amount_yield,
            image
        } = data

        const information = await prismaClient.information.findFirst({
            where: { recipe_id: recipeId },
            select: { id: true }
        })

        const deleteCurrentIngredients = prismaClient.ingredient.deleteMany({
            where: { information_id: information.id }
        })

        const deleteCurrentDirections = prismaClient.direction.deleteMany({
            where: { information_id: information.id }
        })

        const updateRecipe = prismaClient.recipe.update({
            where: { id: recipeId },
            data: {
                title: title,
                description: recipe_description,
                image: image,
                information: {
                    update: {
                        ingredients: { create: ingredients },
                        directions: { create: directions },
                        prep_time: prep_time,
                        cook_time: cook_time,
                        cook_note: cook_note,
                        amount_yield: amount_yield
                    }
                }   
            }
        })

        const transction = await prismaClient.$transaction(
            [
                deleteCurrentIngredients,
                deleteCurrentDirections,
                updateRecipe
            ]
        )

        return transction

    }
}

export { ModifyRecipeService }