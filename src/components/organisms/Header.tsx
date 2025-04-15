import {
    Search,
    Download,
    Pin,
    MoreHorizontal,
} from 'lucide-react'

export const Header = () => {
    return (
        <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
            {/* Left + Center */}
            <div className="flex items-center gap-8 flex-1">
                {/* Logo + Title */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-black to-yellow-500" />
                    <span className="font-semibold">Awsmd</span>
                </div>

                {/* Search bar centrat vizual */}
                <div className="flex justify-center flex-1">
                    <div className="relative w-[420px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search notes"
                            className="w-full pl-10 pr-4 py-2 text-sm border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
                <Pin size={18} className="text-gray-400 cursor-pointer hover:text-black" />
                <Download size={18} className="text-gray-400 cursor-pointer hover:text-black" />
                <span className="cursor-pointer hover:text-black">Updates</span>
                <span className="cursor-pointer hover:text-black">Share</span>

                <MoreHorizontal size={18} className="cursor-pointer hover:text-black" />
            </div>
        </header>
    )
}
