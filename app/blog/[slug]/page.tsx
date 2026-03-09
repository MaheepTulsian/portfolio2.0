import { notFound } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { getBlogPost, formatDate, blogPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Back to blog
        </Link>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {/* Header */}
        <div className="not-prose mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {post.tag && (
              <Badge
                variant={post.tag === "NEW" ? "default" : "outline"}
                className="shrink-0"
              >
                {post.tag}
              </Badge>
            )}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readTime} Read</span>
          </div>
        </div>

        {/* Content */}
        {post.content ? (
          <div className="prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-pre:bg-muted prose-code:text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="mb-4">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 space-y-1 list-disc list-inside">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 space-y-1 list-decimal list-inside">{children}</ol>,
                code: ({ className, children, ...props }: any) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="underline decoration-foreground/30 hover:decoration-foreground transition-colors">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-muted-foreground">
            <p>Content coming soon...</p>
            <p className="mt-4">{post.description}</p>
          </div>
        )}
      </article>
    </PageContainer>
  );
}
