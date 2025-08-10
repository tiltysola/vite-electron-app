# Vite-Electron-App

A modern Electron application template using Vite for fast development and building. This template provides a solid foundation for building cross-platform desktop applications with React and TypeScript.

## Features

- ⚡️ Lightning fast HMR (Hot Module Replacement)
- 🚀 Vite-powered build system
- 📦 Electron for cross-platform desktop apps
- ⚛️ React for UI development
- 🔷 TypeScript for type safety
- 🎨 Modern development experience

## Dependencies

- Vite 7.x
- Electron 37.x
- React 19.x
- TypeScript 5.x
- ESBuild 0.25.x

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/AlishaHawkward/vite-electron-app.git --depth=1

# Navigate to project directory
cd vite-electron-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Building

```bash
# Build for production
npm run build
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build directory
npm run clean
```

## Project Structure

```
├── src/
│   ├── main/           # Electron main process
│   └── render/         # React application
└── build/              # Build scripts
```

## Inter-Process Communication

The application uses Electron's IPC (Inter-Process Communication) for communication between the main and renderer processes:

```typescript
// From renderer to main process
window.ipcRenderer.send('channel-name', data);

// From main to renderer process
window.ipcRenderer.on('channel-name', (event, data) => {
  // Handle data
});
```

## License

This project is open source and available under the MIT License. Feel free to use and modify it for your projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Original template by [AlishaHawkward](https://github.com/AlishaHawkward)
- Built with [Vite](https://vitejs.dev/)
- Powered by [Electron](https://www.electronjs.org/)
