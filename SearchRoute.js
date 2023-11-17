import db from "./DB/index.js"

function SearchRoute(app) {

    app.get("/api/searchSongs/:target",(req,res) =>{
        const {target} = req.params
        const {dbConnection} = req
        const query = "select * from songs where title like ?";
        dbConnection.execute(query, [`%${target}%`], (err, result) => {
            dbConnection.unprepare(query);
            res.json(result);
        });
    })

    app.get("/api/searchPlaylist/:target",(req,res) =>{
        const {target} = req.params
        const {dbConnection} = req
        const query = "select * from playlist where name like ? and public = 1";
        dbConnection.execute(query, [`%${target}%`], (err, result) => {
            dbConnection.unprepare(query);
            res.json(result);
        });
      
    })
    
    app.get("/api/searchUsers/:target",(req,res) =>{
        const {target} = req.params
        const {dbConnection} = req
        const query = "select * from users where userName like ?";
        dbConnection.execute(query, [`%${target}%`], (err, result) => {
            dbConnection.unprepare(query);
            res.json(result);
        });
    })

    app.get("/api/availableGenre", (req,res) => {
        const connection = req.dbConnection
        const query = "select * from genre"
        connection.execute(query,(err,result) => {
            connection.unprepare(query)
            res.json(result)
        })
    })
}
export default SearchRoute