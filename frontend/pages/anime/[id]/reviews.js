import { useRouter } from 'next/router'
import { useEffect, useState, useContext, useCallback } from 'react'
import api from '../../../lib/api'
import { AuthContext } from '../../../context/AuthContext'
import LoginPopup from '../../../components/LoginPopup'

export default function AnimeReviews() {
    const router = useRouter()
    const { id } = router.query
    const { user, accessToken } = useContext(AuthContext)

    const [reviews, setReviews] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    const fetchReviews = useCallback(async (url = `/animes/${id}/reviews/all/`) => {
        try {
            const res = await api.get(url)
            setReviews(prev => [...prev, ...res.data.results])
            setNextPage(res.data.next)
        } catch (err) {
            console.error('Failed to fetch reviews:', err)
        }
    }, [id])

    useEffect(() => {
        if (id) {
            setReviews([])
            fetchReviews()
        }
    }, [id, fetchReviews])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!accessToken) {
            setShowPopup(true)
            return
        }
        try {
            await api.post(`/animes/${id}/reviews/`, { rating, comment }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setComment('')
            setRating(5)
            setReviews([])
            fetchReviews()
        } catch (err) {
            console.error(err)
            alert('Error posting review')
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-2xl font-bold">All Reviews</h1>

            {user ? (
                <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
                    <div>
                        <label className="block mb-1">Rating (1–5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            className="border px-2 py-1 rounded w-20"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Comment</label>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded">
                        Submit Review
                    </button>
                </form>
            ) : (
                <button onClick={() => setShowPopup(true)} className="underline text-purple-700">
                    Login to write a review
                </button>
            )}

            {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}

            <div className="space-y-4">
                {reviews.map(r => (
                    <div key={r.id} className="border p-4 rounded">
                        <p className="font-semibold">⭐ {r.rating}</p>
                        <p>{r.comment}</p>
                        <p className="text-sm text-gray-500">
                            by {r.username} | {new Date(r.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
                {nextPage && (
                    <button
                        onClick={() => fetchReviews(nextPage)}
                        className="block mx-auto mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Load more
                    </button>
                )}
            </div>
        </div>
    )
}
