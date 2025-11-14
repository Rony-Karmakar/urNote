import { Outlet } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";

const LandingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b py-2 px-4"><Navbar /></header>
            <main className="flex-1 p-4">
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}

export default LandingLayout