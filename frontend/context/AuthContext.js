import { createContext, useState, useEffect } from 'react'
import api from '../lib/api'
import { useRouter } from 'next/router'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load user when app starts
  useEffect(() => {
    const token = localStorage.getItem('access')
    if (token) {
      setAccessToken(token)
      api.get('/auth/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (access, refresh) => {
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
    setAccessToken(access)
    api.get('/auth/me/', {
      headers: { Authorization: `Bearer ${access}` }
    }).then(res => {
      setUser(res.data)
      router.push('/')
    })
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setUser(null)
    setAccessToken(null)
    router.push('/signin')
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
