
function SongRoutes(app) {
    app.get("/api/genreRec/:genre", (req, res) => {
        const { genre } = req.params
        const connection = req.dbConnection;
        const query = "select id, userName, title from songs where genre = ? order by likes desc limit 20"
        connection.execute(query, [genre], (err, result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.get("/api/topSongs", (req, res) => {
        const connection = req.dbConnection
        const query = "select id,userName,title from songs order by likes desc limit 18"
        connection.execute(query, (err, result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.get("/api/newRelease", (req, res) => {
        const connection = req.dbConnection
        const query = "select id,userName,title from songs order by release_date desc limit 24"
        connection.execute(query, (err, result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.get("/api/song/:sid", (req, res) => {
        const { sid } = req.params
        const connection = req.dbConnection
        const query = "select * from songs where id = ?"
        connection.execute(query, [sid], (err, result) => {
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
        const { sid } = req.params
        const connection = req.dbConnection
        const query = "select * from comments where sid = ?"
        connection.execute(query, [sid], (err, result) => {
            connection.unprepare(query);
            res.json(result)
        })
    })

    app.post("/api/songCreate", (req, res) => {
        const item = req.body
        if (!item.lyrics || !item.title || !item.userName || !item.genre) {
            res.status(500).json({ error: "Invalid/Empty Field Detected" })
            return;
        }
        const connection = req.dbConnection
        const query = "call create_song(?,?,?,?)"
        connection.execute(query, [item.title, item.userName, item.genre, item.lyrics], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.sqlMessage })
            }
            else {
                res.json(result)
            }
        })
    })

    app.put("/api/songUpdate", (req, res) => {
        const item = req.body
        if (!item.lyrics || !item.title || !item.userName || !item.genre) {
            res.status(500).json({ error: "Invalid/Empty Field Detected" })
            return;
        }
        const connection = req.dbConnection
        const query = "update songs set userName = ?,title = ?, lyrics = ?, genre = ? where id = ?"
        connection.execute(query, [item.userName, item.title, item.lyrics, item.genre, item.id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.sqlMessage })
            }
            else {
                res.sendStatus(204)
            }
        })
    })

    app.delete("/api/songs/:sid", (req, res) => {
        const { sid } = req.params
        const { dbConnection } = req
        const query = "delete from songs where id = ?"
        dbConnection.execute(query, [sid], (err, result) => {
            dbConnection.unprepare(query)
            res.sendStatus(204)
        })
    })

    app.post("/api/songComment", (req, res) => {
        const { detail, userName, commentDate, sid } = req.body
        const { dbConnection } = req
        const query = "insert into comments(detail,sid,userName,commentDate) values (?,?,?,?)"
        dbConnection.execute(query, [detail, sid, userName, commentDate], (err, result) => {
            if(err){
                console.log(err);
            }
            dbConnection.unprepare(query)
            res.sendStatus(204)
        })
    })

    app.delete("/api/songComment/:cid", (req, res) => {
        const {cid} = req.params
        const { dbConnection } = req
        const query = "delete from comments where cid = ?"
        dbConnection.execute(query, [cid], (err, result) => {
            if(err)
                console.log(err);
            dbConnection.unprepare(query)
            res.sendStatus(204)
        })
    })

}

export default SongRoutes