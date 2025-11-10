import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, FileText, Star, Trash } from "lucide-react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`border-r h-screen transition-all duration-300 
      ${collapsed ? "w-16" : "w-64"}`}
        >
            {/* Collapse Button */}
            <div className="p-3 border-b flex justify-end">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-muted rounded-md"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-1 p-3">
                <NavItem
                    to="/"
                    icon={<FileText className="w-5" />}
                    label="All Notes"
                    collapsed={collapsed}
                />
                <NavItem
                    to="/favorites"
                    icon={<Star className="w-5" />}
                    label="Favorites"
                    collapsed={collapsed}
                />
                <NavItem
                    to="/trash"
                    icon={<Trash className="w-5" />}
                    label="Trash"
                    collapsed={collapsed}
                />
            </nav>
        </aside>
    );
}

type NavItemType = {
    to: string,
    icon: ReactNode,
    label: string,
    collapsed: boolean
}

function NavItem({ to, icon, label, collapsed }: NavItemType) {
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
