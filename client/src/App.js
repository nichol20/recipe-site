import { React } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Homepage } from './components/Homepage/Homepage'
import { ContactUs } from './components/ContactUs/ContactUs'
import { Menu } from './components/Menu/Menu'
import { About } from './components/About/About'
import { RecipePage } from './components/RecipePage/RecipePage'
import { CreateRecipePage } from './components/CreateRecipePage/CreateRecipePage'
import { ModifyRecipePage } from './components/ModifyRecipePage/ModifyRecipePage'

import './global.css'

export const App = () => {
    return(
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/about' element={<About />} />
            <Route path='/recipe/:recipeId' element={<RecipePage />} />
            <Route path='/menu/create-recipe' element={<CreateRecipePage />} />
            <Route path='/recipe/:recipeId/modify-recipe' element={<ModifyRecipePage />} />
        </Routes>
    )
}