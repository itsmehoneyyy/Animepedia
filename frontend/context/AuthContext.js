import { createContext, useState, useEffect, useContext } from 'react'
import jwtDecode from 'jwt-decode'
import api from '../lib/api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token) {
            const payload = jwtDecode(token)
            setUser({ username: payload.username, exp: payload.exp })
        }
    }, [])

    const login = async (username, password) => {
        const { data } = await api.post('/auth/login/', { username, password })
        localStorage.setItem('access_token', data.access)
        setUser(jwtDecode(data.access))
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
