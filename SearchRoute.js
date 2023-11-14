import db from "./DB/index.js"

function SearchRoute(app) {

    app.get("/api/searchSongs/:target",(req,res) =>{
        const {target} = req.params
        const response = db.Songs.filter(item => item.title.toLowerCase().includes(target.toLowerCase()))
        res.json(response)
    })

    app.get("/api/searchPlaylist/:target",(req,res) =>{
        const {target} = req.params
        const response = db.PlaylistDetail.filter(item => item.title.toLowerCase().includes(target.toLowerCase()) )
        res.json(response)
    })
    
    app.get("/api/searchUsers/:target",(req,res) =>{
        const {target} = req.params
        const response = db.User.filter(item=>item.userName.toLowerCase().includes(target.toLowerCase()))
        res.json(response)
    })
}
export default SearchRoute