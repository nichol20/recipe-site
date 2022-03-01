import React,{ useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/Auth'

import './style.css'

import { logoImg } from '../../images';

export const Header = ({ position }) => {
    const { signOut, user } = useContext(AuthContext)
    const [ classActive, setClassActive ] = useState('')

    const toggleMenu = () => {
        return classActive === '' ? setClassActive('active') : setClassActive('')
    }

    useEffect(() => {
        const changeColorOfNavigationItem = () => {
            const url = window.location.href
            const domain = 'http://localhost:3000'
            const homeNavigationItem = document.querySelector('#home')
            const menuNavigationItem = document.querySelector('#menu')
            const contactNavigationItem = document.querySelector('#contact')
            const aboutNavigationItem = document.querySelector('#about')
            const loginNavigationItem = document.querySelector('#login')
            
            switch (url) {
                case domain + '/':
                    homeNavigationItem.style.color = 'white'
                    break
                case domain + '/menu':
                    menuNavigationItem.style.color = 'white'
                    break
                case domain + '/contact':
                    contactNavigationItem.style.color = 'white'
                    break
                case domain + '/about':
                    aboutNavigationItem.style.color = 'white'
                    break
                case domain + '/login':
                    loginNavigationItem.style.color = 'white'
                    break
                default:
                    break
    
            }
        }
            
        changeColorOfNavigationItem()
    }, [])

    return (
        <header className={position}>
            <a href="/"><img src={logoImg} className="logo" alt='logo' /></a>
            <div className={`options-button ${classActive}`} onClick={toggleMenu}></div>
            <ul className={`navigation ${classActive}`}>
                <li><a href="/" id="home" >Home</a></li>
                <li><a href="/menu" id="menu" >Menu</a></li>
                <li><a href="/contact" id="contact" >Contact</a></li>
                <li><a href="/about" id="about" >About us</a></li>
                <li>
                    {
                        user ? 
                        (<a href="/" id="login" onClick={signOut}>Sign out</a>)
                         :
                        (<a href="/login" id="login" >Sign in</a>)
                    }
                    
                </li>
            </ul>
        </header>
    )
};


