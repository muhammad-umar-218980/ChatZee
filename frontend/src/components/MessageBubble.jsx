import Markdown from "react-markdown";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-lg transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-br-none border border-cyan-500/30"
            : "bg-white/5 text-gray-100 rounded-bl-none border border-white/10 hover:bg-white/10"
        }`}
      >
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none leading-relaxed break-words">
          <Markdown>{message.content}</Markdown>
        </div>
        <div
          className={`text-[10px] mt-2 opacity-60 ${
            isUser ? "text-cyan-100" : "text-gray-400"
          }`}
        >
          {isUser ? "You" : "ChatZee AI"}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
