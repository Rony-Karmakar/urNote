import { Outlet } from "react-router-dom";
import Container from "./Container";

const LandingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* <header className="border-b p-4">Navbar here</header> */}
            <main className="flex-1 p-4">
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}

export default LandingLayout