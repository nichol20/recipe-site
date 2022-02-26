import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'

import { RecipeCard } from '../RecipeCard/RecipeCard'
import { Header } from '../Header/Header'
import { LoginPage } from '../index'

import './style.css'
import { addIcon, removeIcon } from '../../images'
import { AuthContext } from '../../contexts/Auth'

export const CreateRecipePage = (props) => {
  const { user } = useContext(AuthContext)
  const { recipeId } = useParams()
  const navigate = useNavigate()
  const [ recipeName, setRecipeName] = useState('')
  const [ imageLink, setImageLink ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ cookTime, setCookTime ] = useState('')
  const [ cookTimeUnit, setCookTimeUnit ] = useState('min')
  const [ prepTime, setPrepTime ] = useState('')
  const [ prepTimeUnit, setPrepTimeUnit ] = useState('min')
  const [ cookNote, setCookNote ] = useState('')
  const [ amountYield, setAmountYield ]= useState()
  const [ ingredients, setIngredients ] = useState([])
  const [ directions, setDirections ] = useState([])
  const { 
    props_title, 
    recipe_description,
    props_ingredients, 
    props_directions,
    prep_time,
    cook_time, 
    cook_note, 
    amount_yield,
    props_image,
    modify
  } = props

  const RecipeController = {
    createRecipe: async event => {
      event.preventDefault()
  
      await api.post('recipes', {
        title: recipeName,
        image: imageLink,
        recipe_description: description,
        ingredients: ingredients,
        directions: directions,
        cook_time: `${cookTime} ${cookTimeUnit}`,
        prep_time: `${prepTime} ${prepTimeUnit}`,
        cook_note: cookNote,
        amount_yield: amountYield
      })
  
      navigate('/menu')
    },

    modifyRecipe: async () => {
      await api.put(`recipes/${recipeId}/modify-recipe`, 
      {
        title: recipeName,
        image: imageLink,
        recipe_description: description,
        ingredients: ingredients,
        directions: directions,
        cook_time: `${cookTime} ${cookTimeUnit}`,
        prep_time: `${prepTime} ${prepTimeUnit}`,
        cook_note: cookNote,
        amount_yield: amountYield
      })
  
      navigate('/menu')
    }
  }

  const IngredientsController = {
    handleChangeInputFields: (e, index) => {
      let newIngredientsValues = [...ingredients]
      newIngredientsValues[index].description = e.target.value
      setIngredients(newIngredientsValues)
    },

    addInputFields: () => {
      setIngredients([...ingredients, { description: '' }])
    },

    removeInputFields: i => {
      let newIngredientsValues = [...ingredients]
      newIngredientsValues.splice(i, 1)
    
      setIngredients(newIngredientsValues)
      IngredientsController.handleInputUpdate(newIngredientsValues)
    },

    handleInputUpdate: arrayUpdated => {
      const inputList = document.querySelector('.ingredients-input-list')
      for(let i = 0; i < arrayUpdated.length; i++) {
        inputList.children[i].firstChild.value = arrayUpdated[i].description
      }
    }
  
  }

  const DirectionsController = {
    handleChangeTextareaFields: (e, index) => {
      let newDirectionsValues = [...directions]
      newDirectionsValues[index].description = e.target.value
      setDirections(newDirectionsValues)
    },

    addTextareaFields: () => {
      setDirections([...directions, { description: '' }])
    },

    removeTextareaFields: i => {
      let newDirectionsValues = [...directions]
      newDirectionsValues.splice(i, 1)
    
      setDirections(newDirectionsValues)
      DirectionsController.handleInputUpdate(newDirectionsValues)
    },

    handleInputUpdate: arrayUpdated => {
      const textareaList = document.querySelector('.directions-textarea-list')

      for(let i = 0; i < arrayUpdated.length; i++) {
        textareaList.children[i].firstChild.value = arrayUpdated[i].description
      }
    }
  }

  useEffect(() => {
    if(modify) {
      const [ cookAmountTime, cookUnityTime ] = cook_time.split(" ")
      const [ prepAmountTime, prepUnityTime ] = prep_time.split(" ")

      props_ingredients.forEach(ingredient => {
        delete ingredient.id
        delete ingredient.information_id
      })

      props_directions.forEach(direction => {
        delete direction.id
        delete direction.information_id
      })

      setRecipeName(props_title)
      setImageLink(props_image)
      setDescription(recipe_description)
      setCookTime(cookAmountTime)
      setCookTimeUnit(cookUnityTime)
      setPrepTime(prepAmountTime)
      setPrepTimeUnit(prepUnityTime)
      setCookNote(cook_note)
      setAmountYield(amount_yield)
      setIngredients(props_ingredients)
      setDirections(props_directions)

    }
  }, [
    props_title, 
    recipe_description,
    props_ingredients, 
    props_directions,
    prep_time,
    cook_time, 
    cook_note, 
    amount_yield,
    props_image,
    modify
  ])

  if(!user) {
    return <LoginPage />
  }

  return (
    <div className="create-recipe-page">
      <Header />

      <form className="create-recipe-form" onSubmit={RecipeController.createRecipe}>
        <div className="basic-informations">
          <div className="form-box">
              
              <div className="row100">
                <label htmlFor="name">Name</label>
                <input
                 type="text"
                 placeholder="carrot cake"
                 name='name'
                 id="name"
                 defaultValue={recipeName}
                 required
                 onChange={e => setRecipeName(e.target.value)}
                />
              </div>

              <div className="row100">
                <label htmlFor="image">Image</label>
                <input
                 type="url"
                 placeholder="https://example.com/image"
                 name="image"
                 id="image"
                 required
                 defaultValue={imageLink}
                 onChange={e => setImageLink(e.target.value)}
                />
              </div>

              <div className="row100">
                <label htmlFor="description">Description</label>
                <textarea
                 type="text"
                 placeholder="A wonderful carrot cake recipe"
                 name="description"
                 id="description"
                 required
                 defaultValue={description}
                 onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="row30">
                <div className="input-box-row30">
                  <label htmlFor="prep-time">prep</label>
                  <div className="input50"> 
                    <input
                     type="number"
                     name='prep-time'
                     id='prep-time'
                     min="0"
                     max="60"
                     required
                     defaultValue={prepTime}
                     onChange={e => setPrepTime(e.target.value)}
                    />
                    <select
                     name="prep-time-unit" 
                     onChange={e => setPrepTimeUnit(e.target.value)}
                     defaultValue={prepTimeUnit}
                    >
                      <option value="min">min</option>
                      <option value="h">h</option>
                    </select>
                  </div>
                </div>

                <div className="input-box-row30">
                  <label htmlFor="cook-time">cook</label>
                  <div className="input50">
                    <input
                     type="number"
                     name='cook-time'
                     id="cook-time"
                     min="0"
                     max="60"
                     required
                     defaultValue={cookTime}
                     onChange={e => setCookTime(e.target.value)}
                    />
                    <select
                     name="cook-time-unit" 
                     onChange={e => setCookTimeUnit(e.target.value)}
                     defaultValue={cookTimeUnit}
                    >
                      <option value="min">min</option>
                      <option value="h">h</option>
                    </select>
                  </div>
                </div>

                <div className="input-box-row30">
                  <label htmlFor="yield">Yield</label>
                  <div className="input100">
                    <input
                     type="number"
                     name='yield'
                     id='yield'
                     min='0'
                     required
                     defaultValue={amountYield}
                     onChange={e => setAmountYield(Number(e.target.value))}
                    />
                  </div>
                </div>

              </div>

              <div className="row100">
                <label htmlFor="cook-note">cook's note</label>
                <textarea
                 type="text"
                 placeholder="notes"
                 name='cook-note'
                 id="cook-note"
                 required
                 defaultValue={cookNote}
                 onChange={e => setCookNote(e.target.value)}
                />
              </div>

          </div>

          <div className="card-preview">
            <RecipeCard 
              image={imageLink}
              recipeName={recipeName}
              views={Array(1000)}
              reviews={Array(1000)}
              rating={5}
            />
          </div>
        </div>

        <div className="ingredients-create-page">
          <div className="add-box">
            <button
             className="add-button" 
             type="button" 
             onClick={IngredientsController.addInputFields} 
            >
              <img src={addIcon} alt="add ingredient" />
              <span>Add ingredient</span>
            </button>
          </div>

          <ol className='ingredients-input-list'>
            {
              ingredients.map((ingredient,i) => {
                return(
                  <li key={i}>
                    <input
                     type="text"
                     name={`ingredient-${i}`}
                     required
                     defaultValue={ingredient.description}
                     onChange={ e => IngredientsController.handleChangeInputFields(e, i) } 
                    />
                    <button
                     className='remove-button' 
                     type="button" 
                     onClick={() => IngredientsController.removeInputFields(i)}
                    >
                      <img src={removeIcon} alt="delete ingredient" />
                    </button>
                  </li>
                )
              })
            }
          </ol>
        </div>

        <div className="directions-create-page">
          <div className="add-box">
            <button
             className="add-button" 
             type="button" 
             onClick={DirectionsController.addTextareaFields} 
            >
              <img src={addIcon} alt="add direction" />
              <span>Add direction</span>
            </button>
          </div>

          <ol className='directions-textarea-list'>
            {
              directions.map((direction,i) => {
                return(
                  <li key={i}>
                    <textarea
                     type="text" 
                     name={`direction-${i}`} 
                     required
                     defaultValue={direction.description}
                     onChange={ e => DirectionsController.handleChangeTextareaFields(e, i) } 
                    />
                    <button
                     className='remove-button' 
                     type="button" 
                     onClick={() => DirectionsController.removeTextareaFields(i)}
                    >
                      <img src={removeIcon} alt="delete direction"/>
                    </button>
                  </li>
                )
              })
            }
          </ol>
        </div>

        {
          modify ? (
            <div className="modify-box-button">
              <button
               className="modify-button"
               type='button'
               onClick={RecipeController.modifyRecipe}
              >
                  Modify
              </button>
            </div>
          ) : (
            <div className="submit-button-box">
              <button type='submit'>Submit</button>
            </div>
          )
        }
        
      </form>
    </div>
  )
}

