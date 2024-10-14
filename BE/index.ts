import app from "./app";

const PORT = process.env.PORT ?? 8088

const server = app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

process.on("SIGINT", () => {
    server.close(() => { `Exit Server Express` })
})