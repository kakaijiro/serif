import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Blog } from "@/types/blog"
import { BlogForm } from "@/components/blogs/blog-form"
import { updateBlog } from "../../actions"

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).single()
  if (error || !data) return notFound()
  const blog = data as Blog

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Edit Blog Post</h1>
      <BlogForm
        initialValues={{
          title: blog.title,
          subtitle: blog.subtitle,
          image: blog.image,
          content: blog.content,
          author: blog.author,
        }}
        action={updateBlog.bind(null, blog.slug)}
      />
    </main>
  )
}


