'use client';

import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-4 p-4',
        role === 'assistant' ? 'bg-muted/30' : 'bg-background'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          role === 'assistant'
            ? 'bg-primary text-primary-foreground'
            : 'bg-background'
        )}
      >
        {role === 'assistant' ? '🤖' : '👤'}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-75"></div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground delay-150"></div>
            </div>
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      {children}
                    </code>
                  ) : (
                    <code className="relative block w-full rounded bg-muted p-4 font-mono text-sm">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="overflow-x-auto">{children}</pre>
                ),
                ul: ({ children }) => (
                  <ul className="my-2 ml-6 list-disc">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-2 ml-6 list-decimal">{children}</ol>
                ),
                li: ({ children }) => <li className="mt-1">{children}</li>,
                h1: ({ children }) => (
                  <h1 className="mb-2 mt-4 text-xl font-semibold first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-2 mt-4 text-lg font-semibold first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 mt-4 text-base font-semibold first:mt-0">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-muted-foreground pl-4 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
