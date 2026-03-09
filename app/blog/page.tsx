import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { blogPosts, formatDate } from "@/lib/blog-data";

export default function Blog() {
  return (
    <PageContainer>
      <h2 className="text-2xl font-semibold mb-8">Writing</h2>

      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="group">
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="md:w-32 flex-shrink-0 mb-2 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {post.readTime} Read
                </p>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-semibold text-lg group-hover:underline">
                      {post.title}
                    </h3>
                  </Link>
                  {post.tag && (
                    <Badge
                      variant={post.tag === "NEW" ? "default" : "outline"}
                      className="shrink-0"
                    >
                      {post.tag}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-border mt-6" />
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
