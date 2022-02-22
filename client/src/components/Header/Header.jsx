import React,{ useState } from 'react';

import './style.css'

import { logoImg } from '../../images';

export const Header = () => {
    const [ classActive, setClassActive ] = useState('')
    
    function toggleMenu() {
        return classActive === '' ? setClassActive('active') : setClassActive('')
    }

    return (
        <header>
            <a href="/"><img src={logoImg} className="logo" alt='' /></a>
            <div className={`options-button ${classActive}`} onClick={toggleMenu}></div>
            <ul className={`navigation ${classActive}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/login">Sign in</a></li>
            </ul>
        </header>
    )
};


