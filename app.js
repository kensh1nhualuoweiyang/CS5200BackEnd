import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import SongRoutes from "./SongRoutes.js"
import PlaylistRoute from "./PlaylistRoute.js"
import SearchRoute from "./SearchRoute.js"
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
SongRoutes(app)
PlaylistRoute(app)
SearchRoute(app)
app.listen(4000)