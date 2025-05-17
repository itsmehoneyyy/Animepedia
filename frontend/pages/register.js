import { useState } from 'react'
import api from '../lib/api'
import { useRouter } from 'next/router'

export default function Register() {
    const [form, setForm] = useState({})
    const router = useRouter()

    const submit = async e => {
        e.preventDefault()
        await api.post('/auth/register/', form)
        router.push('/login')
    }

    return (
        <form onSubmit={submit}>
            <input name="username" onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" required />
            <input name="email" onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
            <input name="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" required />
            <button type="submit">Register</button>
        </form>
    )
}
