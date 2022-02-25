import prismaClient from "../prisma/index.js";

class UpdateRatingService {
    async execute(recipeId, newRatingValue, userId) {
        const { reviews: ratingArray} = await prismaClient.recipe.findFirst({
            where: { id: recipeId },
            select: { reviews: true }
        })

        let totalRating = ratingArray.reduce((acc, item) => acc + item.rating, 0)
        let updateReviews

        if(ratingArray.find(item => item.user_id === userId)) {
            const { reviews:[{ id: lastReviewId, rating: lastReviewRating }]} = await prismaClient.recipe.findFirst({
                where: { id: recipeId },
                select: {
                    reviews: {
                        where: { user_id: userId },
                        select: { 
                            id: true,
                            rating: true 
                        }
                    }
                }
            })

            totalRating -= lastReviewRating
            const averageRating = Number(( (totalRating + newRatingValue) / ratingArray.length ).toFixed(1))

            updateReviews = await prismaClient.recipe.update({
                where: { id: recipeId },
                data: { 
                    rating: averageRating,
                    reviews: {
                        update: {
                            where: { id: lastReviewId },
                            data: { rating: newRatingValue }
                        }
                    } 
                }
            })
        } else {
            const averageRating = Number(( (totalRating + newRatingValue) / (ratingArray.length  + 1)).toFixed(1))

            updateReviews = await prismaClient.recipe.update({
                where: { id: recipeId },
                data: { 
                    rating: averageRating,
                    reviews: {
                     create: { 
                        user_id: userId,
                        rating: newRatingValue
                     }
                    } 
                }
            })
        }

        return updateReviews
    }
}

export { UpdateRatingService }