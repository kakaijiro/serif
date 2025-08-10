"use client"

import { Toaster } from "sonner"

export function SonnerToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand
      toastOptions={{
        classNames: {
          toast: "shadow-lg",
        },
      }}
    />
  )
}
