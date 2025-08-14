import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, CheckCircle2, CircleDot, Clock3, ImageIcon } from 'lucide-react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  status?: 'Published' | 'Draft'
  readTimeMin?: number
  tags?: string[]
  image?: string | null
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      {/* Cover Image */}
      {post.image ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1">
            {post.status === 'Draft' ? (
              <CircleDot className="h-3.5 w-3.5" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            {post.status ?? 'Published'}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readTimeMin ?? 5} min read
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-balance">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(post.tags ?? []).map((tag) => (
            <Badge key={tag} variant="outline" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2">
            <Link href={`/blogs/${post.id}`}>
              <Eye className="h-4 w-4 mr-1" /> View
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


