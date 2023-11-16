
function SongRoutes(app) {
    app.get("/api/genreRec/:genre", (req, res) => {
        const { genre } = req.params
        const connection = req.dbConnection;
        const query = "select id, userName, title from songs where genre = ? order by likes desc limit 20"
        connection.execute(query,[genre],(err,result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.get("/api/topSongs", (req, res) => {
        const connection = req.dbConnection
        const query = "select id,userName,title from songs order by likes desc limit 18"
        connection.execute(query,(err,result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.get("/api/newRelease", (req, res) => {
        const connection = req.dbConnection
        const query = "select id,userName,title from songs order by release_date desc limit 24"
        connection.execute(query,(err,result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.get("/api/song/:sid", (req, res) => {
        const { sid } = req.params
        const connection = req.dbConnection
        const query = "select * from songs where id = ?"
        connection.execute(query,[sid],(err,result) => {
            result = result.map((item) => {
                return {
                    ...item,
                    lyrics: item.lyrics.replace(/\n/g, '<br/>').replace(/\t/g, '')
                }
            })
            connection.unprepare(query);
            res.json(result);
        })
    })

    app.get("/api/comment/:sid", (req, res) => {
        const {sid} = req.params
        const connection = req.dbConnection
        const query = "select * from comments where sid = ?"
        connection.execute(query,[sid],(err,result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })
}

export default SongRoutes