import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import api from '../../lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import LoginPopup from '../../components/LoginPopup'

export default function AnimeDetail() {
  const router = useRouter()
  const { id } = router.query
  const { user, accessToken } = useContext(AuthContext)

  const [anime, setAnime] = useState(null)
  const [latestReview, setLatestReview] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showAddedMsg, setShowAddedMsg] = useState(false)

  useEffect(() => {
    if (id) {
      api.get(`/animes/${id}/`).then(res => setAnime(res.data))
      api.get(`/animes/${id}/reviews/all/`).then(res => {
        setLatestReview(res.data.results[0])
      })

      if (accessToken) {
        api.get('/my-list/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => {
          const found = res.data.find(item => item.anime === Number(id) && item.status === 'favorite')
          if (found) setIsFavorited(true)
        })
      }
    }
  }, [id, accessToken])

  const handleFavorite = async () => {
    if (!accessToken) {
      setShowPopup(true)
      return
    }

    try {
      await api.post('/my-list/', {
        anime: id,
        status: 'watching'
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setIsFavorited(true)
      setShowAddedMsg(true)
      setTimeout(() => setShowAddedMsg(false), 1500)
    } catch (err) {
      console.error(err)
      alert('Failed to add to favorites')
    }
  }

  if (!anime) return <p className="p-8 text-center">Loading…</p>

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showPopup && <LoginPopup autoClose={true} onClose={() => setShowPopup(false)} />}
      {showAddedMsg && (
        <div className="fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded shadow animate-pulse z-50">
          เพิ่มในรายการโปรดแล้ว!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 relative">
          <Image
            src={anime.poster_url}
            alt={anime.title_th}
            width={400}
            height={600}
            className="rounded-xl"
          />
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 text-2xl"
          >
            {isFavorited ? '💜' : '🤍'}
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{anime.title_th}</h1>
          <h2 className="text-xl text-gray-600">{anime.title_en}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {anime.genre_names.map(name => (
              <Link
                key={name}
                href={`/?genre=${encodeURIComponent(name)}`}
                className="bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300"
              >
                {name}
              </Link>
            ))}
          </div>

          <p><strong>ปี:</strong> {anime.year}</p>
          <p><strong>สตูดิโอ:</strong> {anime.studio}</p>
          <p className="text-gray-800 whitespace-pre-line">{anime.description}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            {anime.platforms_info.map(p => (
              <a
                key={p.name}
                href={p.watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2"
              >
                {p.logo_url && (
                  <Image
                    src={p.logo_url}
                    alt={p.name}
                    width={20}
                    height={20}
                    className="rounded-sm object-contain"
                  />
                )}
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* รีวิวล่าสุด */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <Link href={`/anime/${id}/reviews`} className="text-sm text-gray-600 hover:text-indigo-600">
            SEE ALL &rarr;
          </Link>
        </div>

        {latestReview ? (
          <div className="bg-gray-50 p-4 rounded border">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium">{latestReview.username || "Reviewer"}</span>
              <span className="text-sm text-gray-400">{new Date(latestReview.created_at).toLocaleDateString()}</span>
            </div>
            <div className="text-yellow-500 text-sm mb-2">
              {'★'.repeat(latestReview.rating)}{'☆'.repeat(5 - latestReview.rating)}
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line">{latestReview.comment}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">ยังไม่มีรีวิว</p>
        )}

        <div className="mt-4 flex justify-end">
          <Link
            href={`/anime/${id}/reviews`}
            className="text-sm text-gray-600 flex items-center gap-1 hover:text-indigo-600"
          >
            ✍️ Write a Review
          </Link>
        </div>
      </div>
    </div>
  )
}
