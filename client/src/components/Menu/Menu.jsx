import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../services/api';

import { RecipeCard } from '../RecipeCard/RecipeCard'
import { Header } from '..';

import './style.css'
import { AuthContext } from '../../contexts/Auth';

export const Menu = () => {
  const { user } = useContext(AuthContext)
  const [ recipes, setRecipes ] = useState()

  useEffect(() => {
    api.get('recipes').then(response => setRecipes(response.data))
  }, [])

  if(!recipes) {
    return 'Loading ...'
  }
  
  return (
    <>
      <Header />
      <div className='menu'>
        <div className="card-box">
          {
            recipes.map(recipe => {
              return(
                <a href={`/recipe/${recipe.id}`} key={recipe.id} >
                  <RecipeCard 
                    nameId={recipe.id} 
                    recipeName={recipe.title}
                    image={recipe.image} 
                    rating={recipe.rating}
                    views={recipe.views}
                    reviews={recipe.reviews}
                  />
                </a>
              )})
          }
          {
            !!user ? (
              <a href="/menu/create-recipe">
                <RecipeCard empty />
              </a>
            ) : (<></>)
          }
          
        </div>
      </div>
    </>
  )
}


