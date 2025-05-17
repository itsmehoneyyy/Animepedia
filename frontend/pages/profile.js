import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import AnimeCard from '../components/AnimeCard'
import Link from 'next/link'
import api from '../lib/api'

export default function Profile() {
  const { user, loading, logout, accessToken } = useContext(AuthContext)
  const [favoriteAnimes, setFavoriteAnimes] = useState([])

  useEffect(() => {
    if (user && accessToken) {
      api.get('/my-list/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(async res => {
        const watchingList = res.data.filter(item => item.status === 'watching')
        const animePromises = watchingList.map(item =>
          api.get(`/animes/${item.anime}/`).then(r => r.data)
        )
        const animeDetails = await Promise.all(animePromises)
        setFavoriteAnimes(animeDetails)
      }).catch(err => {
        console.error('Failed to fetch my-list:', err)
      })
    }
  }, [user, accessToken])

  if (loading) return <p className="p-8">Loading...</p>

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl">กรุณาเข้าสู่ระบบก่อนดูหน้านี้</p>
        <Link href="/signin" className="text-purple-600 underline">ไปหน้าเข้าสู่ระบบ</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-purple-100 p-4 rounded shadow flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold">{user.username}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button onClick={logout} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">Logout</button>
      </div>

      <h3 className="text-xl font-bold mb-4">My Favorite</h3>

      {favoriteAnimes.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีรายการที่เพิ่ม</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favoriteAnimes.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  )
}
