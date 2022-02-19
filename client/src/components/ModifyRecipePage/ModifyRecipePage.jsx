import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CreateRecipePage } from '../CreateRecipePage/CreateRecipePage'
import { api } from '../../services/api'

export const ModifyRecipePage = () => {
    const { recipeId } = useParams()
    const [ recipe, setRecipe ] = useState()

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`recipes/${recipeId}`)
            setRecipe(response.data)
        }
        fetchData()
    }, [recipeId])

    if(!recipe) {
        return 'Loading ...'
    }

    return (
        <CreateRecipePage
         modify
         props_title={recipe.title}
         recipe_description={recipe.description}
         props_ingredients={recipe.information[0].ingredients}
         props_directions={recipe.information[0].directions}
         prep_time={recipe.information[0].prep_time}
         cook_time={recipe.information[0].cook_time}
         cook_note={recipe.information[0].cook_note}
         amount_yield={recipe.information[0].amount_yield}
         props_image={recipe.image}
        />
    )
}

