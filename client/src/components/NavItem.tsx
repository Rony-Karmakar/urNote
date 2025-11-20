import { Notebook } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

type NavItemType = {
    to: string,
    icon?: React.ReactNode,
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

export default NavItem