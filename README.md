# FlowViz - Attack Flow Visualizer

An open-source React application that analyzes cybersecurity articles and generates interactive attack flow visualizations using the MITRE ATT&CK framework.

![FlowViz Demo](./demo.png)

## ✨ Features

- 🔍 **Article Analysis**: Extract attack patterns from cybersecurity articles and reports
- 📊 **Interactive Visualization**: Generate dynamic attack flow diagrams with real-time streaming
- 🎯 **MITRE ATT&CK Integration**: Map techniques and tactics to the ATT&CK framework
- 🖼️ **Image Analysis**: Process screenshots and diagrams from articles
- 📤 **Multiple Export Formats**: Export as PNG, STIX 2.1 bundles, or Attack Flow Builder (.afb) files
- ⚡ **Real-time Streaming**: Watch attack flows build in real-time as Claude analyzes content
- 🎬 **Story Mode**: Cinematic playback of attack progression with customizable controls
- 💾 **Save & Load**: Persistent storage of analyses with metadata and search capabilities
- ⚙️ **Configurable**: Server-side configuration via environment variables
- 🛡️ **Defensive Focus**: Built for security analysts and threat hunters
- 🔒 **Secure Architecture**: Server-side API processing with SSRF protection

## 🚀 Quick Start

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Anthropic API key ([get one here](https://console.anthropic.com))

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flow-viz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (Required for server-side API calls)
   ```bash
   cp .env.example .env
   # Edit .env and add your Anthropic API key
   ```

4. **Start the application**
   ```bash
   npm run dev:full
   ```
   
   This starts both the frontend (http://localhost:5173) and backend proxy (http://localhost:3001)

## Getting Your API Key

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Go to **API Keys** and create a new key
4. Copy the key (starts with "sk-ant-")
5. Add it to your .env file as ANTHROPIC_API_KEY

> 💡 **Note**: Your API key is used server-side only for better security. It's never exposed to the client.

## Usage

1. **Analyze Content**: 
   - **URL Mode**: Paste a cybersecurity article URL and click "Analyze Article"
   - **Text Mode**: Paste article text directly for analysis
   
2. **Watch Real-time Streaming**: Attack flow nodes and connections appear as Claude processes the content

3. **Interactive Exploration**:
   - Click nodes to see detailed information with MITRE ATT&CK mappings
   - Zoom, pan, and drag nodes around the canvas
   - Use Story Mode to watch attack progression cinematically

4. **Save & Export**:
   - Save analyses with custom titles and descriptions
   - Export as PNG images, STIX 2.1 bundles, or AFB files for Attack Flow Builder
   - Load previously saved analyses

5. **Customize Experience**:
   - Toggle cinematic mode for story playback
   - Configure visualization preferences
   - Adjust server settings via environment variables

## Error Handling

The application includes comprehensive error handling with:

- **Network Errors**: Connection issues, timeouts, and CORS problems
- **API Errors**: Rate limiting, authentication, and quota issues
- **Validation Errors**: Invalid URLs, empty content, and format issues
- **Recovery Options**: Retry buttons and helpful suggestions

### Common Error Solutions

- **"Please set your Anthropic API key"**: Ensure ANTHROPIC_API_KEY is set in your .env file
- **"Network Connection Failed"**: Check your internet connection
- **"Authentication Error"**: Verify your API key is correct in .env file
- **"Rate Limit Exceeded"**: Wait a moment and try again
- **"API Quota Exceeded"**: Check your Anthropic account billing
- **"Invalid URL"**: Ensure the URL starts with http:// or https://

## Architecture

### Frontend
- **React 18** with TypeScript
- **Material-UI** for components
- **React Query** for data fetching
- **React Flow** for visualization
- **Vite** for build tooling

### Backend Proxy
- **Express.js** server with secure architecture
- **Server-side API calls** - All Anthropic API calls happen server-side
- **Security features** - Rate limiting, SSRF protection, request validation
- **CORS handling** with configurable origins
- **Error handling** and comprehensive logging

### Services
- **Article Parser**: Extracts content from URLs
- **Claude Service**: AI-powered attack flow analysis
- **Flow Visualization**: Generates interactive diagrams

## Development

### Available Scripts
- `npm run dev:full` - **Recommended**: Start both frontend and backend together
- `npm run dev` - Start frontend only (http://localhost:5173)
- `npm run server` - Start backend proxy only (http://localhost:3001)  
- `npm run build` - Build for production with TypeScript validation and optimizations
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with TypeScript support

### Production Build Features
- **Console Statement Removal**: All `console.log`, `console.debug`, and `console.info` statements are automatically removed in production builds
- **Bundle Optimization**: Code splitting and vendor chunk optimization for faster loading
- **TypeScript Validation**: Full type checking during build process

### Project Structure
```
flow-viz/
├── src/
│   ├── components/          # React components
│   │   ├── FlowVisualization/  # Main visualization components
│   │   ├── SavedFlows/         # Save/Load dialog system
│   │   └── ErrorBoundary/      # Error handling
│   ├── services/           # API and parsing services
│   │   ├── claude/            # Claude AI integration
│   │   ├── article/           # Content extraction
│   │   └── export/            # File export utilities
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main application
├── server.js               # Express proxy server with security features
├── security-utils.js       # Shared security utilities (SSRF protection, rate limiting)
├── .env.example            # Environment configuration template
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

### Adding New Features
1. Create components in `src/components/` following existing patterns
2. Add services in `src/services/` with proper error handling
3. Define TypeScript types in `src/types/`
4. Follow the existing glassmorphism design system
5. Update error handling and user feedback
6. Test with various article types and formats

### Environment Variables

**Required:**
```env
ANTHROPIC_API_KEY=your_api_key_here  # Required for server-side Claude API calls
```

**Optional (with defaults):**
```env
# Server Configuration
PORT=3001                    # Server port (default: 3001)
NODE_ENV=development         # Environment: development | production

# Security - Rate Limiting
RATE_LIMIT_ARTICLES=10       # Max article fetches per 15 min (default: 10)
RATE_LIMIT_IMAGES=50         # Max image fetches per 10 min (default: 50)
RATE_LIMIT_STREAMING=5       # Max AI requests per 5 min (default: 5)

# Security - Size Limits  
MAX_REQUEST_SIZE=10mb        # Max request body size (default: 10mb)
MAX_ARTICLE_SIZE=5242880     # Max article size in bytes (default: 5MB)
MAX_IMAGE_SIZE=3145728       # Max image size in bytes (default: 3MB)

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000  # Comma-separated
```

See `.env.example` for a complete template with documentation.

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Ensure the proxy server is running (`npm run server`)
2. Check that requests are going through `/api` proxy
3. Verify the target URL is accessible

### API Key Issues
If the API key isn't working:
1. Check your .env file has ANTHROPIC_API_KEY set correctly
2. Verify the key starts with "sk-ant-" and has no extra spaces
3. Restart the server after updating .env: `npm run dev:full`
4. Verify the key is valid in the Anthropic Console
5. Ensure your Anthropic account has available credits

### Build Issues
If the build fails:
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check TypeScript errors: `npm run lint`
3. Verify all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review error messages for specific guidance
3. Open an issue on GitHub with detailed information
