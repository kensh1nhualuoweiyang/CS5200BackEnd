

function UserRoutes(app) {

    app.post("/api/login", (req, res) => {
        const { userName, password } = req.query;
        //Temp Authentication
        const userData = DB.User.find((item) => item.userName === userName && item.password === password)
        if (userData) {
            res.cookie("user", JSON.stringify(userData))
            console.log(res.getHeaders()['set-cookie']);
            res.send("Login Success")
        }
        else {
            res.send("Invalid Credential")
        }

    })


    app.get("/api/follower/:user", (req, res) => {
        const { user } = req.params
        const connection = req.dbConnection
        const query = "call get_followers(?)"
        connection.execute(query, [user], (err, result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })



    app.get("/api/playlistCreated/:user", (req,res) => {
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
        const query = "call get_followings(?)"
        connection.execute(query, [user], (err, result) => {
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
}

export default UserRoutes