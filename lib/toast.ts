"use client"

import { toast } from "sonner"

interface ShowSuccessOptions {
  title?: string
  description?: string
}

export function showMutationSuccess(options?: ShowSuccessOptions) {
  const { title = "Saved", description } = options ?? {}
  toast.success(title, description ? { description } : undefined)
}

export function showMutationError(error: unknown, fallbackMessage = "Something went wrong") {
  const description = getErrorMessage(error) ?? fallbackMessage
  toast.error("Error", { description })
}

interface WithMutationToastMessages {
  loading?: string
  success?: string
  error?: string
}

export async function withMutationToast<T>(
  mutation: () => Promise<T>,
  messages: WithMutationToastMessages = {}
): Promise<T> {
  const { loading = "Saving...", success = "Saved", error = "Something went wrong" } = messages
  const result = toast.promise(
    mutation(),
    {
      loading,
      success,
      error,
    }
  )
  
  // Handle the unwrap method if it exists
  if (typeof result === 'object' && result !== null && 'unwrap' in result) {
    return result.unwrap()
  }
  
  // If no unwrap method, return the result directly
  return result as T
}

function getErrorMessage(error: unknown): string | undefined {
  if (!error) return undefined
  if (typeof error === "string") return error
  if (error instanceof Error) return error.message
  try {
    return JSON.stringify(error)
  } catch {
    return undefined
  }
}


