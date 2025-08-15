import { Database } from './database.types';

export type Chat = Database['public']['Tables']['chats']['Row'];
export type ChatInsert = Database['public']['Tables']['chats']['Insert'];
export type ChatUpdate = Database['public']['Tables']['chats']['Update'];

export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageInsert = Database['public']['Tables']['messages']['Insert'];
export type MessageUpdate = Database['public']['Tables']['messages']['Update'];

export interface ChatWithMessages extends Chat {
  messages: Message[];
}

export interface CreateChatRequest {
  title?: string;
}

export interface SendMessageRequest {
  chatId?: string;
  content: string;
}

export interface ChatListResponse {
  chats: Chat[];
}

export interface ChatMessagesResponse {
  messages: Message[];
}