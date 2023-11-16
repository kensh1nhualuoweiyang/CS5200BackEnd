import DB from "./DB/index.js";
import cookieParser from "cookie-parser";

function UserRoutes(app){

    app.post("/api/login", (req,res) => {
        const {userName, password} = req.query;
        //Temp Authentication
        const userData = DB.User.find((item) => item.userName === userName && item.password === password)
        if(userData){
            res.cookie("user",JSON.stringify(userData))
            console.log(res.getHeaders()['set-cookie']);
            res.send("Login Success")
        }
        else{
            res.send("Invalid Credential")
        }
       
    })
}

export default UserRoutes