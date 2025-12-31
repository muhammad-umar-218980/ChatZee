import express from "express";

const app = express();

app.get("/",(req,res,next)=>{
    res.send("This is the initial backend server");
})

app.listen(5001,()=>{
    console.log("Backend server is running on port 5001 on http://localhost:5001");
})