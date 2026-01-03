import { Bot } from "lucide-react";

const ModelIcon = ({ name, className = "w-5 h-5" }) => {
  const iconProps = {
    className: `${className} object-contain transition-transform duration-300`,
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

  return <Bot className={className} />;
};

export default ModelIcon;
