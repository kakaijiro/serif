import { BlogForm } from "@/components/blogs/blog-form"
import { createBlog } from "../actions"

export default function NewBlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">New Blog Post</h1>
      <BlogForm action={createBlog} />
    </main>
  )
}


