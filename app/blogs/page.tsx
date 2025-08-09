import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { Blog } from "@/types/blog"
import { Button } from "@/components/ui/button"

export default async function BlogsIndexPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("blogs").select("slug,title,subtitle,author,created_at,image").order("created_at", { ascending: false })
  if (error) {
    return <div className="p-6">Failed to load blogs</div>
  }
  const blogs = (data ?? []) as Pick<Blog, "slug" | "title" | "subtitle" | "author" | "created_at" | "image">[]

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Button asChild>
          <Link href="/blogs/new">New Post</Link>
        </Button>
      </div>
      <ul className="grid gap-4">
        {blogs.map((b) => (
          <li key={b.slug} className="rounded-md border p-4 hover:bg-muted/50">
            <Link href={`/blogs/${b.slug}`} className="block">
              <h2 className="text-xl font-medium">{b.title}</h2>
              {b.subtitle ? <p className="text-muted-foreground">{b.subtitle}</p> : null}
              <p className="mt-2 text-sm text-muted-foreground">By {b.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}


