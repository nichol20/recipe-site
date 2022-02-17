import prismaClient from "../prisma/index.js";

class UpdateRatingService {
    async execute(recipeId, ratingValue) {
        const current = await prismaClient.recipe.findFirst({
            where: {
                id: recipeId
            },
            select: {
                rating: true,
                reviews: true
            }
        })

        const newRatingValue = (current.rating * current.reviews + ratingValue) / (current.reviews + 1)

        const updateRating = await prismaClient.recipe.update({
            where: {
                id: recipeId
            },
            data: {
                rating: Number(newRatingValue.toFixed(2)),
                reviews: current.reviews + 1
            }
        })

        return updateRating
    }
}

export { UpdateRatingService }