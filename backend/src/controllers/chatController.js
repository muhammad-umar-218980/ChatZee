import { geminiAI, openrouterAI, openRouterModels } from "../models/aiModels.js";
import ChatSession from "../models/ChatSession.js";

export const handleChat = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message, context, modelName } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({ sessionId, messages: [] });
    }

    const historyContext = session.messages.slice(-5).map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n");
    const aiPrompt = `${context || ""}\n\nRecent Conversation:\n${historyContext}\n\nUser: ${message}\nAssistant:`;

    if (modelName) {
      session.modelName = modelName;
    }

    session.messages.push({ role: "user", content: message });

    let reply = "";

    if (!modelName || modelName === "Gemini") {
      const response = await geminiAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: aiPrompt
      });
      reply = response.text;
    } else if (openRouterModels[modelName]) {
      const response = await openrouterAI.chat.send({
        model: openRouterModels[modelName],
        messages: [{ role: "user", content: aiPrompt }]
      });
      reply = response.choices[0]?.message?.content || "No reply";
    } else {
      return res.status(400).json({ error: "Model not supported" });
    }

    session.messages.push({ role: "assistant", content: reply });
    await session.save();

    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};

export const getSessionMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.json({ messages: [], modelName: "Gemini" });
    }

    res.json({ messages: session.messages, modelName: session.modelName || "Gemini" });
  } catch (error) {
    console.error("Fetch Session Error:", error);
    res.status(500).json({ error: "Failed to fetch session messages" });
  }
};
