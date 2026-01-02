import { geminiAI, openrouterAI, openRouterModels } from "../models/aiModels.js";

export const handleChat = async (req, res) => {
  try {
    const { message, modelName } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    let reply = "";

    if (!modelName || modelName === "Gemini") {

      const response = await geminiAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message
      });
      reply = response.text;

    } else if (openRouterModels[modelName]) {

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
};
