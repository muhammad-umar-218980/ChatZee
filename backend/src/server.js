import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const API_KEY = process.env.GEMINI_API_KEY;


app.get("/",(req,res,next)=>{
    res.send("This is the initial backend server");
})

app.listen(5001,()=>{
    console.log("Backend server is running on port 5001 on http://localhost:5001");
})