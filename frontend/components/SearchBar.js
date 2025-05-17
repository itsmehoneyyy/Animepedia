import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ searchTerm, onSearch }) {
    return (
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-md mx-auto">
            <FiSearch className="text-gray-500 mr-2" />
            <input
                type="text"
                placeholder="ค้นหาเรื่องย่อ ชื่อเรื่อง ฯลฯ"
                value={searchTerm}
                onChange={e => onSearch(e.target.value)}
                className="bg-transparent flex-1 focus:outline-none"
            />
        </div>
    )
}
