# Serif

A modern, AI-powered blogging platform built with Next.js, featuring a beautiful writing experience and intelligent chat assistance. This project is developed using **vibe coding** principles - iterative, experimental development focused on achieving the desired user experience.

## 🚀 Overview

Serif is a comprehensive blogging platform that combines elegant content creation with AI-powered assistance. It features a public blog interface, secure author dashboard, and an integrated AI chat system for writing support and content generation.

## ✨ Features

### Core Platform
- **Modern Blog Engine**: Create, edit, and publish blog posts with rich text editing
- **AI-Powered Chat**: Integrated chat interface with OpenAI for writing assistance
- **Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS
- **Authentication**: Secure user authentication and session management via Supabase
- **Rich Text Editor**: TipTap-powered editor for enhanced writing experience

### Content Management
- **Dashboard**: Protected author dashboard for content management
- **Draft System**: Save drafts and publish when ready
- **Image Handling**: Drag-and-drop image uploads with proper storage
- **SEO Optimized**: Built-in SEO considerations and meta tag management

### Technical Features
- **Real-time Updates**: Live chat and content updates
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Next.js App Router and Turbopack
- **Accessibility**: WCAG-compliant components using Radix UI

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible component library
- **Radix UI** - Primitive components for accessibility

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Authentication & authorization
  - File storage

### AI & Integrations
- **OpenAI** - GPT-powered chat assistance
- **AI SDK** - Vercel's AI SDK for streaming responses
- **TipTap** - Rich text editor with extensions

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting and formatting
- **Turbopack** - Ultra-fast bundler for development

## 📁 Project Structure

```
serif/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API routes
│   ├── blogs/             # Blog management
│   ├── chat/              # AI chat interface
│   ├── dashboard/         # Protected dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Shadcn)
│   ├── chat/             # Chat-specific components
│   └── blogs/            # Blog-specific components
├── lib/                  # Utility functions
│   └── supabase/         # Supabase client configuration
├── types/                # TypeScript type definitions
├── supabase/             # Database migrations
└── docs/                 # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- pnpm 8.0.0 or higher
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serif
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up the database**
   ```bash
   # Run Supabase migrations
   npx supabase db push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles** - User profile information
- **blogs** - Blog posts with metadata
- **chats** - AI chat conversations
- **messages** - Individual chat messages

All tables include Row Level Security (RLS) policies for data protection.

## 🎨 Development Philosophy

This project embraces **vibe coding** - a development approach that prioritizes:

- **Iterative Experimentation**: Rapid prototyping and testing of ideas
- **User Experience First**: Building features based on desired UX outcomes
- **Flexible Architecture**: Adapting structure as requirements evolve
- **Creative Problem Solving**: Using unconventional approaches when they serve the goal

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📖 Usage

### Writing Blog Posts
1. Navigate to `/dashboard` (authentication required)
2. Click "New Post" to create a blog post
3. Use the rich text editor to write your content
4. Save as draft or publish immediately

### AI Chat Assistance
1. Visit `/chat` to access the AI writing assistant
2. Ask questions about writing, get content suggestions, or brainstorm ideas
3. Chat history is saved for future reference

### Managing Content
- View all posts in the dashboard
- Edit existing posts
- Toggle between draft and published status
- Upload and manage images

## 🤝 Contributing

This project follows vibe coding principles, so contributions should focus on enhancing the user experience and exploring creative solutions. Feel free to experiment with new features and approaches!

## 📝 License

This project is private and proprietary.

---

Built with ❤️ using vibe coding principles
