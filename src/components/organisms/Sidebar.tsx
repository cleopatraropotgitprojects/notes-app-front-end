import {
    FileText,
    Download,
    Trash2,
    LayoutDashboard,
    Music,
    Volume2,
    HelpCircle,
    Code,
    Plus,
    MoreVertical,
} from 'lucide-react'
import {cn} from "../../lib/utils";

const navTop = [
    { label: 'Templates', icon: FileText, active: false },
    { label: 'Import', icon: Download, active: false },
    { label: 'Trash', icon: Trash2, active: false },
]

const workspace = [
    { label: 'Notes', icon: FileText, active: true },
    { label: 'Tasks', icon: LayoutDashboard, active: false },
    { label: 'Announcements', icon: Volume2, active: false },
    { label: 'Music', icon: Music, active: false },
    { label: 'Questions', icon: HelpCircle, active: false },
    { label: 'Dashboard', icon: LayoutDashboard, active: false },
    { label: 'Development', icon: Code, active: false },
    { label: 'Swift', icon: LayoutDashboard, active: false },
]

export const Sidebar = () => {
    return (
        <aside className="w-64 h-screen border-r px-5 py-6 flex flex-col justify-between bg-white">
            <div>
                <nav className="space-y-4">
                    {navTop.map(({ label, icon: Icon }) => (
                        <div key={label} className="flex items-center gap-3 text-sm text-black hover:opacity-80 cursor-pointer">
                            <Icon size={18} />
                            {label}
                        </div>
                    ))}
                </nav>
                <div className="mt-8">
                    <p className="text-xs text-gray-400 uppercase mb-2">Workspace</p>
                    <div className="space-y-3">
                        {workspace.map(({ label, icon: Icon, active }) => (
                            <div
                                key={label}
                                className={cn(
                                    'flex items-center justify-between cursor-pointer group',
                                    active ? 'text-black font-medium' : 'text-gray-400 hover:text-black'
                                )}
                            >
                                <div className="flex items-center gap-3 text-sm">
                                    <Icon size={18} />
                                    {label}
                                </div>
                                {label === 'Notes' && (
                                    <MoreVertical size={14} className="text-gray-400 group-hover:text-black" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-sm text-black flex items-center gap-2 cursor-pointer hover:opacity-80">
                <Plus size={18} />
                New Page
            </div>
        </aside>
    )
}
