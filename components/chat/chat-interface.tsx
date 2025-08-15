'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatSidebar } from './chat-sidebar';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Chat {
  id: string;
  title: string;
  updated_at: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatInterfaceProps {
  initialChatId?: string;
  initialMessages?: Message[];
}

export function ChatInterface({ initialChatId, initialMessages = [] }: ChatInterfaceProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(initialChatId);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [input, setInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // AI SDK useChat hook with transport
  const {
    messages,
    sendMessage,
    status,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onError: (error: Error) => {
      console.error('Chat error:', error);
      toast.error('Failed to send message. Please try again.');
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Check authentication status
  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.warn('Auth error:', error.message);
        // If it's a network error, allow user to proceed with cached state
        if (error.message.includes('fetch') || error.message.includes('network')) {
          setIsCheckingAuth(false);
          return;
        }
        router.push('/auth/login');
        return;
      }
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
    } catch (error) {
      console.error('Auth check failed:', error);
      // On network errors, allow the app to continue functioning
      setIsCheckingAuth(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Load chats from database
  const loadChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('id, title, updated_at')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading chats:', error);
        // Only show error toast for non-network errors
        if (!error.message.includes('fetch') && !error.message.includes('network')) {
          toast.error('Failed to load chats');
        }
        return;
      }

      setChats(data || []);
    } catch (error) {
      console.error('Error loading chats:', error);
      // Only show error toast for non-network errors
      if (!String(error).includes('fetch') && !String(error).includes('network')) {
        toast.error('Failed to load chats');
      }
    } finally {
      setIsLoadingChats(false);
    }
  };

  // Handle chat selection
  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
    router.push(`/chat/${chatId}`);
  };

  // Handle new chat creation
  const handleNewChat = () => {
    setCurrentChatId(undefined);
    router.push('/chat');
  };

  // Handle chat deletion
  const handleDeleteChat = async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) {
        console.error('Error deleting chat:', error);
        toast.error('Failed to delete chat');
        return;
      }

      // If we're currently viewing this chat, redirect to new chat
      if (currentChatId === chatId) {
        handleNewChat();
      }

      // Refresh chat list
      await loadChats();
      toast.success('Chat deleted');
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat');
    }
  };

  // Custom message sending function
  const handleSendMessage = async (message: string) => {
    if (message.trim()) {
      await sendMessage({ text: message.trim() });
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Load initial data after authentication
  useEffect(() => {
    if (user && !isCheckingAuth) {
      loadChats();
    }
  }, [user, isCheckingAuth]);

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

  // If no user after auth check, this component will redirect (handled in checkAuth)
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-1 items-center justify-center p-8">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">Start a new conversation</h3>
                  <p className="text-sm">Ask me anything and I'll help you out!</p>
                </div>
              </div>
            ) : (
              messages.map((message) => {
                // Extract text content from message parts
                const textContent = message.parts
                  .filter(part => part.type === 'text')
                  .map(part => part.text)
                  .join('');

                return (
                  <ChatMessage
                    key={message.id}
                    role={message.role as 'user' | 'assistant'}
                    content={textContent}
                  />
                );
              })
            )}
            {/* Loading indicator for assistant response */}
            {isLoading && (
              <ChatMessage
                role="assistant"
                content=""
                isLoading={true}
              />
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}