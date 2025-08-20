# Next.js + AI SDK Integration Guide

> A comprehensive guide for AI models and developers implementing streaming chat interfaces with Next.js App Router and AI SDK v5.

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Dependencies](#installation--dependencies)
4. [Project Structure](#project-structure)
5. [Environment Setup](#environment-setup)
6. [Database Schema](#database-schema)
7. [API Route Implementation](#api-route-implementation)
8. [Client-Side Implementation](#client-side-implementation)
9. [Authentication Integration](#authentication-integration)
10. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
11. [Model Selection Guidelines](#model-selection-guidelines)
12. [Performance Optimization](#performance-optimization)
13. [Troubleshooting](#troubleshooting)

## Overview

This guide covers building a production-ready streaming chat interface using:
- **Next.js App Router** (v15+)
- **AI SDK v5** (`@ai-sdk/react`, `@ai-sdk/openai`)
- **Supabase** for authentication and database
- **TypeScript** for type safety
- **Tailwind CSS** + **Shadcn UI** for styling

### Key Features Covered
- ✅ Real-time streaming responses
- ✅ Message persistence with Supabase
- ✅ User authentication and authorization
- ✅ Chat management (create, delete, navigate)
- ✅ React Markdown formatting
- ✅ Full-screen responsive design
- ✅ Error handling and network resilience

## Prerequisites

- Node.js 18+
- Next.js 15+ with App Router
- OpenAI API key
- Supabase project
- Basic understanding of React hooks and TypeScript

## Installation & Dependencies

### Core Dependencies

```bash
# AI SDK packages (v5)
pnpm add @ai-sdk/react @ai-sdk/openai ai

# Supabase
pnpm add @supabase/supabase-js @supabase/ssr

# UI and styling
pnpm add react-markdown tailwindcss

# Validation
pnpm add zod

# Development
pnpm add -D @types/node typescript
```

### Shadcn UI Components

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add required components
npx shadcn@latest add button input card scroll-area toast
```

## Project Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts          # Streaming API endpoint
├── chat/
│   ├── layout.tsx           # Full-screen layout
│   ├── page.tsx             # New chat page
│   ├── [chatId]/
│   │   └── page.tsx         # Existing chat page
│   └── loading.tsx          # Loading state
components/
├── chat/
│   ├── chat-interface.tsx   # Main client component
│   ├── chat-message.tsx     # Message display
│   ├── chat-input.tsx       # Input component
│   └── chat-sidebar.tsx     # Chat list sidebar
└── ui/                      # Shadcn components
lib/
├── supabase/
│   ├── client.ts           # Browser client
│   ├── server.ts           # Server client
│   └── middleware.ts       # Auth middleware
types/
├── chat.ts                 # Chat types
└── database.types.ts       # Supabase types
supabase/
└── migrations/
    └── 20250127000001_create_chats_and_messages.sql
```

## Environment Setup

### `.env.local`
```bash
# OpenAI
OPENAI_API_KEY=sk-proj-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema

### Migration File: `supabase/migrations/20250127000001_create_chats_and_messages.sql`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chats
CREATE POLICY "Users can view their own chats" ON chats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chats" ON chats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chats" ON chats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chats" ON chats
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages from their chats" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM chats 
            WHERE chats.id = messages.chat_id 
            AND chats.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert messages to their chats" ON messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM chats 
            WHERE chats.id = messages.chat_id 
            AND chats.user_id = auth.uid()
        )
    );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_updated_at ON chats(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at ASC);
```

## API Route Implementation

### `app/api/chat/route.ts`

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema for request validation - AI SDK format
const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().optional(), // Legacy format
    parts: z.array(z.object({
      type: z.string(),
      text: z.string(),
    })).optional(), // New AI SDK format
  })),
  chatId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Parse and validate request body
    const body = await req.json();
    const { messages, chatId } = chatRequestSchema.parse(body);

    // Convert AI SDK messages to OpenAI format
    const openAIMessages = messages.map(msg => {
      const content = msg.content || (msg.parts?.find(p => p.type === 'text')?.text) || '';
      if (!content.trim()) {
        throw new Error('Message content cannot be empty');
      }
      return {
        role: msg.role,
        content: content.trim(),
      };
    });

    // If we have a chatId, verify the user owns this chat
    if (chatId) {
      const { data: chat, error: chatError } = await supabase
        .from('chats')
        .select('user_id')
        .eq('id', chatId)
        .single();

      if (chatError || chat?.user_id !== user.id) {
        return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
      }
    }

    // Create streaming response
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: openAIMessages,
      system: 'You are a helpful AI assistant. Provide thoughtful, accurate responses.',
      onFinish: async ({ text }) => {
        try {
          // Save the conversation to database
          let currentChatId = chatId;

          // If no chatId provided, create a new chat
          if (!currentChatId) {
            const { data: newChat, error: createChatError } = await supabase
              .from('chats')
              .insert({
                user_id: user.id,
                title: openAIMessages[0]?.content?.slice(0, 50) + '...' || 'New Chat',
              })
              .select('id')
              .single();

            if (createChatError) {
              console.error('Error creating chat:', createChatError);
              return;
            }
            currentChatId = newChat.id;
          }

          // Save user message
          const { error: userMessageError } = await supabase
            .from('messages')
            .insert({
              chat_id: currentChatId,
              role: 'user',
              content: openAIMessages[openAIMessages.length - 1].content,
            });

          if (userMessageError) {
            console.error('Error saving user message:', userMessageError);
          }

          // Save assistant message
          const { error: assistantMessageError } = await supabase
            .from('messages')
            .insert({
              chat_id: currentChatId,
              role: 'assistant',
              content: text,
            });

          if (assistantMessageError) {
            console.error('Error saving assistant message:', assistantMessageError);
          }

          // Update chat's updated_at timestamp
          const { error: updateChatError } = await supabase
            .from('chats')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', currentChatId);

          if (updateChatError) {
            console.error('Error updating chat timestamp:', updateChatError);
          }
        } catch (error) {
          console.error('Error in onFinish callback:', error);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      type: error.type,
      status: error.status,
      cause: error.cause
    });

    // Return more specific error information
    const errorMessage = error.message || 'Internal server error';
    const errorCode = error.code || 'unknown_error';

    return NextResponse.json(
      {
        error: errorMessage,
        code: errorCode,
        details: error.type
      },
      { status: error.status || 500 }
    );
  }
}
```

## Client-Side Implementation

### `components/chat/chat-interface.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { DefaultChatTransport, Message } from '@ai-sdk/react';
import { createClient } from '@/lib/supabase/client';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatSidebar } from './chat-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { Chat } from '@/types/chat';
import type { User } from '@supabase/supabase-js';

interface ChatInterfaceProps {
  initialChatId?: string;
  initialMessages?: Message[];
}

export function ChatInterface({ initialChatId, initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(initialChatId);
  const { toast } = useToast();
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Initialize transport
  const transport = new DefaultChatTransport({
    api: '/api/chat',
  });

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Load chats when user is authenticated
  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  // Load initial messages if chatId is provided
  useEffect(() => {
    if (user && initialChatId) {
      loadChatMessages(initialChatId);
    }
  }, [user, initialChatId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        // Redirect to login for unauthenticated users
        router.push('/auth/login');
        return;
      }
      
      setUser(user);
    } catch (error: any) {
      // Handle network errors gracefully
      if (error.message?.includes('fetch') || error.code === 'NETWORK_ERROR') {
        console.warn('Network error during auth check, retrying...');
        setTimeout(checkAuth, 1000);
        return;
      }
      
      console.error('Auth check failed:', error);
      router.push('/auth/login');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const loadChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      setChats(data || []);
    } catch (error: any) {
      // Only show toast for non-network errors
      if (!error.message?.includes('fetch')) {
        console.error('Error loading chats:', error);
        toast({
          title: 'Error loading chats',
          description: 'Please try refreshing the page.',
          variant: 'destructive',
        });
      }
    }
  };

  const loadChatMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      const formattedMessages: Message[] = data.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        parts: [{ type: 'text', text: msg.content }],
      }));

      setMessages(formattedMessages);
      setCurrentChatId(chatId);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: 'Error loading messages',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!user || !message.trim()) return;

    setIsLoading(true);

    try {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        parts: [{ type: 'text', text: message }],
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Send message via transport
      const response = await transport.sendMessage({
        messages: newMessages,
        chatId: currentChatId,
      });

      // Create assistant message from response
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: response }],
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Reload chats to update sidebar
      await loadChats();

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error sending message',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(undefined);
    router.push('/chat');
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) {
        throw error;
      }

      // Reload chats
      await loadChats();

      // If we're currently viewing the deleted chat, start a new one
      if (currentChatId === chatId) {
        handleNewChat();
      }

      toast({
        title: 'Chat deleted',
        description: 'The chat has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: 'Error deleting chat',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-75"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={loadChatMessages}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={{
                  role: message.role,
                  content: message.parts?.find(p => p.type === 'text')?.text || '',
                }}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
