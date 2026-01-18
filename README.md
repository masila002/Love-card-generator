# Love Card Generator

AI-powered romantic card generator for Valentine's Day, Birthdays, Anniversaries, and more.

## Features

- 🤖 AI-generated personalized messages using Google Gemini
- 🎨 Beautiful card templates (add your own images to `/images/[occasion]/`)
- 📥 Download cards as PNG/JPG
- 💻 Simple, beautiful UI
- 🚀 Built with Node.js + Express + Vanilla JS

## Project Structure

```
card-generator/
├── backend/
│   ├── server.js              # Express server
│   ├── routes/
│   │   └── cardRoutes.js      # API endpoints
│   └── utils/
│       ├── cardUtils.js       # Card management
│       ├── geminiUtils.js     # Google Gemini API
│       └── imageUtils.js      # Image processing
├── frontend/
│   ├── index.html             # Main page
│   ├── styles.css             # Styling
│   └── script.js              # Frontend logic
├── images/
│   ├── valentine/             # Valentine cards
│   ├── birthday/              # Birthday cards
│   └── anniversary/           # Anniversary cards
├── package.json
└── .env.example
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Add your API key to `.env`:
   ```
   GOOGLE_GEMINI_API_KEY=your_key_here
   PORT=5000
   ```

### 3. Add Card Images

Add your card images to the occasion folders:
- `images/valentine/card1.jpg`, `card2.jpg`, etc.
- `images/birthday/card1.jpg`, `card2.jpg`, etc.
- `images/anniversary/card1.jpg`, `card2.jpg`, etc.

Supported formats: JPG, JPEG, PNG

### 4. Run the Server

```bash
npm start
```

Server will run on `http://localhost:5000`

### 5. Open Frontend

Open `http://localhost:5000` in your browser

## Development

For development with auto-reload:

```bash
npm run dev
```

(Requires `nodemon` - already in package.json)

## API Endpoints

### Generate Card (Free Tier)
```
POST /api/generate-card
Body: {
  "name": "John",
  "gender": "male",
  "occasion": "valentine"
}

Response: {
  "success": true,
  "message": "Generated message text...",
  "downloadUrl": "/download-card/timestamp.png"
}
```

### Get Occasions
```
GET /api/occasions
```

### Get Cards for Occasion (Premium)
```
GET /api/cards/:occasion
```

### Download Card
```
GET /api/download-card/:filename
```

## Environment Variables

- `GOOGLE_GEMINI_API_KEY` - Your Google Gemini API key
- `PORT` - Server port (default: 5000)

## How It Works

1. User selects occasion, enters receiver's name and gender
2. Backend picks a random card image from the occasion folder
3. Google Gemini generates a personalized romantic message
4. Backend adds the message text overlay to the card image
5. User downloads the generated card as PNG

## Future Premium Features

- Users can choose specific card designs (not random)
- Custom message editing
- More occasions
- Social sharing
- Email sending

## Troubleshooting

### "No card images found"
- Add images to `images/[occasion]/` folder
- Ensure files are .jpg or .png

### "Failed to generate message"
- Check your Google Gemini API key in `.env`
- Ensure API key is active and has quota

### CORS errors
- CORS is already enabled for all origins in server.js

## Cost

Google Gemini free tier provides 1.5M tokens/month, which is plenty for personal use.

## License

MIT
