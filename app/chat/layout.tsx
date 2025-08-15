import { SonnerToaster } from "@/components/ui/sonner-toaster";
import { RouteToast } from "@/components/ui/route-toast";
import { Suspense } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="h-screen w-screen overflow-hidden">
          {children}
        </div>
        <SonnerToaster />
        <Suspense fallback={null}>
          <RouteToast />
        </Suspense>
      </body>
    </html>
  );
}
