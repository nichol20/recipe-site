import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/Auth';
import { api } from '../../services/api';
import { Header } from '../Header/Header';
import { RatingSystem } from '../RatingSystem/RatingSystem';

import './style.css'

export const RecipePage = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { recipeId } = useParams()
    const [ recipe, setRecipe ] = useState()
    const [ confirmDelete, setConfirmDelete ] = useState(false)
    const [ createdByThisUser, setCreatedByThisUser ] = useState(false)

    const deleteRecipe = async () =>  {
        await api.delete(`recipes/${recipeId}`)

        navigate('/menu')
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await api.get(`recipes/${recipeId}`)
            await setRecipe(response.data)
        }

        const updateViews = async () => {
            if(user && recipe ) {
                if(!recipe.views?.find(view => view.user_id === user.id)){
                    api.put(`recipes/${recipeId}/update-views`, { user_id: user.id })
                }
            }
        }

        const checkIfRecipeCreatedByUser = () => {
            if(user && recipe) {
                recipe.user_id === user.id ? 
                    setCreatedByThisUser(true) : setCreatedByThisUser(false)
            }
        }

        fetchRecipes()
        updateViews()
        checkIfRecipeCreatedByUser()
    }, [recipe, user, recipeId])

    if(!recipe) {
        return 'Loading ...'
    }

    return (
        <div className="recipe-page">
            <Header />
            <div className="container-recipe-page">
                <div className="header-container-recipe-page">

                    <div className="recipe-banner-box-recipe-page">
                        <div className="recipe-image-box">
                            <img src={recipe.image} alt="" />
                        </div>

                        <div className="title-box">
                            <h1>{recipe.title}</h1>
                            <p>{recipe.description}</p>
                        </div>
                    </div>
                    {
                        user ? (
                            <div className="functionalitys-recipe-page">
                                <div className="rating-box-recipe-page">
                                    <RatingSystem nameId={recipeId}/>
                                </div>

                                { 
                                    createdByThisUser ? (
                                        <div className="modify-box-button">
                                            <button
                                             className="modify-button"
                                             onClick={() => navigate(`/recipe/${recipeId}/modify-recipe`)}
                                            >
                                                Modify
                                            </button>
                                        </div>
                                    ) : (<></>)
                                }
                            </div>
                        ) : (<></>)
                    }
                </div>
                <article>
                    <div className="ingredients-box-recipe-page">
                        <h2>Ingredients</h2>
                        <ul className="ingredients-recipe-page">
                            {
                             recipe.information?.ingredients?.map((ingredient, i) => {
                                return(
                                    <li key={i}>
                                        <input type="checkbox"/> 
                                        <span>{ingredient.description}</span>
                                    </li>
                                )
                             })   
                            }
                        </ul>
                    </div>
                    
                    <div className="recipe-info-box">
                        <ul className="recipe-info">
                            <li>
                                <span><strong>Prep:</strong> {recipe.information?.prep_time}</span>
                            </li>
                            <li>
                                <span><strong>Cook:</strong> {recipe.information?.cook_time}</span>
                            </li>
                            <li>
                                <span><strong>Total:</strong> 1h</span>
                            </li>
                            <li>
                                <span><strong>Yield:</strong> {recipe.information?.amount_yield} servings</span>
                            </li>
                        </ul>
                    </div>

                    <div className="cook-note">
                        <h2>Cook's notes</h2>
                        <p>{recipe.information?.cook_note}</p>
                    </div>

                </article>
                
                <div className="directions-box-recipe-page">
                    <ul className="directions-recipe-page">
                        {
                            recipe.information?.directions?.map((direction, i) => {
                                return(
                                    <li key={i}>
                                        <div className="step-box">
                                            <input type="checkbox" />
                                            <h3>Step {i}</h3>
                                        </div>
                                        <p>{direction.description}</p>
                                    </li>
                                )
                        })}
                    </ul>
                </div>
            </div>
            {
                createdByThisUser ? (
                    <div className="delete-button-box">
                        <button onClick={() => setConfirmDelete(true)}>Delete</button>
                        {
                            confirmDelete ? (
                                <div className='confirm-delete'>
                                    <div className="confirm-delete-box">
                                        <h3>Are you sure about that?</h3>
                                        <span>You won't be able to revert this</span>
                                        <div className="confirm-delete-buttons">
                                            <button className="yes" onClick={deleteRecipe}>Yes, delete it</button>
                                            <button className="cancel" onClick={() => setConfirmDelete(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (<></>)
                        }
                    </div>
                ) : (<></>)
            }
            
        </div>
    )
}


