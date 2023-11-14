import db from "./DB/index.js"

function SongRoutes(app){
    app.get("/api/genreRec/:genre", (req,res) => {
        const {genre} = req.params
        const songs =  db.Songs.filter((item) => item.genre === genre)
        res.send(songs)
    })

    app.get("/api/topSongs", (req,res) => {
        //Temp holder, modifiy to return at 
        //most 18 songs order by likes/views after db established
        res.json(db.Songs)
    })

    app.get("/api/newRelease", (req,res) =>{
        //Temp holder, modifiy to return at most 24 songs
        //order by release date after db established
        res.json(db.Songs)
    })
    
    app.get("/api/song/:sid", (req,res) => {
        const {sid} = req.params
        const result = db.Songs.find((item) => (item._id) === parseInt(sid))
        res.json(result)
    })

    app.get("/api/comment/:sid",(req,res) => {
        
    })
}

export default SongRoutes