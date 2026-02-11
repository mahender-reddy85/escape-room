# C-ESCAPE: 3D Escape Room Challenge

<div align="center">
  <h1>🔐 C-ESCAPE</h1>
  <p><strong>3D Logic Challenge with C Programming</strong></p>
</div>

An immersive 3D escape room game where players solve C programming challenges to unlock their way to freedom. Navigate through mysterious rooms, interact with objects, and test your C programming knowledge across 5 challenging levels.

## 🎮 Game Features

### **Core Gameplay:**
- **5 Progressive Levels** with increasing difficulty
- **C Programming Challenges** covering Pointers, Arrays, Functions, Memory Management, and Data Structures
- **3D Interactive Environment** with realistic physics and lighting
- **Life System**: 3 lives per level, wrong answers cost lives
- **Auto-restart** when lives reach zero

### **Interactive Objects:**
- **Terminal Board**: Access C programming questions
- **Data Cube**: Power up the terminal system
- **Cabinet & Drawers**: Search for hidden keys
- **Mystery Objects**: Discover hidden secrets
- **Special Tools**: Unlock advanced features

### **Anti-Cheat Protection:**
- Aggressive protection against screenshots and tab switching
- Right-click and copy protection
- Page refresh on suspicious activity

## 🚀 Quick Start

### **Prerequisites:**
- Node.js (v16 or higher)
- Gemini API Key

### **Installation:**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   # Create .env.local file
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```
   Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🌐 Deployment

### **Vercel Deployment (Recommended):**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variable:**
   ```bash
   vercel env add GEMINI_API_KEY
   ```

### **GitHub Pages Deployment:**

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## 🎯 How to Play

### **Objective:**
Navigate through 5 levels by solving C programming challenges and finding the escape key.

### **Game Flow:**
1. **EXPLORE** → Search the room for interactive objects
2. **SOLVE** → Answer C programming questions at the terminal
3. **CUBE** → Collect and place the data cube to power systems
4. **KEY** → Find the hidden key in drawers or objects
5. **ESCAPE** → Complete the level and advance

### **Life System:**
- **3 questions per level**
- **3 lives per level**
- **Wrong answer = -1 life**
- **0 lives = automatically restarts challenge**

## 🧩 C Programming Topics

- **Level 1**: Basic syntax and program structure
- **Level 2**: Logical operators and control flow
- **Level 3**: Pointers and memory addresses
- **Level 4**: Memory management and heap allocation
- **Level 5**: Advanced constructs and function pointers

## 🛠️ Technical Stack

- **Frontend**: React with TypeScript
- **3D Graphics**: Three.js and React Three Fiber
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API for question generation
- **Deployment**: Vercel/GitHub Pages

## 📁 Project Structure

```
escape-room/
├── components/
│   ├── StartScreen.tsx      # Game start screen
│   ├── GameScene.tsx        # Main 3D game scene
│   ├── InteractiveObject.tsx # Interactive object wrapper
│   └── UIOverlay.tsx        # Game UI overlay
├── constants.ts             # Level configurations
├── types.ts                 # TypeScript definitions
├── index.html              # Main HTML file with anti-cheat
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Development

### **Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

### **Environment Variables:**
- `GEMINI_API_KEY` - Required for AI question generation

## 🐛 Troubleshooting

### **Common Issues:**

1. **White screen on object click:**
   - Check browser console for errors
   - Ensure Three.js dependencies are properly loaded

2. **API errors:**
   - Verify GEMINI_API_KEY is set correctly
   - Check API key permissions and quota

3. **Build issues:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors in components

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

<div align="center">
  <p>🔓 <strong>Can you escape the C programming challenge?</strong> 🔓</p>
</div>
