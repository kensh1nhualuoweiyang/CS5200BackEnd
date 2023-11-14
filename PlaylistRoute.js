import DB from "./DB/index.js"


function PlaylistRoute (app) {

    app.get("/api/playlistdetail/:pid", (req,res) => {
        const {pid} = req.params
        const detail = DB.PlaylistDetail.find((item) => item._id === parseInt(pid))
        res.json(detail)
    })

    app.put("/api/playlistViewUpdate/:pid", (req,res) => {
        const {pid} = req.params
        const pIndex = DB.PlaylistDetail.findIndex((item) => item._id === parseInt(pid))
        //Temp placeholder
        DB.PlaylistDetail[pIndex].view += 1
        res.sendStatus(204)
    })

    app.get("/api/playlistRec", (req,res) => {
        // Temporary Placeholder, current returning all playlist, 
        // configure later after db establishment to return at most 10 playlist
        // order by views
        res.json(DB.PlaylistDetail)
    })
}

export default PlaylistRoute