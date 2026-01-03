import { useState, useRef, useEffect } from "react";
import { Send, Menu, Loader2, Sparkles } from "lucide-react";
import ModelSelector from "../components/ModelSelector";
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
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am **ChatZee**. \n\nSelect a model and ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Gemini");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I am **ChatZee**. \n\nSelect a model and ask me anything!",
      },
    ]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Galaxy Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Sidebar */}
      <ModelSelector
        models={models}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isLocked={messages.length > 1}
        onNewChat={handleNewChat}
      />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="text-cyan-400" size={20} />
              <h1 className="text-lg font-semibold tracking-tight">
                ChatZee{" "}
                <span className="text-gray-500 font-normal">
                  / {selectedModel}
                </span>
              </h1>
            </div>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                  <Loader2 className="animate-spin text-cyan-400" size={16} />
                  <span className="text-sm text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-lg">
          <form
            onSubmit={handleSendMessage}
            className="max-w-3xl mx-auto relative flex items-end gap-2"
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
              placeholder={`Message ${selectedModel}...`}
              rows={1}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none custom-scrollbar transition-all placeholder:text-gray-500"
              style={{ minHeight: "50px", maxHeight: "200px" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
          <p className="text-center text-xs text-gray-600 mt-2">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
