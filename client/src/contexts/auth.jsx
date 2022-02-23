import { createContext, useEffect, useState } from "react";

import { api } from '../services/api';

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
    const [ user, setUser ] = useState(null)

    async function signInWithGithub() {
        const response = await api.get('github')
        const gitOauthUrl = await response.data

        window.location.assign(gitOauthUrl)
    }

    function logOutFromGithub() {
        setUser(null)
        localStorage.removeItem('@recipesite:token')
    }

    async function fecthTokenAndUserDataFromGithub(githubCode) {
        const response = await api.post('authenticate', { code: githubCode })
        const { token, user: userData } = await response.data

        localStorage.setItem('@recipesite:token', token)

        setUser(userData)
    }

    useEffect(() => {
        const token = localStorage.getItem('@recipesite:token')

        async function fetchUser(){
            if(token) {
                api.defaults.headers.common.authorization = `Bearer ${token}`

                const response = await api.get('profile')
                setUser(response.data)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')

        if(hasGithubCode) {
            const [ homePageUrl, githubCode] = url.split('?code=')

            window.history.pushState({}, '', homePageUrl)

            fecthTokenAndUserDataFromGithub(githubCode)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInWithGithub, logOutFromGithub, user }}>
            {props.children}
        </AuthContext.Provider>
    )
}