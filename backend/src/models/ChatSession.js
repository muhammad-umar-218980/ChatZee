import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  modelName: {
    type: String,
    default: "Gemini",
  },
  messages: [messageSchema],
}, { timestamps: true });

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);

export default ChatSession;
