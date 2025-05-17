import Image from 'next/image'
import SearchBar from './SearchBar'

export default function Banner({ searchTerm, onSearch }) {
    return (
        <div className="relative w-full h-72">
            <Image
                src="https://drive.google.com/uc?export=view&id=1gEATKbl7EYUv-Uq_l5zDIL-BAOtDzpxS"
                alt="Banner"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4 text-center">
                <h1 className="text-4xl font-extrabold text-white mb-4">Animepedia</h1>
                <div className="w-full max-w-md">
                    <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
                </div>
            </div>
        </div>
    )
}
