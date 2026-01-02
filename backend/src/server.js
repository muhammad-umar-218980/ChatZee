import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const app = express();
app.use(express.json());

// ---------------------
// Gemini Setup
// ---------------------
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const geminiAI = new GoogleGenAI({
  apiKey: GEMINI_API_KEY
});

// ---------------------
// OpenRouter Setup
// ---------------------
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const openrouterAI = new OpenRouter({
  apiKey: OPENROUTER_API_KEY
});

// ---------------------
// Routes
// ---------------------
app.get("/", (req, res) => {
  res.send("This is the initial backend server for ChatZee");
});

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, modelName } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let reply = "";

    if (!modelName || modelName === "Gemini") {
      // Default Gemini
      const response = await geminiAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message
      });
      reply = response.text;

    } else if (modelName === "DeepSeek") {
      // OpenRouter Free Model
      const response = await openrouterAI.chat.send({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
          { role: "user", content: message }
        ]
      });
      reply = response.choices[0]?.message?.content || "No reply";

    } else {
      return res.status(400).json({ error: "Model not supported" });
    }

    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

// ---------------------
app.listen(5001, () => {
  console.log("Backend server running at http://localhost:5001");
});
