import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import api from '../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [posterUrl, setPosterUrl] = useState(null)

  const { login } = useContext(AuthContext)

  useEffect(() => {
    api.get('/animes/').then(res => {
      const random = res.data[Math.floor(Math.random() * res.data.length)]
      setPosterUrl(random.poster_url)
    })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        login(data.access, data.refresh)
      } else {
        alert(data.detail || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      alert('Error connecting to server')
    }
  }

  return (
    <div className="flex h-screen">
      {/* ฝั่งรูปภาพ */}
      <div className="w-1/2 h-full relative">
        {posterUrl && (
          <Image
            src={posterUrl}
            alt="Random Poster"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* ฝั่งแบบฟอร์ม */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <form onSubmit={handleLogin} className="border border-purple-400 rounded p-6 space-y-4 w-2/3 max-w-md bg-white bg-opacity-90">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border p-2"
            required
          />
          <button type="submit" className="w-full bg-black text-white p-2 rounded">Sign In</button>
          <p className="text-center text-sm mt-2">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-purple-600">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
