import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/Auth'
import { Header } from '..'

import { logoImg } from '../../images'
import { githubIcon, googleIcon } from '../../images'

import './style.css'

export const LoginPage = () => {
    const { GitHubController } = useContext(AuthContext)
    return (
        <>
            <Header position='absolute' />
            <div className='login-page'>
                <div className="logo-box">
                    <img src={logoImg} alt="logo" />
                </div>
                <div className="login-box">
                    <div onClick={GitHubController.signUp} className="github-login-box">
                        <button className="github-login-button">
                            <img src={githubIcon} alt="github icon" />
                            <span>Sign up with GitHub</span>
                        </button>
                    </div>
                    <div className="google-login-box">
                        <button className="google-login-button">
                            <img src={googleIcon} alt="google icon" />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

