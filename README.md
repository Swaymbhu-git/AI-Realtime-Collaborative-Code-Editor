# 🚀 Live Collaborative Code Editor

A real-time, browser-based collaborative code editor built with **React, Node.js, and Socket.IO**. Have you ever wanted to code with your team simultaneously in a shared environment, just like in Google Docs? This application makes it possible, allowing multiple users to join a room and see code changes synced live across all screens.

🔗 **Live Demo:** [https://code-editor-pink-ten.vercel.app/](https://code-editor-pink-ten.vercel.app/)

The backend server may be inactive due to periods of inactivity. After clicking the live demo link, please allow up to one minute for the server to start. Once it’s running, all features will function as intended.

---

## ✨ Features

* **Real-time Code Syncing:** Code updates instantly across all clients in the room using a WebSocket-based sync layer.
* **Shared Rooms:** Users can create a new room with a unique ID or join an existing one.
* **Live Participant List:** See who's currently connected and coding in the room with live avatars.
* **Username Assignment:** Users are prompted for a username before entering a room.
* **Copy Room ID:** Easily share the room ID with a single click to invite collaborators.
* **Real-time Notifications:** Receive toast notifications when users join or leave the room.
* **Server-Authoritative State:** The backend acts as the single source of truth for code, ensuring new users are instantly synced with the latest version.

---

## 🛠️ Tech Stack

#### Frontend:
* **Framework:** React 19
* **Build Tool:** Vite
* **Real-time Communication:** Socket.IO Client
* **Routing:** React Router DOM
* **UI Components:** React Avatar, React Hot Toast
* **Code Editor:** CodeMirror 5

#### Backend:
* **Runtime:** Node.js
* **Framework:** Express.js
* **Real-time Communication:** Socket.IO
* **Module System:** ES Modules

---

## 🔧 Getting Started Locally

Follow these instructions to run the project on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Swaymbhu-git/Code-Editor.git](https://github.com/Swaymbhu-git/Code-Editor.git)
    cd Code-Editor
    ```

2.  **Install all dependencies:**
    ```bash
    npm ci
    ```
    *This uses the `package-lock.json` to ensure exact dependencies are installed.*

3.  **Create your environment file:**
    Create a `.env` file by duplicating the example file.
    ```bash
    cp .env.example .env
    ```
    *No changes are needed in this file for local development.*

4.  **Run the Application:**
    You need to run the backend server and the frontend client in two separate terminals.

    * **Terminal 1: Run the Backend Server**
        ```bash
        npm run server:dev
        ```
        The server will be running on `http://localhost:5001`.

    * **Terminal 2: Run the Frontend Client**
        ```bash
        npm run dev
        ```
        The application will be live at the address provided by Vite (usually `http://localhost:5173`).

---

## ☁️ Deployment

The application is deployed with a decoupled front-end and back-end architecture.

* **Frontend:** The React/Vite application is hosted on **[Vercel](https://vercel.com/)**.
* **Backend:** The Node.js, Express, and Socket.IO server is hosted on **[Render](https://render.com/)**.
    * **Backend URL:** `https://code-editor-backend-93gb.onrender.com/`

---

## 👤 Author

**Himanshu Patel**
* **GitHub:** [@Swaymbhu-git](https://github.com/Swaymbhu-git)
* **LinkedIn:** [linkedin.com/in/himanshu-patel](https://www.linkedin.com/in/himanshu-patel-b62a64222/)

---

## 📜 License

This project is licensed under the MIT License.