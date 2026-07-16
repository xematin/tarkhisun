import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

const ArticleImage = ({
  src,
  alt,
  caption,
  className,
  priority = false,
  aspectRatio = "16/9",
}: ArticleImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={cn("my-8", className)}>
      <div
        className="relative overflow-hidden rounded-lg w-full shadow-md bg-muted"
        style={{ aspectRatio }}
      >
        {!isLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-3 text-persian">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ArticleImage;
