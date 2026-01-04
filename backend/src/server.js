import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
  app.use(cors());
}
app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("This is the initial backend server for ChatZee");
// });

app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
})
