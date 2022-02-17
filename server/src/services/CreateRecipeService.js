import prismaClient from "../prisma/index.js";

class CreateRecipeService {
    async execute(data) {
        const { 
            title, 
            recipe_description,
            ingredients, 
            directions,
            prep_time,
            cook_time, 
            cook_note, 
            amount_yield,
            rating, 
            image, 
            views, 
            reviews 
        } = data

        const recipe = await prismaClient.recipe.create({
            data: {
                title,
                description: recipe_description,
                information: {
                    create : {
                        ingredients: {
                                create: ingredients
                        },
                        directions: {
                                create: directions
                        },
                        cook_time,
                        prep_time,
                        cook_note,
                        amount_yield
                    }
                },
                rating,
                image,
                views,
                reviews,
            }
        })

        return recipe
    }
}

export { CreateRecipeService }