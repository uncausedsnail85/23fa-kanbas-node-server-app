import express from 'express';
import session from "express-session";
import "dotenv/config";
import Hello from "./hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";

// db
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
console.log(`process.env.DB_CONNECTION_STRING: ${process.env.DB_CONNECTION_STRING}`)
console.log("process.env.FRONTEND_URL: " + process.env.FRONTEND_URL)
console.log("CONNECTION_STRING: " + CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING);

const app = express()
// console.log(process.env.FRONTEND_URL);
// if (process.env.FRONTEND_URL.includes(req.headers.origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
// }
var origin = "";
app.use((req, res, next) => {
    // if (process.env.FRONTEND_URL.includes(origin)) {
    //     origin = req.headers.origin;
    // } else {
    //     origin = "www.example.com"
    // }
    // console.log("origin: " + origin);
    origin = req.headers.origin;
    return next();
});
// console.log("origin: " + origin);
app.use(
    cors({
        credentials: true, // support cookies
        origin: process.env.FRONTEND_URL,
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(
    session(sessionOptions)
);

app.use(express.json());

UserRoutes(app);

AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app)
Hello(app)
app.listen(process.env.PORT || 4000);