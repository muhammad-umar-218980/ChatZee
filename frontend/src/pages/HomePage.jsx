// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center overflow-hidden relative selection:bg-cyan-500 selection:text-black">
      
//       {/* Background Glows */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse animation-delay-4000"></div>
//       </div>

//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

//       <div className="z-10 text-center space-y-10 p-6 max-w-4xl w-full">
        
//         {/* Logo Section */}
//         <div className="relative group mx-auto w-fit">
//           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
//           <div className="relative">
//              <img 
//                src="/ChatZee.svg" 
//                alt="ChatZee AI" 
//                className="w-32 h-32 sm:w-40 sm:h-40 animate-float drop-shadow-[0_0_15px_rgba(79,209,197,0.3)]"
//              />
//           </div>
//         </div>
        
//         {/* Text Content */}
//         <div className="space-y-4">
//           <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 pb-2">
//               Your Smart AI Companion
//             </span>
//           </h1>
          
//           <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
//             Unlock the power of <span className="text-cyan-400 font-normal shadow-cyan-500/50">Gemini AI</span>. 
//             Instant answers, creative ideas, and seamless conversation.
//           </p>
//         </div>
        
//         {/* CTA Button */}
//         <div className="pt-8">
//           <Link 
//             to="/chat" 
//             className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
//           >
//             <span className="relative px-8 py-3.5 transition-all ease-in duration-75 bg-[#050505] rounded-md group-hover:bg-opacity-0 text-lg sm:text-xl">
//               <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300 flex items-center gap-2">
//                 Ask ChatZee
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
//               </span>
//             </span>
//           </Link>
//           <p className="text-gray-500 text-sm mt-4">Powered by Google Gemini • Real-time Responses</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default HomePage;



import { Link } from "react-router-dom";

const features = [
  {
    title: "Fast AI Responses",
    desc: "Get instant, intelligent replies powered by Gemini AI.",
    accent: "cyan",
  },
  {
    title: "Smart Conversations",
    desc: "Context-aware dialogues that feel genuinely human.",
    accent: "purple",
  },
  {
    title: "Secure Chat Sessions",
    desc: "Your conversations are private and encrypted.",
    accent: "cyan",
  },
  {
    title: "Clean, Minimal Interface",
    desc: "Focus on conversation without distractions.",
    accent: "purple",
  },
];

const accentClasses = {
  cyan: {
    bg: "bg-cyan-500/10",
    dot: "bg-cyan-400",
    hoverBg: "group-hover:bg-cyan-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    dot: "bg-purple-400",
    hoverBg: "group-hover:bg-purple-500/20",
  },
};

const tech = ["React", "Node", "Express", "MongoDB", "Gemini AI"];

export default function HomePage() {
  return (
    // IMPORTANT: min-h-screen and overflow-x-hidden prevent extra white space and horizontal scroll
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-cyan-500 selection:text-black">
      {/* Ambient Glows (absolute so they don't affect flow) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[160px]" />
        <div className="absolute bottom-[-160px] right-[-60px] w-[500px] h-[500px] bg-purple-500/10 blur-[160px]" />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 -z-20 opacity-[0.06] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* HERO */}
      <header className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-10">
          <img
            src="/ChatZee.svg"
            alt="ChatZee"
            className="mx-auto h-32 w-32 drop-shadow-[0_0_25px_rgba(0,229,255,0.25)]"
          />
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-6xl font-semibold tracking-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            Where AI Meets Conversation
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed">
          ChatZee is your smart AI companion powered by{" "}
          <span className="text-cyan-400 font-medium">Gemini</span> — fast,
          intelligent, and built for real conversations.
        </p>

        <div className="mt-12">
          <Link
            to="/chat"
            className="group relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium backdrop-blur transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-cyan-300 transition-colors">
              Start Chatting
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
          </Link>

          <p className="mt-5 text-sm text-gray-500">Real-time AI responses • Secure • Minimal</p>
        </div>
      </header>

      {/* ADDITIONAL SECTIONS */}
      <main className="relative z-10">
        {/* WHY CHATZEE */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
            Why <span className="text-cyan-400">ChatZee</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const a = accentClasses[feature.accent];
              return (
                <div key={idx} className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/10">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${a.bg} ${a.hoverBg} transition-colors`}>
                    <div className={`${a.dot} w-2 h-2 rounded-full`} />
                  </div>

                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURE PREVIEW */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
            Feature <span className="text-cyan-400">Preview</span>
          </h2>

          <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
            <div className="border-b border-white/10 p-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-gray-400">ChatZee — AI Conversation</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-none bg-cyan-500/20 border border-cyan-500/30 p-4">
                  <p className="text-white">Explain recursion in simple terms</p>
                  <p className="text-right text-xs text-cyan-300/70 mt-2">User</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-white/10 border border-white/20 p-4">
                  <p className="text-gray-200">
                    Sure! Recursion is when a function calls itself to solve smaller instances of the same problem. Think of it like a set of Russian dolls — each doll contains a smaller version of itself until you reach the smallest one.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">ChatZee AI</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-none bg-cyan-500/20 border border-cyan-500/30 p-4">
                  <p className="text-white">Can you give me a real-world example?</p>
                  <p className="text-right text-xs text-cyan-300/70 mt-2">User</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="flex items-center space-x-2 p-4">
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: "300ms" }} />
                  <span className="text-sm text-gray-500 ml-3">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
            How It <span className="text-cyan-400">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Start a Chat",
                desc: "Click 'Start Chatting' to begin your conversation with ChatZee.",
              },
              {
                step: "02",
                title: "Ask Your Question",
                desc: "Type anything you're curious about — from coding help to creative ideas.",
              },
              {
                step: "03",
                title: "Get Instant AI Responses",
                desc: "Receive intelligent, contextual replies powered by Gemini AI in real-time.",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-white/10 mb-2">{step.step}</div>
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
            Built With Modern <span className="text-cyan-400">Technology</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6 text-lg">
            {tech.map((t, i) => (
              <div key={i} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 cursor-default">
                <span className={t === "Gemini AI" ? "text-cyan-400" : "text-gray-300"}>{t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/ChatZee.svg" alt="ChatZee" className="h-8 w-8" />
              <span className="text-xl font-medium">ChatZee</span>
            </div>

            <div className="text-gray-400 text-center md:text-right">
              <p>Powered by <span className="text-cyan-400">Gemini AI</span></p>
              <p className="text-sm mt-1 text-gray-500">Conversational AI for the modern web</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

