import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"

import Home from "../pages/Home/HomePage"
import Signin from "../pages/SignIn/SigninPage"
import Signup from "../pages/Signup/Signup"
import Note from "../pages/Notes/Note"

export const router = createBrowserRouter([
    {
        element: <Layout />,                // Layout wraps these pages
        children: [
            { path: "/", element: <Home /> },
            { path: "/notes/:id", element: <Note /> },
        ],
    },
    // Pages without Layout (like auth pages)
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> }
]);