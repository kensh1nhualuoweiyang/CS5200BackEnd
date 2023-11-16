import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import SongRoutes from "./SongRoutes.js"
import PlaylistRoute from "./PlaylistRoute.js"
import SearchRoute from "./SearchRoute.js"
import UserRoutes from "./UserRoute.js"
import mysql from "mysql2"
import readline from "readline"
import { resolve } from "path"
const app = express()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const getDatabaseCredentials = () => {
    return new Promise((resolve) => {
        rl.question("Enter database user: ", (user) => {
            rl.question("Enter database password: ", (password) => {
                resolve({ user, password })
            });
        });
    });
}

let connection;
const initDbConnection = async () => {
    let validCredentials = false;
    let credentials;

    while (!validCredentials) {
        credentials = await getDatabaseCredentials();
        connection = mysql.createConnection({
            host: 'localhost',
            user: credentials.user,
            password: credentials.password,
            database: 'music_app_project'
        });

        await new Promise((resolve) => {
            connection.connect((err) => {
                if (err) {
                    console.log("Invalid credentials. Please try again.");
                    resolve(); 
                    
                } else {
                    validCredentials = true;
                    console.log("Database Connected");
                }
            });
        });
    }
};

initDbConnection()
app.use((req, res, next) => {
    req.dbConnection = connection;
    next()
})
app.use(cors())
app.use(cookieParser())
app.use(express.json())
SongRoutes(app)
PlaylistRoute(app)
SearchRoute(app)
UserRoutes(app)
app.listen(4000)





