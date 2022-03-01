import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from '../services/api';

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState(null)
    const GitHubController = {
        signUp: async () => {
            const response = await api.get('github')
            const gitOauthUrl = await response.data
    
            window.location.assign(gitOauthUrl)
        }
    }

    const GoogleController = {
        signUp: async googleData => {
            const response = await api.post('/authenticate-with-google', { token: googleData.tokenId } )
            const { token, user: userData } = await response.data

            localStorage.setItem('@recipesite:token', token)
            
            setUser(userData)
            navigate('/')
        }
    }

    const signOut = () => {
        setUser(null)
        localStorage.removeItem('@recipesite:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@recipesite:token')
        const fetchUser = async () => {
            if(token) {
                api.defaults.headers.common.authorization = `Bearer ${token}`

                try {
                    const response = await api.get('profile')
                    await setUser(response.data)
                } catch (err) {
                    localStorage.removeItem('@recipesite:token')
                }
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')
        
        const fetchGithubData = async githubCode => {
            const response = await api.post('authenticate-with-github', { code: githubCode })
            const { token, user: userData } = await response.data

            localStorage.setItem('@recipesite:token', token)
    
            setUser(userData)
        }

        if(hasGithubCode) {
            const [ homePageUrl, githubCode ] = url.split('?code=')
            window.history.pushState({}, '', homePageUrl)
            fetchGithubData(githubCode)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ GitHubController, GoogleController, signOut, user }}>
            {props.children}
        </AuthContext.Provider>
    )
}