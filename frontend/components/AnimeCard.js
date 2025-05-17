import Image from 'next/image'
import Link from 'next/link'

export default function AnimeCard({ anime }) {
    return (
        <Link
            href={`/animes/${anime.id}`}
            className="block group"
        >
            <div className="relative w-full pb-[140%] overflow-hidden rounded-lg bg-gray-200">
                <Image
                    src={anime.poster_url}
                    alt={anime.title_en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                />
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-800 group-hover:text-indigo-600">
                {anime.title_en}
            </h3>
            <p className="text-xs text-gray-500">Updated 2 days ago</p>
        </Link>
    )
}