```

## Authentication Integration

### Supabase Client Setup

#### `lib/supabase/client.ts`
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### `lib/supabase/server.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

#### `lib/supabase/middleware.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      // no user, potentially respond by redirecting the user to the login page
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  } catch (error) {
    // Handle network errors gracefully - don't block the entire app
    console.error('Auth middleware error:', error)
    // Continue with the request instead of blocking
  }

  return supabaseResponse
}
```

## Common Pitfalls & Solutions

### 1. AI SDK Version Compatibility

**❌ Problem**: Using deprecated `useChat` from `ai` package
```typescript
import { useChat } from 'ai'; // ❌ Old version
```

**✅ Solution**: Use AI SDK v5 with proper imports
```typescript
import { DefaultChatTransport } from '@ai-sdk/react'; // ✅ Correct
```

### 2. Message Format Mismatch

**❌ Problem**: API expects `content` but receives `parts`
```typescript
// AI SDK sends this format:
{
  role: 'user',
  parts: [{ type: 'text', text: 'Hello' }]
}

// But API schema expects:
{
  role: 'user',
  content: 'Hello'
}
```

**✅ Solution**: Handle both formats in API
```typescript
const openAIMessages = messages.map(msg => {
  const content = msg.content || (msg.parts?.find(p => p.type === 'text')?.text) || '';
  return {
    role: msg.role,
    content: content.trim(),
  };
});
```

### 3. Authentication Redirects Blocking API

**❌ Problem**: Middleware redirects API calls to login
```typescript
// This blocks /api/chat requests
if (!user) {
  return NextResponse.redirect('/login');
}
```

**✅ Solution**: Exclude API routes from auth redirects
```typescript
if (
  !user &&
  !request.nextUrl.pathname.startsWith('/login') &&
  !request.nextUrl.pathname.startsWith('/auth') &&
  !request.nextUrl.pathname.startsWith('/api') // ✅ Exclude API routes
) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}
```

### 4. Network Error Handling

**❌ Problem**: Network errors crash the application
```typescript
const { data, error } = await supabase.auth.getUser();
if (error) throw error; // ❌ Crashes on network issues
```

**✅ Solution**: Graceful error handling
```typescript
try {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
} catch (error) {
  if (error.message?.includes('fetch')) {
    // Handle network errors gracefully
    console.warn('Network error, retrying...');
    return;
  }
  throw error; // Re-throw non-network errors
}
```

### 5. Font Loading Failures

**❌ Problem**: Google Fonts blocking app loading
```typescript
const inter = Inter({ subsets: ['latin'] }); // ❌ No fallbacks
```

**✅ Solution**: Add fallbacks and display options
```typescript
const inter = Inter({ 
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'], // ✅ Fallback fonts
  display: 'swap' // ✅ Prevent blocking
});
```

### 6. Cache Issues After Code Changes

**❌ Problem**: Code changes not taking effect

**✅ Solution**: Clear Next.js cache
```bash
rm -rf .next
pnpm dev
```

## Model Selection Guidelines

### Recommended Models (2025)

1. **Production Ready**:
   - `gpt-3.5-turbo` - Most reliable, cost-effective
   - `gpt-4-turbo` - Better quality, higher cost
   - `gpt-4o-mini` - Good balance of speed and quality

2. **Avoid**:
   - `gpt-5` - Not yet stable (as of early 2025)
   - Custom fine-tuned models - May have quota issues

### Model Configuration

```typescript
// ✅ Recommended: Start with proven models
model: openai('gpt-3.5-turbo'),

