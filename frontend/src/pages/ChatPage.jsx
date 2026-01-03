import { useState, useRef, useEffect } from "react";
import { Send, Plus, Loader2, Sparkles } from "lucide-react";
import ModelDropdown from "../components/ModelDropdown";
import MessageBubble from "../components/MessageBubble";

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          modelName: selectedModel,
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
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
    setMessages([]);
    setInput("");
    setLoading(false);
  };

  const renderInputForm = (isInitial = false) => (
    <div
      className={`w-full max-w-3xl mx-auto relative ${
        isInitial
          ? "animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200"
          : ""
      }`}
    >
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
          <ModelDropdown
            models={models}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            isLocked={messages.length > 0}
          />
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
    <div className="flex h-screen bg-black text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Galaxy Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-white">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="text-cyan-400" size={20} />
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                ChatZee
              </h1>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
          >
            <Plus size={16} />
            New Chat
          </button>
        </header>

        {/* Messages or Welcome Section */}
        <div
          className={`flex-1 overflow-y-auto px-4 scroll-smooth custom-scrollbar mt-2 ${
            messages.length === 0 ? "flex items-center justify-center" : "py-6"
          }`}
        >
          <div
            className={`w-full max-w-3xl mx-auto ${
              messages.length === 0
                ? "flex flex-col items-center justify-center -mt-20"
                : "space-y-6"
            }`}
          >
            {messages.length === 0 ? (
              <div className="w-full text-center">
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Hello, I'm ChatZee
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    How can I help you today?
                  </p>
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
