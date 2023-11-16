import DB from "./DB/index.js"


function PlaylistRoute(app) {

    app.get("/api/playlistdetail/:pid", (req, res) => {
        const { pid } = req.params
        const detail = DB.PlaylistDetail.find((item) => item._id === parseInt(pid))
        res.json(detail)
    })

    app.put("/api/playlistViewUpdate/:pid", (req, res) => {
        const { pid } = req.params
        const connection = req.dbConnection
        const query = "update playlist set views = views +1 where id = ?"
        connection.execute(query, [pid], (err, result) => {
            connection.unprepare(query)
            res.sendStatus(204);
        })
    })

    app.get("/api/playlistRec", (req, res) => {
        const connection = req.dbConnection
        const query = "select id,name,views from playlist where public = 1 order by views desc limit 10"
        connection.execute(query, (err, result) => {
            connection.unprepare(query)
            res.json(result);
        })
    })
}

export default PlaylistRoute