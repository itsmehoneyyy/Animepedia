import { useState, useEffect } from 'react'
import Image from 'next/image'
import api from '../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [posterUrl, setPosterUrl] = useState(null)

    useEffect(() => {
        api.get('/animes/').then(res => {
            const random = res.data[Math.floor(Math.random() * res.data.length)]
            setPosterUrl(random.poster_url)
        })
    }, [])

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            })
            if (res.ok) {
                router.push('/signin')
            } else {
                const data = await res.json()
                alert(data.detail || 'Signup failed')
            }
        } catch (err) {
            console.error(err)
            alert('Error connecting to server')
        }
    }

    return (
        <div className="flex h-screen">
            {/* ฝั่งรูปโปสเตอร์ */}
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
                <form onSubmit={handleSignup} className="border border-purple-400 rounded p-6 space-y-4 w-2/3 max-w-md bg-white bg-opacity-90">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full border p-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                    <button type="submit" className="w-full bg-black text-white p-2 rounded">Sign Up</button>
                    <p className="text-center text-sm mt-2">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-purple-600">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
