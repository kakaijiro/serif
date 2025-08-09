"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface TipTapEditorProps {
  value: string
  onChange: (html: string) => void
}

export function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true, protocols: ["http", "https", "mailto"] }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none min-h-40 p-4 border rounded-md focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("URL", previousUrl ?? "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-2 rounded-md border bg-background p-1 shadow">
        <Button size="sm" variant={editor.isActive("bold") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBold().run()}>B</Button>
        <Button size="sm" variant={editor.isActive("italic") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Button>
        <Button size="sm" variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
        <Button size="sm" variant={editor.isActive("bulletList") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Button>
        <Button size="sm" variant={editor.isActive("orderedList") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Button>
        <Button size="sm" variant={editor.isActive("link") ? "default" : "outline"} onClick={toggleLink}>Link</Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}


