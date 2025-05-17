import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

export default function Login() {
    const [form, setForm] = useState({})
    const { login } = useAuth()
    const router = useRouter()

    const submit = async e => {
        e.preventDefault()
        await login(form.username, form.password)
        router.push('/')
    }

    return (
        <form onSubmit={submit}>
            <input name="username" onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" required />
            <input name="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" required />
            <button type="submit">Login</button>
        </form>
    )
}
