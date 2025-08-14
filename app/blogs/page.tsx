import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { Blog } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blogs/blog-card"
import type { BlogPost } from "@/components/blogs/blog-card"

export default async function BlogsIndexPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("blogs").select("slug,title,subtitle,author,created_at,image,content").order("created_at", { ascending: false })
  if (error) {
    return <div className="p-6">Failed to load blogs</div>
  }
  const blogs = (data ?? []) as Pick<Blog, "slug" | "title" | "subtitle" | "author" | "created_at" | "image" | "content">[]

  // Transform database blogs to BlogPost format for BlogCard
  const blogPosts: BlogPost[] = blogs.map((blog) => ({
    id: blog.slug,
    title: blog.title,
    excerpt: blog.subtitle || blog.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
    author: blog.author,
    date: blog.created_at,
    status: 'Published',
    readTimeMin: Math.ceil((blog.content.replace(/<[^>]*>/g, '').length / 200)), // Rough estimate: 200 chars per minute
    tags: [], // You can add tags to your blog schema later if needed
    image: blog.image,
  }))

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Button asChild>
          <Link href="/blogs/new">New Post</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}