// ✅ Alternative: Better quality, higher cost
model: openai('gpt-4-turbo'),

// ❌ Avoid: Experimental/unstable
model: openai('gpt-5'),
```

## Performance Optimization

### 1. Streaming Optimization

```typescript
// ✅ Use streaming for better UX
const result = await streamText({
  model: openai('gpt-3.5-turbo'),
  stream: true, // Enable streaming
});

return result.toTextStreamResponse();
```

### 2. Database Optimization

```sql
-- ✅ Add indexes for better query performance
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
```

### 3. Client-Side Optimization

```typescript
// ✅ Debounce rapid API calls
const [isLoading, setIsLoading] = useState(false);

const handleSendMessage = async (message: string) => {
  if (isLoading) return; // Prevent duplicate requests
  setIsLoading(true);
  // ... send logic
  setIsLoading(false);
};
```

## Troubleshooting

### Common Error Messages

#### 1. "insufficient_quota"
```json
{
  "error": {
    "type": "insufficient_quota",
    "code": "insufficient_quota"
  }
}
```
**Solutions**:
- Check OpenAI billing settings
- Try different model (e.g., `gpt-3.5-turbo`)
- Contact OpenAI support
- Add payment method to account

#### 2. "Module not found: Can't resolve 'ai/react'"
**Solution**: Update to AI SDK v5
```bash
pnpm remove ai
pnpm add @ai-sdk/react @ai-sdk/openai ai
```

#### 3. "Property 'toDataStreamResponse' does not exist"
**Solution**: Use correct method for AI SDK v5
```typescript
// ❌ Old method
return result.toDataStreamResponse();

