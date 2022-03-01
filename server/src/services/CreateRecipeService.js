import prismaClient from "../prisma/index.js";

class CreateRecipeService {
    async execute(data, user_id) {
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

        const createRecipe = await prismaClient.recipe.create({
            data: {
                title,
                description: recipe_description,
                image,
                information: {
                    create : {
                        cook_time,
                        prep_time,
                        cook_note,
                        amount_yield,
                        ingredients: { create: ingredients },
                        directions: { create: directions }
                    }
                },
                user_id
            }
        })

        return createRecipe
    }
}

export { CreateRecipeService }