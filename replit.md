# Overview

This is a full-stack Markdown to PDF converter application built with React, Express, and modern web technologies. The application provides a real-time markdown editor with live preview capabilities and PDF generation functionality. Users can write markdown content in the left pane, see the live preview in the right pane, and export their documents as professionally formatted PDF files.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, professional UI components
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: TanStack Query for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Layout**: Custom resizable pane implementation for editor/preview split view

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **PDF Generation**: Puppeteer for headless browser-based PDF rendering
- **Markdown Processing**: Marked library for converting markdown to HTML
- **API Design**: RESTful endpoints with structured error handling

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: In-memory storage with planned PostgreSQL session store

## Component Architecture
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui
- **Editor**: Custom markdown editor with toolbar and syntax highlighting
- **Preview**: Real-time markdown rendering with GitHub-style CSS
- **Responsive Design**: Mobile-first approach with resizable panes for desktop

## Development Workflow
- **Development Server**: Vite dev server with HMR and Express API proxy
- **Production Build**: Static assets served by Express with API endpoints
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Code Quality**: ESLint configuration with modern React patterns

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database driver

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library built on Radix UI
- **class-variance-authority**: Type-safe variant API for components
- **clsx**: Utility for conditional CSS class names

## Markdown and PDF Processing
- **marked**: Markdown parser and compiler
- **puppeteer**: Headless browser for PDF generation
- **react-markdown**: React component for rendering markdown

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Database and Sessions
- **connect-pg-simple**: PostgreSQL session store for Express
- **drizzle-kit**: Database migration and schema management tools

## Form Handling and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation