import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, FileText, Notebook } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getNotes } from "@/services/notesApi";
import { useNoteStore } from "@/store/noteStore";

export default function Sidebar() {
    const { isLoggedIn } = useAuthStore.getState()
    const { notes } = useNoteStore.getState()
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <aside
            className={`border-r h-screen transition-all duration-300 
      ${collapsed ? "w-16" : "w-64"}`}
        >
            {/* Collapse Button */}
            <div className={`p-3 border-b flex items-center ${collapsed ? "justify-end" : "justify-between"}`}>
                {!collapsed && <div>Ron</div>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-muted rounded-md"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-1 p-3">

                {
                    notes.map((note) =>
                        <NavItem
                            key={note._id}
                            to={`/app/notes/${note._id}`}
                            icon={<FileText className="w-5" />}
                            label={note.title ?? "New Note"}
                            collapsed={collapsed}
                        />)
                }

            </nav>
        </aside>
    );
}

type NavItemType = {
    to: string,
    icon?: ReactNode,
    label: string,
    collapsed: boolean
}

function NavItem({ to, icon = <Notebook />, label, collapsed }: NavItemType) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md transition"
        >
            {icon}
            {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
    );
}
