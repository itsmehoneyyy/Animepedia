import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { SWRConfig } from 'swr'
import api from '../lib/api'
import { AuthProvider } from '../context/AuthContext'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: (url) => api.get(url).then(res => res.data),
          onError: (err) => {
            console.error('SWR Error:', err)
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </AuthProvider>
  )
}

export default MyApp
