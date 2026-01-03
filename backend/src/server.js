import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("This is the initial backend server for ChatZee");
});

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
