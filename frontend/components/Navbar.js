import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    return (
        <header className="bg-purple-200 p-4 flex justify-between items-center">
            {/* ชื่อเว็บ (คลิกแล้วไปหน้า Home) */}
            <Link href="/" className="text-2xl font-bold hover:opacity-80">
                Animepedia
            </Link>

            <div className="flex items-center space-x-4">
                {/* ปุ่ม Home (คลิกแล้วก็ไปหน้า Home) */}
                <Link href="/" className="underline text-sm hover:text-indigo-600">
                    Home
                </Link>

                {/* Avatar */}
                <Image
                    src="https://drive.google.com/uc?export=view&id=1l4KMoXmlHhokSO4v04prDHBduxehzvky"
                    width={32}
                    height={32}
                    alt="User avatar"
                    className="rounded-full"
                />
            </div>
        </header>
    )
}
