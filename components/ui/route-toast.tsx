"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function RouteToast() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const toastFlag = searchParams.get("toast")
    if (!toastFlag) return

    switch (toastFlag) {
      case "created":
        toast.success("Post created")
        break
      case "updated":
        toast.success("Post updated")
        break
      case "deleted":
        toast.success("Post deleted")
        break
      default:
        toast.success("Success")
    }

    const params = new URLSearchParams(searchParams.toString())
    params.delete("toast")
    const newQuery = params.toString()
    router.replace(newQuery ? `${pathname}?${newQuery}` : pathname)
  }, [searchParams, pathname, router])

  return null
}


