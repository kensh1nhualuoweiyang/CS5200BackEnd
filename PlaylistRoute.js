
function PlaylistRoute(app) {

    app.get("/api/playlistSongDetail/:pid", (req, res) => {
        const { pid } = req.params
        const connection = req.dbConnection
        const query = "call get_playlist_song_detail(?)"
        connection.execute(query,[pid],(err,result)=>{
            connection.unprepare(query)
            res.json(result)
        })
    })

    app.get("/api/playlistDetail/:pid", (req, res) => {
        const { pid } = req.params
        const connection = req.dbConnection
        const query = "select * from playlist where id = ? "
        connection.execute(query,[pid],(err,result)=>{
            connection.unprepare(query)
            res.json(result)
        })
    })

    app.delete("/api/playlist/:sid",(req,res) =>{
        const {sid} = req.params
        const {dbConnection} = req
        const query = "delete from playlist where id = ?"
        dbConnection.execute(query,[sid],(err,result) =>{
            dbConnection.unprepare(query)
            res.sendStatus(204)
        })
    })

    app.put("/api/playlistViewUpdate/:pid", (req, res) => {
        const { pid } = req.params
        const connection = req.dbConnection
        const query = "update playlist set views = views +1 where id = ?"
        connection.execute(query, [pid], (err, result) => {
            connection.unprepare(query)
            res.sendStatus(200);
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

    app.post("/api/playlist",(req,res) => {
        const item = req.body;
        const {dbConnection} = req
        if(item.public===null || !item.name || !item.description){
            res.status(500).json({error:"Invalid/Empty Field Detected"})
            return;
        }
        const query = "call create_playlist(?,?,?,?)"
        dbConnection.execute(query,[item.name,item.public,item.userName,item.description],(err,result) =>{
            if(err){
                console.log(err);
                res.status(500).json({error:err.sqlMessage})
            }
            else{
                res.json(result)
            }
        })
    })


    app.put("/api/addToPlaylist/:pid/:sid",(req,res) => {
        const {pid,sid} = req.params
        const {dbConnection} = req
        const query = "insert into playlist_song_containment(pid,sid) values(?,?)"
        dbConnection.execute(query,[pid,sid],(err,result) =>{
            dbConnection.unprepare(query)
            res.json(result);
        })
    })

    app.delete("/api/playlistSong",(req,res) =>{
        const {pid,id} = req.body
        const {dbConnection} = req
        const query = "delete from playlist_song_containment where pid = ? and sid = ?"
        dbConnection.execute(query,[pid,id],(err,result) =>{
            dbConnection.unprepare(query)
            res.json(result);
        })
    })
}

export default PlaylistRoute