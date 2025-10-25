# Play Impro Player

A modern, feature-rich music dashboard application for quick access to your music resources across multiple platforms. Built with React and designed for both local and web deployment.

## 🚀 Live Demo

**Try it now:** https://gabrox999.github.io/playimproplayer/

The app is automatically deployed to GitHub Pages on every push to the main branch.

## Features

### Multi-Platform Support
- **YouTube**: Embedded players with full volume control via IFrame API
- **Spotify**: Integrated Spotify player widgets
- **Local Files**: Support for audio (MP3, WAV, OGG, AAC, FLAC, M4A) and video (MP4, WebM, MOV, AVI, MKV) files

### Organization & Management
- **Multi-Page System**: Organize resources into separate pages with custom names, icons, and colors
- **Visual Navigation**: Scrollable page navigation bar with left/right arrows and home button
- **Resource Management**: Add, edit, and delete resources with intuitive UI
- **Drag-Free Layout**: Grid-based tile system for clean presentation

### Customization
- **400+ Icons**: Extensive emoji icon library organized by category
- **16 Preset Colors**: Quick color selection with custom color picker
- **Per-Resource Styling**: Each resource can have its own icon and color

### Audio Control
- **Master Volume**: Global volume control for all YouTube players
- **Individual Controls**: Per-player volume sliders for YouTube and local files
- **Parallel Playback**: Play multiple resources simultaneously

### Data Management
- **localStorage Persistence**: Automatic saving of resources and pages
- **Import/Export**: JSON-based backup and restore functionality
- **Backwards Compatible**: Imports from older formats automatically migrate

### Error Handling
- **Local File Warnings**: Clear notifications when local files are unavailable
- **Missing File Handling**: Graceful error messages with helpful information
- **Format Detection**: Automatic detection of media types and URLs

## Technology Stack

- **Framework**: React 18 with Hooks
- **Build Tool**: Vite 7
- **Styling**: CSS3 with custom properties
- **APIs**: YouTube IFrame API for enhanced playback control
- **Storage**: Browser localStorage with JSON serialization

## Installation

### Quick Start (For Everyone)

Choose your platform below and follow the step-by-step guide. No prior programming experience required!

---

### 🪟 Windows

#### For Non-Technical Users (GUI Method)
1. **Install Node.js**
   - Visit https://nodejs.org/
   - Download the "LTS" version (recommended)
   - Run the installer and click "Next" through all steps
   - Restart your computer

2. **Download the App**
   - Visit https://github.com/gabrox999/playimproplayer
   - Click the green "Code" button
   - Click "Download ZIP"
   - Extract the ZIP file to your Desktop

3. **Run the App**
   - Open the extracted folder
   - Double-click on `install-and-run.bat` (if provided)
   - OR: Hold Shift + Right-click in the folder → "Open PowerShell window here"
   - Type: `npm install` and press Enter (wait for completion)
   - Type: `npm run dev` and press Enter
   - Open your browser to: http://localhost:5173

#### For Technical Users (Command Line)
```powershell
# Install Node.js (using Chocolatey)
choco install nodejs-lts

# Or download from https://nodejs.org/

# Clone and setup
git clone https://github.com/gabrox999/playimproplayer.git
cd playimproplayer
npm install
npm run dev
```

**Troubleshooting Windows:**
- If you get "execution policy" errors, run PowerShell as Administrator and execute:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

---

### 🍎 macOS

#### For Non-Technical Users (GUI Method)
1. **Install Node.js**
   - Visit https://nodejs.org/
   - Download the "LTS" version (recommended)
   - Open the downloaded .pkg file
   - Follow the installation wizard
   - Restart your computer

2. **Download the App**
   - Visit https://github.com/gabrox999/playimproplayer
   - Click the green "Code" button
   - Click "Download ZIP"
   - The file will download to your Downloads folder
   - Double-click the ZIP to extract it

3. **Run the App**
   - Open **Terminal** (Applications → Utilities → Terminal)
   - Type: `cd ` (with a space after cd)
   - Drag the playimproplayer folder into Terminal and press Enter
   - Type: `npm install` and press Enter (wait for completion)
   - Type: `npm run dev` and press Enter
   - Open your browser to: http://localhost:5173

#### For Technical Users (Command Line)
```bash
# Install Node.js (using Homebrew)
brew install node

# Or download from https://nodejs.org/

# Clone and setup
git clone https://github.com/gabrox999/playimproplayer.git
cd playimproplayer
npm install
npm run dev
```

**Troubleshooting macOS:**
- If you don't have Homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- For permission errors, you may need to use `sudo` before commands

---

### 🐧 Linux (Ubuntu/Debian)

#### For Non-Technical Users (GUI Method)
1. **Install Node.js**
   - Open **Terminal** (Ctrl + Alt + T)
   - Copy and paste each line, pressing Enter after each:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```
   - Enter your password when prompted

2. **Download the App**
   - Visit https://github.com/gabrox999/playimproplayer
   - Click the green "Code" button
   - Click "Download ZIP"
   - Extract the ZIP file (right-click → Extract Here)

3. **Run the App**
   - Open Terminal in the extracted folder (right-click → Open in Terminal)
   - Type: `npm install` and press Enter
   - Type: `npm run dev` and press Enter
   - Open your browser to: http://localhost:5173

#### For Technical Users (Command Line)
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Fedora
sudo dnf install nodejs git

# Arch
sudo pacman -S nodejs npm git

# Clone and setup
git clone https://github.com/gabrox999/playimproplayer.git
cd playimproplayer
npm install
npm run dev
```

