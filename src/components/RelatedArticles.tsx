import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getRelatedPosts, getLatestPosts } from "@/data/blogPosts";
import { useEffect, useRef, useState, useCallback } from "react";
import { useMobile } from "@/hooks/use-mobile";


interface RelatedArticlesProps {
  currentPostId?: number;
  limit?: number;
  mode?: "related" | "latest";
}

const RelatedArticles = ({ currentPostId, limit = 3, mode = "related" }: RelatedArticlesProps) => {
  const posts = mode === "latest"
    ? getLatestPosts(limit)
    : currentPostId !== undefined
      ? getRelatedPosts(currentPostId, limit)
      : [];

  if (posts.length === 0) return null;

  return (
    <section className="mt-16 py-12 bg-muted/30 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "latest" ? "جدیدترین مقالات" : "مقالات مرتبط"}
          </h2>
        </div>
        
        {/* Mobile: horizontal snap carousel to prevent long scrolling */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" dir="rtl">
          <div className="flex gap-4 pb-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group snap-start shrink-0 w-[82%]"
              >
                <Card className="h-full overflow-hidden !p-0 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  {post.image ? (
                    <div className="w-full aspect-[16/10] bg-muted overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <CardHeader className="pt-4 pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md font-medium">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      <span>مطالعه مقاله</span>
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: grid */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden !p-0 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                {post.image ? (
                  <div className="w-full aspect-[3/2] bg-muted overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : null}
                <CardHeader className="pt-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <span>مطالعه مقاله</span>
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span>مقالات بیشتر</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
