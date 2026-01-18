# 🏥 Healthcare Wellness & Preventive Care Portal

A comprehensive, full-stack healthcare platform designed to bridge the gap between patients and providers. This portal focuses on preventive care, wellness tracking, and seamless communication, enhanced by an AI Health Assistant.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Key Features

### 👤 Patient Features
-   **Secure Authentication**: Easy registration and login handling specific roles.
-   **Smart Dashboard**: Overview of wellness stats, upcoming appointments, and daily health tips.
-   **Wellness Tracking**: Interactive widgets for monitoring **Steps, Active Time, and Sleep**.
-   **Appointment Booking**: Seamless booking interface to schedule visits with providers.
-   **Goal Setting**: Set and track personal health goals (e.g., "Drink 3L Water").
-   **Preventive Reminders**: Automated reminders for checkups, vaccinations, and tests.

### 👨‍⚕️ Provider Features
-   **Patient Management**: View list of assigned patients and their compliance status.
-   **Appointment Overview**: specific view to manage upcoming appointments.
-   **Compliance Tracking**: Monitor if patients are meeting their health goals.

### 🤖 AI Health Assistant (New!)
-   **Powered by Google Gemini 1.5 Pro**: A smart chatbot available on every page.
-   **Instant Support**: Answers questions about booking, navigation, and general wellness.
-   **Context Aware**: Knows the user's name and provides personalized greetings.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion.
-   **Backend**: Next.js API Routes (Serverless).
-   **Database**: MongoDB (Mongoose ODM).
-   **Authentication**: NextAuth.js (Credentials Provider).
-   **AI Integration**: Google Generative AI SDK (`@google/generative-ai`).
-   **Language**: TypeScript.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shekhar-prajapat1/Healthcare-Portal.git
    cd Healthcare-Portal
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory and add:
    ```env
    # Database
    MONGODB_URI=mongodb://127.0.0.1:27017/healthcare-app

    # Authentication
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key_here

    # AI Configuration
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

5.  **Open the App**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router Pages & API
│   ├── (auth)/           # Login & Register Pages
│   ├── (protected)/      # Dashboards (Patient/Provider)
│   ├── api/              # Backend API Endpoints (Chat, Appointments, etc.)
│   └── layout.tsx        # Root Layout & Providers
├── components/           # Reusable UI Components
│   ├── wellness/         # Wellness Widgets
│   ├── Chatbot.tsx       # AI Chatbot Component
│   └── ...
├── models/               # Mongoose Database Models (User, Appointment, etc.)
├── db/                   # Database Connection Logic
└── auth/                 # NextAuth Configuration
```

## 🔗 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/chat` | Send message to AI Assistant |
| `GET` | `/api/appointments` | Fetch user appointments |
| `POST` | `/api/appointments` | Book a new appointment |
| `GET` | `/api/wellness` | Get daily wellness stats |
| `GET` | `/api/patient/reminders`| Fetch preventive care reminders |

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---
**Developed by Shekhar Prajapat**
