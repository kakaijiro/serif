'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Plus, Trash2, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface Chat {
  id: string;
  title: string;
  updated_at: string;
}

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId?: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatSidebar({ 
  chats, 
  currentChatId, 
  onChatSelect, 
  onNewChat, 
  onDeleteChat 
}: ChatSidebarProps) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r bg-muted/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Chats</h2>
        <Button onClick={onNewChat} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4" />
              <p className="text-sm">No chats yet</p>
              <p className="text-xs">Start a new conversation</p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg p-3 text-sm transition-colors cursor-pointer',
                  currentChatId === chat.id
                    ? 'bg-muted'
                    : 'hover:bg-muted/50'
                )}
                onClick={() => onChatSelect(chat.id)}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(chat.updated_at)}
                  </div>
                </div>
                {(hoveredChatId === chat.id || currentChatId === chat.id) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
