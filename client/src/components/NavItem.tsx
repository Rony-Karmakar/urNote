import { Ellipsis, Notebook, Plus } from 'lucide-react';
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
            className="flex justify-between relative group items-center gap-3 px-3 py-2 hover:bg-muted rounded-md transition"
        >
            <div className='flex gap-1 items-center'>
                {icon}
                {!collapsed && <span className="text-sm">{label}</span>}
            </div>

            <div className="absolute right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <Ellipsis className="size-3" />
                <Plus onClick={() => {
                    //createNote()
                    //getNotes()
                }}
                    className="size-3" />
            </div>
        </Link>
    );
}

export default NavItem