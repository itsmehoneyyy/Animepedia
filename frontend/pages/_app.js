import '../styles/globals.css'
import { SWRConfig } from 'swr'
import api from '../lib/api'
import { AuthProvider } from '../context/AuthContext'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: url => api.get(url).then(res => res.data),
          onError: err => console.error('SWR error', err),
        }}
      >
        <Navbar /> {/* ✅ แสดง Navbar ทุกหน้า */}
        <Component {...pageProps} />
      </SWRConfig>
    </AuthProvider>
  )
}

export default MyApp
