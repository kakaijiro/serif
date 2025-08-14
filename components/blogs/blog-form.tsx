"use client"

import { useState, useEffect } from "react"
import { TipTapEditor } from "@/components/blogs/tiptap-editor"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone"
import { useSupabaseUpload } from "@/hooks/use-supabase-upload"

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
  const [imageUrl, setImageUrl] = useState<string>(initialValues?.image ?? "")

  // Dropzone configuration for blog images
  const dropzoneProps = useSupabaseUpload({
    bucketName: 'blog-images',
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxFiles: 1,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  })

  // Update image URL when upload is successful
  useEffect(() => {
    if (dropzoneProps.isSuccess && dropzoneProps.uploadedUrls.length > 0) {
      setImageUrl(dropzoneProps.uploadedUrls[0])
    }
  }, [dropzoneProps.isSuccess, dropzoneProps.uploadedUrls])

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
        <Label>Cover Image</Label>
        <div className="space-y-4">
          <Dropzone {...dropzoneProps} className="w-full">
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
          {/* Fallback URL input for manual entry */}
          <div className="grid gap-2">
            <Label htmlFor="image" className="text-sm text-muted-foreground">Or enter image URL manually</Label>
            <Input 
              id="image" 
              name="image" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..." 
              type="url" 
            />
          </div>
        </div>
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


