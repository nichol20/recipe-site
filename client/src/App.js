import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage, ContactUs, Menu, About, RecipePage, CreateRecipePage, ModifyRecipePage, LoginPage } from './components'

import './global.css'

export const App = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/about' element={<About />} />
            <Route path='/recipe/:recipeId' element={<RecipePage />} />
            <Route path='/menu/create-recipe' element={<CreateRecipePage />} />
            <Route path='/recipe/:recipeId/modify-recipe' element={<ModifyRecipePage />} />
            <Route path='/login' element={<LoginPage />} />
        </Routes>
    )
}