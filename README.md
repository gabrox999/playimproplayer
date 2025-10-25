# Play Impro Player

A modern, feature-rich music dashboard application for quick access to your music resources across multiple platforms. Built with React and designed for both local and web deployment.

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

### Prerequisites
- Node.js 18+ and npm

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd playimproplayer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

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
