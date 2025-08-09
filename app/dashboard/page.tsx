import { BlogCard } from '@/components/blogs/blog-card'
import type { BlogPost } from '@/components/blogs/blog-card'

export default function DashboardHomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Home</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Server Actions in Next.js',
    excerpt:
      'A concise guide to using Server Actions for data mutations with excellent DX and performance.',
    author: 'Alex Kim',
    date: '2025-05-22',
    status: 'Published',
    readTimeMin: 5,
    tags: ['next.js', 'server actions', 'typescript'],
  },
  {
    id: '2',
    title: 'Optimizing Images with Next/Image',
    excerpt:
      'How to squeeze optimal Core Web Vitals by properly sizing and lazy-loading images.',
    author: 'Dana Lee',
    date: '2025-05-18',
    status: 'Published',
    readTimeMin: 6,
    tags: ['images', 'webp', 'lcp'],
  },
  {
    id: '3',
    title: 'Supabase Auth with @supabase/ssr',
    excerpt:
      'A production-ready pattern for SSR auth without deprecated helpers and with robust cookie handling.',
    author: 'Chris Park',
    date: '2025-05-10',
    status: 'Draft',
    readTimeMin: 8,
    tags: ['supabase', 'auth', 'ssr'],
  },
]


