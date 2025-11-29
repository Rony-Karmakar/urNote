import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/MainLayout"

import Home from "../pages/Home/HomePage"
import Signin from "../pages/SignIn/SigninPage"
import Signup from "../pages/Signup/SignupPage"
import NoteDetail from "../pages/Notes/Note"
import LandingLayout from "@/components/LandingLayout"
import Landing from "@/pages/Landing/LandingPage"

export const router = createBrowserRouter([
    {
        element: <LandingLayout />,
        children: [
            { path: "/", element: <Landing /> }
        ]
    },
    {
        element: <Layout />,                // Layout wraps these pages
        children: [
            { path: "/app", element: <Home /> },
            { path: "/app/notes/:id", element: <NoteDetail /> },
        ],
    },
    // Pages without Layout (like auth pages)
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> }
]);