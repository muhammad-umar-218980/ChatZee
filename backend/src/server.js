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
// Model Mapping
// ---------------------
const openRouterModels = {
  DeepSeek: "tngtech/deepseek-r1t2-chimera:free",
  Qwen3 : "qwen/qwen3-coder:free",
  Mistral : "mistralai/devstral-2512:free",
  Xiaomi : "xiaomi/mimo-v2-flash:free",
  NVIDIA : "nvidia/nemotron-3-nano-30b-a3b:free",
  kwaipilot : "kwaipilot/kat-coder-pro:free",
  Arcee : "arcee-ai/trinity-mini:free",
  Meta : "meta-llama/llama-3.1-405b-instruct:free",
  Hermes : "nousresearch/hermes-3-llama-3.1-405b:free"
};

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

    } else if (openRouterModels[modelName]) {
      // OpenRouter models
      const response = await openrouterAI.chat.send({
        model: openRouterModels[modelName],
        messages: [{ role: "user", content: message }]
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
