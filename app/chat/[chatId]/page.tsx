import { ChatInterface } from '@/components/chat/chat-interface';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface ChatPageProps {
  params: Promise<{ chatId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  const supabase = await createClient();
  
  // Get the authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    notFound();
  }

  // Verify the chat exists and belongs to the user
  const { data: chat, error: chatError } = await supabase
    .from('chats')
    .select('id, title')
    .eq('id', chatId)
    .eq('user_id', user.id)
    .single();

  if (chatError || !chat) {
    notFound();
  }

  // Load messages for this chat
  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select('id, role, content, created_at')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (messagesError) {
    console.error('Error loading messages:', messagesError);
  }

  return (
    <ChatInterface 
      initialChatId={chatId} 
      initialMessages={messages || []} 
    />
  );
}
