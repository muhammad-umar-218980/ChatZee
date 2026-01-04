import { useState, useRef, useEffect } from "react";
import { Send, Plus, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ModelIcon from "../components/ModelIcon";
import MessageBubble from "../components/MessageBubble";
import { AI_CONTEXT } from "../constants/aiContext";

const models = [
  "Gemini",
  "DeepSeek",
  "Meta",
  "NVIDIA",
  "Qwen3",
  "Xiaomi",
  "Mistral",
  "kwaipilot",
  "Arcee",
  "Hermes",
];

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Gemini");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!id) {
      setMessages([]);
      setSelectedModel("Gemini");
    } else {
      localStorage.setItem("lastChatSessionId", id);
      fetchChatHistory(id);
    }
  }, [id]);

  const fetchChatHistory = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/chat/${sessionId}`
      );
      const data = await response.json();
      if (data.messages) {
        if (data.modelName) {
          setSelectedModel(data.modelName);
        }
        const cleanedMessages = data.messages.map((msg) => ({
          ...msg,
          content: msg.content.includes("Current User Message:")
            ? msg.content.split("Current User Message:")[1].trim()
            : msg.content,
        }));
        setMessages(cleanedMessages);
      }
    } catch (error) {
      console.error("Fetch History Error:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    let currentId = id;
    if (!currentId) {
      currentId = uuidv4();
      localStorage.setItem("lastChatSessionId", currentId);
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5001/api/chat/${currentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            context: AI_CONTEXT,
            modelName: selectedModel,
          }),
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);

      if (!id) {
        navigate(`/chat/${currentId}`, { replace: true });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    const newSessionId = uuidv4();
    localStorage.setItem("lastChatSessionId", newSessionId);
    setMessages([]);
    setInput("");
    setLoading(false);
    navigate(`/chat/${newSessionId}`);
  };

  const renderInputForm = (isInitial = false) => (
    <div className="w-full max-w-3xl mx-auto relative">
      <form
        onSubmit={handleSendMessage}
        className="relative flex flex-col bg-[#111111] border border-white/10 rounded-[28px] focus-within:border-white/20 transition-all shadow-2xl"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          placeholder={`Ask ChatZee ...`}
          rows={1}
          className="w-full bg-transparent text-white px-6 pt-4 pb-16 focus:outline-none resize-none custom-scrollbar transition-all placeholder:text-gray-500 text-lg"
          style={{ minHeight: "120px", maxHeight: "300px" }}
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/5 border border-white/5 opacity-80 shadow-lg">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/20 overflow-hidden">
              <ModelIcon name={selectedModel} className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              {selectedModel}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-3 bottom-3 p-3 rounded-full bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <Send size={24} />
          )}
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex h-[100dvh] w-full bg-black text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Galaxy Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-white">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/5 bg-black/20 backdrop-blur-md relative">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-gray-400 hover:text-white"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </div>

          {/* Centered Brand */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer z-20"
            onClick={() => navigate("/")}
          >
            <img
              src="/ChatZee.svg"
              alt="ChatZee"
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
            <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ChatZee
            </h1>
          </div>

          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </header>

        {/* Messages or Welcome Section */}
        <div className="flex-1 overflow-y-auto px-4 scroll-smooth custom-scrollbar">
          <div
            className={`w-full max-w-3xl mx-auto flex flex-col ${
              messages.length === 0
                ? "justify-start pt-8 pb-10 min-h-max sm:min-h-full sm:justify-center sm:py-0"
                : "py-6 space-y-6"
            }`}
          >
            {messages.length === 0 ? (
              <div className="w-full text-center">
                <div className="mb-6 sm:mb-10">
                  <h2 className="text-2xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Hello, I'm ChatZee
                  </h2>
                  <p className="text-base md:text-xl text-gray-400 mb-6 sm:mb-8 px-4">
                    How can I help you today?
                  </p>

                  {/* Model Badges Grid */}
                  <div className="flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-10 items-center">
                    {[0, 1].map((row) => (
                      <div
                        key={row}
                        className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
                      >
                        {models.slice(row * 5, (row + 1) * 5).map((model) => (
                          <button
                            key={model}
                            onClick={() => setSelectedModel(model)}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 ${
                              selectedModel === model
                                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                              <ModelIcon
                                name={model}
                                className="w-full h-full"
                              />
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold">
                              {model}
                            </span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  {renderInputForm(true)}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <MessageBubble key={idx} message={msg} />
                ))}
                {loading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                      <Loader2
                        className="animate-spin text-cyan-400"
                        size={16}
                      />
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input Area (Bottom) or Disclaimer */}
        <div
          className={`p-4 transition-all duration-500 ${
            messages.length === 0
              ? "pb-8"
              : "border-t border-white/5 bg-black/40 backdrop-blur-lg"
          }`}
        >
          {messages.length > 0 ? (
            renderInputForm()
          ) : (
            <p className="text-center text-xs text-gray-600">
              ChatZee can make mistakes. Consider checking important info.
            </p>
          )}
          {messages.length > 0 && (
            <p className="text-center text-xs text-gray-600 mt-4">
              ChatZee can make mistakes. Consider checking important info.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
