import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useRouter } from 'next/router'

export default function withAuth(Component) {
    return function Protected(props) {
        const { user } = useContext(AuthContext)
        const router = useRouter()

        useEffect(() => {
            if (!user) {
                router.replace('/signin?next=' + router.pathname)
            }
        }, [user])

        return user ? <Component {...props} /> : null
    }
}
