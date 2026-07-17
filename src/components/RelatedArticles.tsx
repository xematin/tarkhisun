import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getRelatedPosts, getLatestPosts } from "@/data/blogPosts";
import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";


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

  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontalSwipeRef = useRef(false);

  const goTo = useCallback((index: number) => {
    if (posts.length === 0) return;
    const clamped = ((index % posts.length) + posts.length) % posts.length;
    setActiveIndex(clamped);
  }, [posts.length]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % Math.max(posts.length, 1));
  }, [posts.length]);

  useEffect(() => {
    if (!isMobile || posts.length <= 1) return;
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, posts.length, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isHorizontalSwipeRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    if (!isHorizontalSwipeRef.current && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      isHorizontalSwipeRef.current = true;
    }
    if (isHorizontalSwipeRef.current) {
      setDragOffset(dx);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const threshold = 50;
    if (isHorizontalSwipeRef.current && Math.abs(dx) > threshold) {
      // RTL: swipe right (dx > 0) => previous, swipe left => next
      if (dx > 0) goTo(activeIndex - 1);
      else goTo(activeIndex + 1);
    }
    setDragOffset(0);
    touchStartRef.current = null;
    isHorizontalSwipeRef.current = false;
    if (posts.length > 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, 4000);
    }
  };

  if (posts.length === 0) return null;

  const renderCard = (post: typeof posts[number], variant: "mobile" | "desktop") => (
    <Card className="h-full overflow-hidden !p-0 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {post.image ? (
        <div className={`w-full ${variant === "mobile" ? "aspect-[16/10]" : "aspect-[3/2]"} bg-muted overflow-hidden`}>
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : null}
      <CardHeader className={variant === "mobile" ? "pt-4 pb-2" : "pt-5"}>
        <div className={`flex items-center gap-2 ${variant === "mobile" ? "text-xs" : "text-sm"} text-muted-foreground mb-2`}>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md font-medium">
            {post.category}
          </span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <CardTitle className={`${variant === "mobile" ? "text-base line-clamp-2" : "text-lg"} leading-tight group-hover:text-primary transition-colors`}>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={variant === "mobile" ? "pt-0" : ""}>
        <CardDescription className={`text-sm ${variant === "mobile" ? "line-clamp-2 mb-3" : "line-clamp-3 mb-4"}`}>
          {post.excerpt}
        </CardDescription>
        <div className="flex items-center gap-2 text-primary font-medium text-sm">
          <span>مطالعه مقاله</span>
          <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="mt-16 py-12 bg-muted/30 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "latest" ? "جدیدترین مقالات" : "مقالات مرتبط"}
          </h2>
        </div>

        {/* Mobile: cross-fade slider (no page scroll interference) */}
        <div className="md:hidden">
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden touch-pan-y select-none"
            style={{ minHeight: 340 }}
          >
            {posts.map((post, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={post.id}
                  className={`transition-all duration-700 ease-in-out ${
                    isActive
                      ? "relative opacity-100 translate-x-0"
                      : "absolute inset-0 opacity-0 pointer-events-none"
                  }`}
                  style={isActive && dragOffset !== 0 ? { transform: `translateX(${dragOffset}px)`, transition: "none" } : undefined}
                  aria-hidden={!isActive}
                >
                  <Link to={`/blog/${post.slug}`} className="group block">
                    {renderCard(post, "mobile")}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4">
            {posts.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`مقاله ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-6" : "bg-primary/30 w-2.5"
                }`}
              />
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
