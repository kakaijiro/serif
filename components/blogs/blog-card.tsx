import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Pencil, CheckCircle2, CircleDot, Clock3 } from 'lucide-react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  status?: 'Published' | 'Draft'
  readTimeMin?: number
  tags?: string[]
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full">
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
        <CardDescription>
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
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


