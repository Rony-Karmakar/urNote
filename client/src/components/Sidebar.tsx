import { useEffect, useState } from "react";
import { Menu, FileText } from "lucide-react";
import { getNotes } from "@/services/notesApi";
import { useNoteStore } from "@/store/noteStore";
import NavItem from "./NavItem";

type SidebarProps = {
    mobileOpen: boolean;
    onMobileClose: () => void;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ mobileOpen, onMobileClose, collapsed, setCollapsed }: SidebarProps) {
    const notes = useNoteStore((state) => state.notes);

    useEffect(() => {
        getNotes();
    }, []);

    // On desktop we allow collapse.
    // On mobile, we always show full sidebar when open.
    const isCollapsedForDesktop = collapsed;
    const collapsedForNav = isCollapsedForDesktop && !mobileOpen;

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            <aside
                className={`
          fixed inset-y-0 left-0 z-40 border-r
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
          ${isCollapsedForDesktop ? "md:w-0 w-64" : "md:w-64 w-64"}
        `}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between md:justify-between px-2 py-2 border-b">
                    {/* Mobile close button (left) */}
                    <button
                        className="md:hidden p-1 rounded "
                        onClick={onMobileClose}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Username / logo (hidden when fully collapsed on desktop) */}
                    {!isCollapsedForDesktop && (
                        <div className="hidden md:block text-sm font-medium">
                            Ron
                        </div>
                    )}

                    {/* Desktop collapse toggle */}
                    <button
                        className="hidden md:flex p-1 rounded ml-auto"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex flex-col gap-1 px-2 py-3 overflow-y-auto h-[calc(100vh-44px)]">
                    {notes.map((note) => (
                        <NavItem
                            key={note._id}
                            to={`/app/notes/${note._id}`}
                            icon={<FileText className="w-5" />}
                            label={note.title ?? "New Note"}
                            collapsed={collapsedForNav} // labels hide only when desktop-collapsed
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}
