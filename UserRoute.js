

let currentUser = null

function UserRoutes(app) {

    app.post("/api/login", (req, res) => {
        const { userName, password } = req.query;
        const { dbConnection } = req
        const query = "select userName from users where userName = ? and password = ?"
        dbConnection.execute(query, [userName, password], (err, result) => {
            if (result.length > 0) {
                currentUser = result[0].userName
                res.json(result)
            }
            else {
                res.status(402).json({ error: "Invalid Crential" })
            }
        })
    })

    app.post("/api/register", (req, res) => {
        const {userName,password,email} = req.body
        if(!userName || !password || !email){
            res.status(500).json({ error: "Empty Field Detected" })
        }
        const { dbConnection } = req
        const query = "insert into users(userName,password,email) values(?,?,?)"
        dbConnection.execute(query, [userName, password, email], (err, result) => {
            if (err) {
                res.status(500).json({ error: "Username Already Exist, Choosen another one" })
            }
            else {
                res.sendStatus(204)
            }
        })
    })

    app.get("/api/currentUser", (req, res) => {
        res.json(currentUser)
    })
    app.put("/api/logOut", (req, res) => {
        currentUser = null
        res.json(currentUser)
    })
    app.get("/api/follower/:user", (req, res) => {
        const { user } = req.params
        const connection = req.dbConnection
        const query = "select follower from followers where userName = ?"
        connection.execute(query, [user], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })



    app.get("/api/playlistCreated/:user", (req, res) => {
        const { user } = req.params
        const connection = req.dbConnection
        const query = "select id, name from playlist where userName = ?"
        connection.execute(query, [user], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })

    app.get("/api/following/:user", (req, res) => {
        const { user } = req.params
        const connection = req.dbConnection

        const query = "select userName from followers where follower = ?;"
        connection.execute(query, [user], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })



    app.get("/api/selfFollow", (req, res) => {
        const connection = req.dbConnection
        const query = "select userName from followers where follower = ?;"
        connection.execute(query, [currentUser], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })


    app.get("/api/songCreated/:userName", (req, res) => {
        const { userName } = req.params
        const connection = req.dbConnection
        const query = "select id, title from songs where userName = ?"
        connection.execute(query, [userName], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })

    app.get("/api/basicInfo/:userName", (req, res) => {
        const { userName } = req.params
        const connection = req.dbConnection
        const query = "call get_basic_userInfo(?)"
        connection.execute(query, [userName], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })

    app.put("/api/follow/:user",(req,res) => {
        const {user} = req.params
        const {dbConnection} = req

        const query = "insert into followers(userName, follower) values(?,?)"
        dbConnection.execute(query,[user,currentUser],(err,result) => {
            dbConnection.unprepare(query)
            res.json(result)
        })
    })

    app.delete("/api/unfollow/:user",(req,res) => {
        const {user} = req.params
        const {dbConnection} = req
        const query = "delete from followers where userName = ? and follower = ?"
        dbConnection.execute(query,[user,currentUser],(err,result) => {
            dbConnection.unprepare(query)
            res.json(result)
        })
    })

    app.put("/api/likeSong/:sid",(req,res) => {
        const {sid} = req.params
        const {dbConnection} = req
        console.log(sid);
        const query = "insert into user_like_songs(id,userName) values(?,?)"
        dbConnection.execute(query,[sid,currentUser],(err,result) =>{
            dbConnection.unprepare(query)
            res.sendStatus(204)
        })
    })

    app.get("/api/likeSong", (req,res) => {
        const {dbConnection} = req
        const query = "select id from user_like_songs where userName = ?"
        dbConnection.execute(query,[currentUser],(err,result) =>{
            dbConnection.unprepare(query)
            res.sendStatus(204)
        })
    })
}

export default UserRoutes