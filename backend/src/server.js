import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;


const ai = new GoogleGenAI({
  apiKey: API_KEY
});


app.get("/", (req, res) => {
  res.send("This is the initial backend server for ChatZee");
});

// Test chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

app.listen(5001, () => {
  console.log("Backend server running at http://localhost:5001");
});
