# 🔄 CodeSync: AI-Assisted Collaborative Code Editor

**CodeSync** is a real-time, browser-based collaborative code editor built with a modern MERN stack and Socket.IO. It provides a seamless environment for technical interviews and pair programming, allowing multiple authenticated users to write, edit, and execute C++ code simultaneously. The experience is enhanced by an integrated AI assistant, robust session management, and a polished, real-time user interface.

🔗 **Live Demo:** **[codesync-live-demo.vercel.app](https://ai-realtime-collaborative-code-edit.vercel.app/)**

> **Note:** The backend is hosted on a free Render instance, which may "sleep" during periods of inactivity. Please allow up to 60 seconds for the server to wake up on your first visit. Once active, the application will be fully responsive.

---

---

## ✨ Features In-Depth

CodeSync is more than just a shared text area. It's a feature-rich platform designed for a professional and secure collaborative experience.

#### 1. Real-time Collaboration Layer
* **Instant Code Synchronization:** Utilizes a WebSocket connection via Socket.IO to broadcast code changes from one client to all others in the same room. The server acts as the central authority, ensuring that any new participant who joins is instantly synced with the most up-to-date version of the code.
* **Live Participant List:** The sidebar shows a real-time list of every user currently in the room. This list instantly updates when users join, leave, or are disconnected, providing a clear view of the current session participants.

#### 2. Full User Authentication & Security
* **Secure Registration & Login:** Users can create accounts and log in securely. Passwords are never stored as plain text; they are hashed using `bcrypt` before being saved to the database.
* **JWT-Based Authorization:** User sessions are managed using JSON Web Tokens (JWT). After a successful login, the client receives a token which is sent with every subsequent request, allowing the server to verify the user's identity and permissions without needing to query the database every time.
* **Protected Routes:** Both on the client and server, routes are protected. Users cannot access the editor or dashboard without a valid token, and API endpoints are secured to prevent unauthorized access.

#### 3. Integrated AI Programming Assistant
* **On-Demand AI Help:** A slide-in drawer provides access to an AI assistant powered by the Google Gemini API.
* **Context-Aware Prompts:** The AI is automatically fed the current code from the editor, any standard input, and the last execution output, allowing users to ask context-specific questions like "Why is this code failing?" or "Can you explain this function?".
* **Secure API Proxy:** The client never communicates with the Gemini API directly. All requests are sent to our backend server, which securely attaches the secret API key and proxies the request, protecting your credentials.

#### 4. Live C++ Code Execution
* **In-Browser Compilation:** Users can write and execute C++ code directly in the editor. The code is sent to the Judge0 API for compilation and execution.
* **Custom Input (`stdin`):** A dedicated input panel allows users to provide standard input for their programs, making it suitable for solving algorithmic challenges found in technical interviews.
* **Secure API Proxy:** Similar to the AI feature, the client does not hold the Judge0 API key. The backend handles the request securely.

#### 5. Advanced Session & Room Management
* **Owner Privileges:** The user who creates a room is designated as its "owner." Only the owner has the ability to invite new users to the room or to kick existing participants. This is enforced with server-side checks on every request.
* **"Silent Swap" Single Session Guarantee:** To provide a clean UI and prevent confusion, a user can only have one active connection per room. If they join the same room from a new tab or device, the server intelligently and silently disconnects their old session and replaces it with the new one. This prevents duplicate users in the participant list and provides a seamless recovery experience for users with unstable connections.
* **Synchronized Cross-Tab Logout:** The application listens for browser storage events. If a user logs out in one tab, any other open tabs for the application will automatically detect this change and log themselves out, ensuring a consistent state.

#### 6. Polished User Interface
* **Clear Role Identification:** The participant list clearly labels the **`(Owner)`** and indicates which user is **`(You)`**, eliminating ambiguity.
* **Real-time Toast Notifications:** Non-intrusive pop-up notifications from React Hot Toast inform users when others join or leave the room.
* **Default Code Boilerplate:** New rooms are automatically populated with a C++ boilerplate, allowing users to start coding immediately.

---

## 🛠️ Technology & Architecture

CodeSync is built on a modern, decoupled architecture, ensuring scalability and a clear separation of concerns.

* **Frontend (Vite + React):** A fast and modern single-page application built with React 19. State is managed through React Hooks and Context API, and routing is handled by React Router DOM. Real-time communication is managed via the Socket.IO Client.
* **Backend (Node.js + Express):** A robust RESTful API and WebSocket server built with Express.js. It handles user authentication, room management, and acts as a secure proxy for third-party services.
* **Database (MongoDB):** A NoSQL database managed with Mongoose ODM for flexible data modeling of users and rooms.
* **Communication Layer (Socket.IO):** The core of the real-time functionality. A persistent WebSocket connection is used for low-latency, bi-directional communication between the client and server.

---

## 🔧 Getting Started Locally

To run CodeSync on your local machine, you'll need two separate terminals.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Swaymbhu-git/AI-Realtime-Collaborative-Code-Editor](https://github.com/Swaymbhu-git/AI-Realtime-Collaborative-Code-Editor)
    cd CodeSync
    ```

2.  **Setup the Backend:**
    * Navigate to the server directory: `cd server`
    * Install dependencies: `npm install`
    * Create a `.env` file and add your `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `RAPIDAPI_KEY`.
    * Start the server:
        ```bash
        npm run dev
        ```
        The server will be running on `http://localhost:5001`.

3.  **Setup the Frontend:**
    * In a new terminal, navigate to the client directory: `cd client`
    * Install dependencies: `npm install`
    * Create a `.env` file and set `VITE_BACKEND_URL=http://localhost:5001`.
    * Start the client:
        ```bash
        npm run dev
        ```
        The application will be live at the address provided by Vite (e.g., `http://localhost:5173`).

---

## ☁️ Deployment

* **Frontend:** Hosted on **[Vercel](https://vercel.com/)**.
* **Backend:** Hosted on **[Render](https://render.com/)**.

---

## 👤 Author

**Himanshu Patel**
* **GitHub:** [@Swaymbhu-git](https://github.com/Swaymbhu-git)
* **LinkedIn:** [linkedin.com/in/himanshu-patel-b62a64222/](https://www.linkedin.com/in/himanshu-patel-b62a64222/)

---

## 📜 License

This project is licensed under the MIT License.