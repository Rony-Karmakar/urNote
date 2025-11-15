import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1">
                <div className="container mx-auto px-6 py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout