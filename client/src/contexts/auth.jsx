import { createContext, useEffect, useState } from "react";

import { api } from '../services/api';

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [ user, setUser ] = useState(null)
    const GitHubController = {
        signUp: async () => {
            const response = await api.get('github')
            const gitOauthUrl = await response.data
    
            window.location.assign(gitOauthUrl)
        },

        signOut: () => {
            setUser(null)
            localStorage.removeItem('@recipesite:token')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('@recipesite:token')
        const fetchUser = async () => {
            if(token) {
                api.defaults.headers.common.authorization = `Bearer ${token}`

                const response = await api.get('profile')
                await setUser(response.data)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')
        
        const fecthTokenAndUserDataFromGithub = async githubCode => {
            const response = await api.post('authenticate', { code: githubCode })
            const { token, user: userData } = await response.data

            localStorage.setItem('@recipesite:token', token)
    
            setUser(userData)
        }

        if(hasGithubCode) {
            const [ homePageUrl, githubCode ] = url.split('?code=')
            window.history.pushState({}, '', homePageUrl)
            fecthTokenAndUserDataFromGithub(githubCode)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ GitHubController, user }}>
            {props.children}
        </AuthContext.Provider>
    )
}