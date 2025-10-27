import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    creadentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

import authRouter from "./routes/auth.routes.js"
import healthCheckRouter from "./routes/healthCheck.routes.js"
import notesRouter from "./routes/notes.routes.js"

app.use("/api/v1/healthcheck", healthCheckRouter)

app.use("/api/v1/auth", authRouter)

app.use("api/v1/notes", notesRouter)

app.get("/", (req, res) => {
    res.send("Welcome to basecampy")
})

export default app;