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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container || posts.length === 0) return;
    const clamped = Math.max(0, Math.min(index, posts.length - 1));
    const children = container.querySelectorAll(".article-slide");
    const target = children[clamped] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
    setActiveIndex(clamped);
  }, [posts.length]);

  const nextSlide = useCallback(() => {
    const next = activeIndex >= posts.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(next);
  }, [activeIndex, posts.length, scrollToIndex]);

  useEffect(() => {
    if (!isMobile || posts.length <= 1) return;
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, posts.length, nextSlide]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!container || isDraggingRef.current) return;
      const children = Array.from(container.querySelectorAll(".article-slide")) as HTMLElement[];
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [posts.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isDraggingRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = touchStartRef.current.x - touch.clientX;
    const dy = touchStartRef.current.y - touch.clientY;
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !scrollRef.current) {
      touchStartRef.current = null;
      isDraggingRef.current = false;
      return;
    }
    const touch = e.changedTouches[0];
    const dx = touchStartRef.current.x - touch.clientX;
    const dy = touchStartRef.current.y - touch.clientY;
    const threshold = 40;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (dx > 0) {
        scrollToIndex(activeIndex + 1);
      } else {
        scrollToIndex(activeIndex - 1);
      }
    }
    touchStartRef.current = null;
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 200);
    // restart auto-slide
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (posts.length > 1) {
      intervalRef.current = setInterval(nextSlide, 4000);
    }
  };

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

        {/* Mobile: horizontal snap carousel with auto-slide and swipe */}
        <div className="md:hidden -mx-4 px-4">
          <div
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4"
            dir="rtl"
          >
            {posts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="article-slide group snap-start shrink-0 w-[82%]"
                data-index={index}
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

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-2">
            {posts.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`مقاله ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-primary" : "bg-primary/30"
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
