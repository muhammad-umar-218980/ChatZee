import { GoogleGenAI } from "@google/genai";
import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

// Gemini Model
export const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// OpenRouter Setup
export const openrouterAI = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// OpenRouter Models
export const openRouterModels = {
  Meta: "meta-llama/llama-3.1-405b-instruct:free",
  DeepSeek: "tngtech/deepseek-r1t2-chimera:free",
  NVIDIA: "nvidia/nemotron-3-nano-30b-a3b:free",
  Qwen3: "qwen/qwen3-coder:free",
  Mistral: "mistralai/devstral-2512:free",
  Xiaomi: "xiaomi/mimo-v2-flash:free",
  kwaipilot: "kwaipilot/kat-coder-pro:free",
  Arcee: "arcee-ai/trinity-mini:free",
  Hermes: "nousresearch/hermes-3-llama-3.1-405b:free",
};
