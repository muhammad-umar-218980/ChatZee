# ChatZee 🚀

ChatZee is a powerful, modern MERN-stack chatbot implementation featuring a galaxy-themed UI and multi-model AI capabilities. Built for speed and elegance, ChatZee allows users to interact with various high-quality Large Language Models (LLMs) seamlessly.

<img src="frontend/public/ChatZee.svg" alt="ChatZee Logo" width="120" />

## ✨ Features

- **Multi-Model Support**: Switch between Gemini, DeepSeek, Meta (Llama), NVIDIA, Mistral, and more.
- **Persistent Conversations**: Chat history is securely stored in MongoDB, allowing users to revisit sessions.
- **Galaxy-Themed UI**: A premium, responsive design with ambient glows, smooth transitions, and a clean interface.
- **Smart Context**: Leverages specific AI instructions for consistent personality and domain knowledge.
- **Real-Time Responses**: Optimized for low latency and smooth streaming-like experience.
- **Dynamic Input**: Auto-expanding textarea with integrated model selection.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Axios, React Router 7.
- **Backend**: Node.js, Express 5.
- **Database**: MongoDB (Mongoose).
- **AI Orchestration**: Google Generative AI (Gemini SDK), OpenRouter SDK.

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 20.19.0)
- NPM
- MongoDB account (Atlas or local)
- API Keys for [Google Gemini](https://aistudio.google.com/) and [OpenRouter](https://openrouter.ai/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/muhammad-umar-218980/ChatZee.git
   cd ChatZee
   ```

2. **Install dependencies**:
   Run the following from the root directory to install both frontend and backend dependencies:

   ```bash
   npm run build
   ```

3. **Environment Setup**:
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   NODE_ENV=development
   ```

### Running the Application

1. **Start the Backend**:

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**:
   Open a new terminal and run:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## 📁 Project Structure

```text
ChatZee/
├── backend/            # Express server and API logic
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── controllers/# Business logic for routes
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── server.js   # Server entry point
├── frontend/           # Vite + React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application pages (Home, Chat)
│   │   ├── lib/        # API and utility functions
│   │   └── assets/     # Static assets
└── package.json        # Root scripts for build/start
```

## 👤 Author

**Muhammad Umar**

- GitHub: [@muhammad-umar-218980](https://github.com/muhammad-umar-218980)
