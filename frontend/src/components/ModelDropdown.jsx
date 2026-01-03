import { useState, useRef, useEffect } from "react";
import { ChevronDown, Lock, Bot } from "lucide-react";

const ModelDropdown = ({ models, selectedModel, onSelectModel, isLocked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (name) => {
    const iconProps = {
      className:
        "w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110",
    };
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
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        disabled={isLocked}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all duration-300 ${
          isLocked
            ? "cursor-not-allowed bg-white/5 border border-white/5 opacity-60"
            : "hover:bg-white/10 border border-transparent hover:border-white/10 bg-white/5 shadow-lg"
        }`}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/20 overflow-hidden">
          {getIcon(selectedModel)}
        </div>
        <span
          className={`text-sm font-semibold tracking-wide ${
            isLocked ? "text-gray-400" : "text-gray-200"
          }`}
        >
          {selectedModel}
        </span>
        {isLocked ? (
          <Lock size={12} className="text-gray-600" />
        ) : (
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-cyan-400" : ""
            }`}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-3 left-0 w-64 max-h-[400px] overflow-hidden bg-[#161616]/95 backdrop-blur-xl border border-white/10 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 overflow-y-auto max-h-[380px] custom-scrollbar">
            <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] border-b border-white/5 mb-1">
              Select Logic Model
            </div>
            {models.map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => {
                  onSelectModel(model);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 group ${
                  selectedModel === model
                    ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    selectedModel === model
                      ? "bg-cyan-500/20 scale-110"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}
                >
                  {getIcon(model)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold truncate leading-none mb-0.5">
                    {model}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    Standard Model
                  </span>
                </div>
                {selectedModel === model && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDropdown;