// ✅ New method
return result.toTextStreamResponse();
```

#### 4. "fetch failed" in Supabase operations
**Solutions**:
- Check network connectivity
- Verify Supabase environment variables
- Add retry logic for network errors
- Check Supabase project status

#### 5. "You exceeded your current quota" with $0 usage
**Root Causes**:
- Rate limits on free tier
- Account verification required
- Regional restrictions
- Model-specific limitations

**Solutions**:
- Wait 24 hours and retry
- Add payment method
- Try different model
- Contact OpenAI support

### Debug Tips

1. **Enable Detailed Logging**:
```typescript
console.error('Error details:', {
  message: error.message,
  code: error.code,
  type: error.type,
  status: error.status,
  cause: error.cause
});
```

2. **Test API Endpoints Directly**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

3. **Check Server Logs**:
```bash
# Monitor development server output
pnpm dev

# Check for compilation errors
# Look for network timeouts
# Verify environment variables loaded
```

## Deployment Considerations

### Environment Variables
- Ensure all required environment variables are set in production
- Use Vercel's environment variable management
- Never expose service role keys to the client

### Database
- Run migrations in production
- Enable RLS policies before deployment
- Set up proper indexing for performance

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor API usage and quotas
- Track response times and performance

## Conclusion

This guide provides a complete foundation for building production-ready AI chat applications with Next.js and AI SDK v5. The key to success is:

1. **Start with proven, stable technologies**
2. **Implement robust error handling**
3. **Test thoroughly before deploying**
4. **Monitor and optimize performance**

By following these guidelines and learning from the documented pitfalls, you can build reliable, scalable AI chat interfaces that provide excellent user experiences.

---

*Last updated: January 2025*
*AI SDK Version: v5*
*Next.js Version: 15+*
