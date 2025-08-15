export default function ChatLoading() {
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