import { useState, useEffect } from 'react'
import api from '../lib/api'
import Banner from '../components/Banner'
import FilterBar from '../components/FilterBar'
import AnimeCard from '../components/AnimeCard'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const [allAnimes, setAllAnimes] = useState([])
  const [filteredAnimes, setFilteredAnimes] = useState([])
  const [filters, setFilters] = useState({ genres: [], platforms: [], sort: '' })
  const [searchTerm, setSearchTerm] = useState('')

  // โหลด anime ทั้งหมดครั้งแรก
  useEffect(() => {
    api.get('/animes/').then(r => {
      setAllAnimes(r.data)
      setFilteredAnimes(r.data)
    })
  }, [])

  // ถ้ามี query ?genre=xxx → ตั้งค่า filter
  useEffect(() => {
    const genreFromQuery = router.query.genre
    if (genreFromQuery) {
      setFilters(prev => ({
        ...prev,
        genres: [genreFromQuery]
      }))
    }
  }, [router.query.genre])

  // เรียก API เมื่อ filter จาก query ถูกเซ็ต
  useEffect(() => {
    if (filters.genres.length > 0) {
      handleSearchClick()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.genres])

  // client-side search
  useEffect(() => {
    const lower = searchTerm.toLowerCase()
    setFilteredAnimes(
      allAnimes.filter(a =>
        a.title_th.toLowerCase().includes(lower) ||
        a.title_en.toLowerCase().includes(lower) ||
        a.description.toLowerCase().includes(lower)
      )
    )
  }, [searchTerm, allAnimes])

  const handleSearchClick = () => {
    const qp = new URLSearchParams()
    filters.genres.forEach(g => qp.append('genres__name', g))
    filters.platforms.forEach(p => qp.append('platforms__name', p))
    if (filters.sort) qp.append('ordering', filters.sort)
    api.get(`/animes/?${qp.toString()}`).then(r => {
      setAllAnimes(r.data)
      setSearchTerm('')
    })
  }

  return (
    <>
      <Banner searchTerm={searchTerm} onSearch={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-12">
        <FilterBar filters={filters} setFilters={setFilters} onSearchClick={handleSearchClick} />

        <h2 className="text-2xl font-bold">Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredAnimes.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </>
  )
}
