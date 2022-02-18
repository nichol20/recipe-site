import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

import { RecipeCard } from '../RecipeCard/RecipeCard'
import { Header } from '../Header/Header';

import './style.css'

export const Menu = () => {
  const [ recipes, setRecipes ] = useState()

  useEffect(() => {
    api.get('recipes').then(response => setRecipes(response.data))
  }, [])

  if(!recipes) {
    return 'Loading ...'
  }
  
  return (
      <div className='menu'>
        <Header />

        <div className="card-box">
          {
            recipes.map(recipe => {
              return(
                <a href={`/recipe/${recipe.id}`} key={recipe.id} >
                  <RecipeCard 
                    nameId={recipe.id} 
                    image={recipe.image} 
                    views={recipe.views}
                    recipeName={recipe.title}
                    rating={recipe.rating}
                    reviews={recipe.reviews}
                  />
                </a>
              )})
          }
          <a href="/menu/create-recipe">
            <RecipeCard empty />
          </a>
        </div>
      </div>
  )
}


