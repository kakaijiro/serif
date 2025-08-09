"use client"

import { useState } from "react"
import { TipTapEditor } from "@/components/blogs/tiptap-editor"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface BlogFormProps {
  initialValues?: {
    title?: string
    subtitle?: string | null
    image?: string | null
    content?: string
    author?: string
  }
  action: (formData: FormData) => Promise<void> | void
}

export function BlogForm({ initialValues, action }: BlogFormProps) {
  const [content, setContent] = useState<string>(initialValues?.content ?? "<p></p>")

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={initialValues?.title ?? ""} placeholder="Post title" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" defaultValue={initialValues?.subtitle ?? ""} placeholder="Optional subtitle" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Cover image URL</Label>
        <Input id="image" name="image" defaultValue={initialValues?.image ?? ""} placeholder="https://..." type="url" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" defaultValue={initialValues?.author ?? ""} placeholder="Your name" required />
      </div>
      <div className="grid gap-2">
        <Label>Content</Label>
        <TipTapEditor value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />
      </div>
      <div className="flex gap-3">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}


