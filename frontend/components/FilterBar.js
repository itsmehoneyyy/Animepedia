import { useState, useEffect } from 'react'
import api from '../lib/api'
import { FaChevronDown } from 'react-icons/fa'

export default function FilterBar({ filters, setFilters, onSearchClick }) {
    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [openMenu, setOpenMenu] = useState(null)

    useEffect(() => {
        api.get('genres/').then(r => setGenres(r.data))
        api.get('platforms/').then(r => setPlatforms(r.data))
    }, [])

    const toggle = (value, list) =>
        list.includes(value) ? list.filter(x => x !== value) : [...list, value]

    const update = (patch) => setFilters({ ...filters, ...patch })

    return (
        <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="relative">
                <button type="button" onClick={() => setOpenMenu(openMenu === 'sort' ? null : 'sort')}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center space-x-1">
                    <span>Sort by</span><FaChevronDown />
                </button>
                {openMenu === 'sort' && (
                    <ul className="absolute mt-1 bg-white border rounded shadow w-40 z-10">
                        {['year', 'avg_rating'].map(opt => (
                            <li key={opt}>
                                <button
                                    type="button"
                                    onClick={() => { update({ sort: opt }); setOpenMenu(null) }}
                                    className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${filters.sort === opt ? 'font-bold' : ''}`}
                                >
                                    {opt.replace('_', ' ')}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Filter menu */}
            <div className="relative">
                <button type="button" onClick={() => setOpenMenu(openMenu === 'filter' ? null : 'filter')}
                    className="px-4 py-2 bg-purple-200 rounded-md hover:bg-purple-300 flex items-center space-x-1">
                    <span>Filter</span><FaChevronDown />
                </button>
                {openMenu === 'filter' && (
                    <div className="absolute mt-1 bg-white border rounded shadow p-4 space-y-3 w-64 z-10">
                        {/* Genres */}
                        <div>
                            <h4 className="font-medium">Genres</h4>
                            <div className="grid grid-cols-2 gap-1 max-h-32 overflow-auto">
                                {genres.map(g => (
                                    <label key={g.id} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={filters.genres.includes(g.name)}
                                            onChange={() => update({ genres: toggle(g.name, filters.genres) })}
                                            className="mr-1"
                                        />
                                        {g.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Platforms */}
                        <div>
                            <h4 className="font-medium">Platforms</h4>
                            <div className="grid grid-cols-2 gap-1 max-h-32 overflow-auto">
                                {platforms.map(p => (
                                    <label key={p.id} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={filters.platforms.includes(p.name)}
                                            onChange={() => update({ platforms: toggle(p.name, filters.platforms) })}
                                            className="mr-1"
                                        />
                                        {p.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ปุ่มค้นหา */}
            <button
                type="button"
                onClick={onSearchClick}
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            >
                ค้นหา
            </button>
        </div>
    )
}
