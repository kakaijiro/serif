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

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Create streaming response - use standard gpt-3.5-turbo model
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

          // Update chat timestamp
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