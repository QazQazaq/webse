
# Interview Voicebot - Portable Setup

## Setup Instructions

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/

2. **Set up your Gemini API Key**
   - Edit the `.env` file
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the voicebot**
   - Open your browser to `http://localhost:3000`

## Your Current Gemini API Key
Your key from Replit Secrets is ready to use in the `.env` file.

## Folder Structure
```
interview-voicebot/
├── package.json          # Dependencies and scripts
├── server.js            # Main server file
├── .env                 # Environment variables (API key)
├── public/
│   └── index.html       # Web interface
└── README.md           # This file
```

## Customization
Edit the `personalContext` section in `server.js` to update the interview responses with your own information.
