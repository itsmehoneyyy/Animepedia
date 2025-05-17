import Link from 'next/link'
import { useEffect } from 'react'

export default function LoginPopup({ onClose, autoClose = false }) {
    useEffect(() => {
        if (autoClose) {
            const timeout = setTimeout(() => {
                onClose()
            }, 3000) // ปิดอัตโนมัติหลัง 3 วินาที
            return () => clearTimeout(timeout)
        }
    }, [autoClose, onClose])

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg px-6 py-4 text-center max-w-sm w-full animate-fade-in">
                <p className="text-lg font-medium text-gray-800">กรุณาเข้าสู่ระบบก่อน</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <Link
                        href="/signin"
                        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded text-sm"
                    >
                        ไปหน้าเข้าสู่ระบบ
                    </Link>
                    {!autoClose && (
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-800 text-sm"
                        >
                            ปิด
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
