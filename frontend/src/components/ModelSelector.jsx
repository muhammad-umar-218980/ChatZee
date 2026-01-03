import { Bot, Sparkles, Zap, Cpu, Brain, Flame, Box } from "lucide-react";

const ModelSelector = ({
  selectedModel,
  onSelectModel,
  models,
  isOpen,
  onClose,
}) => {
  const getIcon = (name) => {
    if (name.includes("Gemini")) return <Sparkles size={18} />;
    if (name.includes("DeepSeek")) return <Brain size={18} />;
    if (name.includes("Meta") || name.includes("Llama"))
      return <Zap size={18} />;
    if (name.includes("NVIDIA")) return <Cpu size={18} />;
    if (name.includes("Mistral")) return <Flame size={18} />;
    return <Box size={18} />;
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
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
          Available LLMs
        </div>
        {models.map((model) => (
          <button
            key={model}
            onClick={() => {
              onSelectModel(model);
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 border ${
              selectedModel === model
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
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
