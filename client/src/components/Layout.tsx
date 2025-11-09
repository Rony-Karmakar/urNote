import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b p-4">Navbar here</header>
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout