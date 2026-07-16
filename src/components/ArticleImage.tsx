import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  /** Aspect ratio used only for the skeleton placeholder before load. */
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
      <div className="relative w-full rounded-lg overflow-hidden shadow-md">
        {!isLoaded && (
          <Skeleton
            className="w-full rounded-lg"
            style={{ aspectRatio }}
          />
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            "block w-full h-auto rounded-lg transition-opacity duration-700",
            isLoaded ? "opacity-100 static" : "opacity-0 absolute inset-0"
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