**Troubleshooting Linux:**
- If npm commands fail with permission errors, never use `sudo npm`. Instead:
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
  source ~/.bashrc
  ```

---

### 🐳 Docker (All Platforms)

Perfect for technical users who want isolation or easy deployment.

#### Development Mode
```bash
# Clone repository
git clone https://github.com/gabrox999/playimproplayer.git
cd playimproplayer

# Build and run with Docker
docker build -t playimproplayer .
docker run -p 5173:5173 playimproplayer
```

#### Docker Compose (Recommended)
Create a `docker-compose.yml` file:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

Then run:
```bash
docker-compose up
```

#### Production Build with Docker
```bash
# Build production image
docker build -t playimproplayer:prod --target production .

# Run with nginx
docker run -p 80:80 playimproplayer:prod
```

---

### 📦 Production Deployment

#### Build for Production
```bash
npm run build
# Output will be in the 'dist' folder
```

#### Deploy to Various Platforms

**Netlify (Easiest)**
1. Visit https://app.netlify.com
2. Drag the `dist` folder onto the page
3. Done!

**Vercel**
```bash
npm i -g vercel
vercel --prod
```

**GitHub Pages (Automatic)**

This repository is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages:**
   - Go to your repository settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on push to main

2. **Manual deployment (if needed):**
```bash
npm run build
# Install gh-pages package
npm install -D gh-pages
# Deploy to gh-pages branch
npx gh-pages -d dist
```

Your app will be live at: `https://YOUR_USERNAME.github.io/playimproplayer/`

**Self-Hosted (Nginx)**
```bash
# Copy dist folder to your server
scp -r dist/* user@yourserver:/var/www/html/

# Nginx config
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

### ⚙️ Configuration

**Environment Variables** (optional)

Create a `.env` file in the root directory:
```env
VITE_APP_NAME="My Music Dashboard"
VITE_API_URL="https://api.example.com"
```

**Port Configuration**

Change the dev server port by editing `vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 3000, // Change this
    host: true  // Expose to network
  }
})
```

---

### 🔧 Common Issues

**Port Already in Use**
```bash
# Find and kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill
```

**Module Not Found Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Fails**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

### 📱 Accessing from Mobile Devices

1. Make sure your computer and phone are on the same WiFi
2. Find your computer's local IP address:
   - **Windows**: `ipconfig` (look for IPv4)
   - **macOS/Linux**: `ifconfig` or `ip addr`
3. On your phone, visit: `http://YOUR_IP:5173`

Example: `http://192.168.1.100:5173`

## Usage

### Getting Started
1. The app launches on the **HomePage** showing all your pages
2. Click **"Add New Page"** to create a new category/page
3. Click any page tile to open it and start adding resources

### Adding Resources
1. Navigate to a page
2. Click **"+ Add"** in the left panel
3. Fill in:
   - **Title**: Name for your resource
   - **URL**: YouTube, Spotify, or local file path
   - **Icon**: Choose from 400+ emojis
   - **Color**: Select preset or custom color
4. Click **"Add"** to save

### Playing Content
- Click any tile in the grid to start playback
- Multiple tiles can play simultaneously
- Use volume controls for YouTube and local files
- Click **✕** to stop playback

### Navigation
- **Home button (🏠)**: Return to HomePage
- **Left/Right arrows**: Navigate between pages
- **Page buttons**: Click any page name to jump to it

### Local Files
**Important**: Local files only work on the device where they're stored. Use the full file path:
- **Windows**: `C:\Music\song.mp3`
- **Mac/Linux**: `/Users/yourname/Music/song.mp3`
- **File URL**: `file:///path/to/file.mp3`

The app will display a warning when adding local files and show helpful error messages if files are missing.

### Import/Export
- Click **📥** to export all data (resources + pages) as JSON
- Click **📤** to import from a JSON file
- Old exports (resources only) are automatically upgraded

## Development

### Project Structure
```
src/
├── components/
│   ├── HomePage.jsx          # Main page grid view
│   ├── PageNavigation.jsx    # Bottom navigation bar
│   ├── ResourcePanel.jsx     # Left sidebar for management
│   ├── ResourceTile.jsx      # Individual playable tiles
│   ├── TileGrid.jsx          # Grid layout container
│   ├── VolumeControl.jsx     # Master volume slider
│   └── constants.js          # Shared icons and colors
├── contexts/
│   └── VolumeContext.jsx     # Volume state management
├── utils/
│   ├── storage.js            # localStorage operations
│   └── urlConverter.js       # URL detection and conversion
└── App.jsx                   # Main application logic
```

### Key Components

**HomePage**: Displays all pages as clickable tiles with management options

**PageNavigation**: Bottom bar with scrollable page list and navigation arrows

**ResourcePanel**: Left sidebar for adding/editing/deleting resources

**ResourceTile**: Smart component that detects media type and renders appropriate player

**VolumeContext**: Manages global volume state and synchronizes YouTube players

### Adding New Features
The codebase is modular and easy to extend:
- Add new player types in `urlConverter.js` and `ResourceTile.jsx`
- Extend icon/color sets in `constants.js`
- Add new storage operations in `storage.js`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Known Limitations

- Spotify embedded players don't support programmatic volume control (browser security)
- Local files require full file system access (use file:// URLs or absolute paths)
- YouTube API requires internet connection even for local deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Note**: The name "Play Impro Player" is protected and requires explicit permission for use. See the TRADEMARK NOTICE in the LICENSE file.

## Credits

Created by Gabriele Manfredi

Built with assistance from Claude Code

## Contributing

This is a personal project, but suggestions and feedback are welcome. Please open an issue for any bugs or feature requests.
