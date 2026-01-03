import { Bot, Plus } from "lucide-react";

const ModelSelector = ({
  selectedModel,
  onSelectModel,
  models,
  isOpen,
  onClose,
  isLocked,
  onNewChat,
}) => {
  const getIcon = (name) => {
    const iconProps = { className: "w-5 h-5 object-contain" };
    if (name.includes("Gemini"))
      return <img src="/Gemini.svg" alt="Gemini" {...iconProps} />;
    if (name.includes("DeepSeek"))
      return <img src="/Deepseek.svg" alt="DeepSeek" {...iconProps} />;
    if (name.includes("Meta") || name.includes("Llama"))
      return <img src="/Meta.svg" alt="Meta" {...iconProps} />;
    if (name.includes("NVIDIA") || name.includes("Nemotron"))
      return <img src="/Nvidia.svg" alt="NVIDIA" {...iconProps} />;
    if (name.includes("Mistral") || name.includes("Mixtral"))
      return <img src="/Mistral.svg" alt="Mistral" {...iconProps} />;
    if (name.includes("Qwen"))
      return <img src="/Qwen.svg" alt="Qwen" {...iconProps} />;
    if (name.includes("Xiaomi"))
      return <img src="/Xiaomi.svg" alt="Xiaomi" {...iconProps} />;
    if (name.includes("Hermes"))
      return <img src="/Hermes.svg" alt="Hermes" {...iconProps} />;
    if (name.includes("Kwai") || name.toLowerCase().includes("kwai"))
      return <img src="/KwaiPilot.svg" alt="Kwai" {...iconProps} />;
    if (name.includes("Arcee"))
      return <img src="/Arcee.svg" alt="Arcee" {...iconProps} />;
    return <Bot size={18} />;
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 bg-white/5">
        <Bot className="text-cyan-400 mr-3" />
        <span className="text-lg font-semibold tracking-wide text-white">
          Models
        </span>
        <button
          onClick={onClose}
          className="lg:hidden ml-auto text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-600/20 transition-all duration-200 mb-4 group"
        >
          <Plus
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-semibold">New Chat</span>
        </button>

        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
          Available LLMs
        </div>

        {models.map((model) => (
          <button
            key={model}
            onClick={() => {
              if (isLocked) return;
              onSelectModel(model);
              if (window.innerWidth < 1024) onClose();
            }}
            disabled={isLocked && selectedModel !== model}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 border ${
              selectedModel === model
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : isLocked
                ? "bg-transparent border-transparent text-gray-600 cursor-not-allowed opacity-50"
                : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
          >
            <span
              className={
                selectedModel === model ? "text-cyan-400" : "text-gray-500"
              }
            >
              {getIcon(model)}
            </span>
            <span className="font-medium truncate">{model}</span>
            {selectedModel === model && (
              <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ModelSelector;
