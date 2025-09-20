# Markdown to PDF Converter

A modern, full-stack web application that converts Markdown documents to professionally formatted PDF files with real-time preview and international character support.

## ✨ Features

- 📝 **Real-time Markdown Editor** - Live syntax highlighting and editing
- 👀 **Live Preview** - See your formatted document as you type
- 📄 **High-Quality PDF Generation** - Professional output using Puppeteer
- 🌍 **International Support** - Full Unicode and CJK font support (Chinese, Japanese, Korean)
- 🎨 **GitHub-Style Formatting** - Clean, professional document styling
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Fast Performance** - Built with modern React and Express.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes (Drizzle)

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing
- **Framer Motion** - Smooth animations

### Backend
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Puppeteer** - PDF generation engine
- **Marked** - Markdown parsing
- **Zod** - Schema validation
- **Drizzle ORM** - Database toolkit

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESBuild** - JavaScript bundler
- **PostCSS** - CSS processing
- **Drizzle Kit** - Database migrations

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── pages/          # Application pages
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database configuration
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Zod validation schemas
└── package.json           # Dependencies and scripts
```

## 🔧 API Endpoints

### POST `/api/generate-pdf`

Converts Markdown content to PDF.

**Request Body:**
```json
{
  "markdown": "# Your markdown content here",
  "filename": "document.pdf"
}
```

**Response:**
- Content-Type: `application/pdf`
- Returns the generated PDF as a binary stream

## 🎨 Supported Markdown Features

- **Headers** (H1-H6) with automatic styling
- **Text formatting** (bold, italic, strikethrough)
- **Lists** (ordered and unordered)
- **Links** and images
- **Code blocks** with syntax highlighting
- **Tables** with clean borders
- **Blockquotes** with left border styling
- **Horizontal rules**
- **International characters** (Chinese, Japanese, Korean)

## 🌍 International Character Support

The application includes comprehensive font support for:
- **Latin scripts** (English, European languages)
- **Chinese** (Simplified and Traditional)
- **Japanese** (Hiragana, Katakana, Kanji)
- **Korean** (Hangul)

Fonts used:
- Inter (Latin)
- Noto Sans (Universal)
- Noto Sans SC (Simplified Chinese)
- Noto Sans JP (Japanese)
- Noto Sans KR (Korean)
- Fira Code (Monospace/Code)

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

### PDF Generation Settings

The PDF generation includes:
- A4 page format
- Optimized margins (0.5in top/bottom, 0.75in left/right)
- Print background graphics
- Font loading optimization
- Network idle waiting for complete rendering

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Deployment

The application can be containerized using Docker. Ensure Puppeteer's Chrome dependencies are properly installed in the container.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Large documents may take longer to process
- Some complex CSS in Markdown may not render perfectly in PDF
- Browser must support modern JavaScript features

## 🔄 Recent Updates

- Enhanced PDF margin settings for better print compatibility
- Improved international character support
- Enhanced browser launch settings for PDF generation stability
- Optimized document layout and styling

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include browser version and operating system details