import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div className="flex-1 flex flex-col">
                {/* Top bar / header */}
                <header className="flex items-center gap-2 px-3 py-2 border-b ">
                    {/* Mobile open button */}
                    <button
                        className="md:hidden p-1 rounded "
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <span className={`${collapsed ? "pl-8" : ""} text-sm p-1`}>Your Notion-like app</span>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
