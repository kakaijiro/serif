import { BlogCard } from '@/components/blogs/blog-card'
import type { BlogPost } from '@/components/blogs/blog-card'

export default function DashboardBlogsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Blogs</h1>
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
    title: 'Designing with Tailwind v4',
    excerpt: 'Utility-first with CSS variables: what changed and how to migrate.',
    author: 'Jamie Doe',
    date: '2025-05-01',
    status: 'Published',
    readTimeMin: 4,
    tags: ['tailwind', 'css', 'design'],
  },
  {
    id: '2',
    title: 'Radix + Shadcn UI Best Practices',
    excerpt: 'Accessible primitives paired with elegant components for production apps.',
    author: 'Pat Rivera',
    date: '2025-04-28',
    status: 'Published',
    readTimeMin: 7,
    tags: ['radix', 'shadcn', 'ui'],
  },
  {
    id: '3',
    title: 'RLS Policies that Scale',
    excerpt: 'Patterns for safe and maintainable Supabase Row Level Security.',
    author: 'Taylor Smith',
    date: '2025-04-21',
    status: 'Draft',
    readTimeMin: 9,
    tags: ['supabase', 'rls', 'security'],
  },
]


