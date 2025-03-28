# Mood Tracker Application

A full-stack web application that helps users track their daily moods, visualize mood patterns, and receive personalized recommendations. The application uses sentiment analysis to analyze text input and provides mood insights through an interactive dashboard.
![WhatsApp Image 2025-03-28 at 05 02 34_013791c0](https://github.com/user-attachments/assets/3db9eaa6-947f-4a52-bf75-e9b4fb1d095f)


## Features

- 🔐 Google Authentication
- 🎙️ Voice Input Support for mood logging
- 📊 Mood Analytics Dashboard
- 📅 Interactive Mood Calendar
- 💡 Personalized Recommendations
- 🔄 Real-time Sentiment Analysis

## Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- Chart.js
- Firebase Authentication
- React Calendar
- Web Speech API

### Backend

- Node.js + Express
- Firebase Admin SDK
- @xenova/transformers (for sentiment analysis)
- CORS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Git

### Frontend Setup

1. Clone the repository

```bash
git clone https://github.com/sailingsam/MoodTracker
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file in the frontend directory

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server

```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory

```bash
cd ../backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file in the backend directory

```env
PORT=5000
FIREBASE_SERVICE_ACCOUNT=your-service-account
CORS_ORIGIN=http://localhost:5173
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

4. Start the development server

```bash
npm run dev
```

## Firebase Setup

1. Create a new Firebase project
2. Enable Google Authentication
3. Create a Firestore database
4. Generate service account credentials
5. Add the credentials to your backend `.env` file
