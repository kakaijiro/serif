import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Blog } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { deleteBlog } from "../actions"

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).single()
  if (error || !data) return notFound()
  const blog = data as Blog

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{blog.title}</h1>
          {blog.subtitle ? <p className="text-muted-foreground">{blog.subtitle}</p> : null}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link href={`/blogs/${blog.slug}/edit`}>Edit</Link></Button>
          <form action={deleteBlog.bind(null, blog.slug)}>
            <Button type="submit" variant="destructive">Delete</Button>
          </form>
        </div>
      </div>
      <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p className="text-sm text-muted-foreground">By {blog.author}</p>
    </main>
  )
}


