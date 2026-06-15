import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPostBySlug } from "@/data/blogPosts";

const SITE = "https://tarkhisun.com";
const DEFAULT_OG = `${SITE}/og-image.jpg`;

/**
 * Auto-injects per-article Open Graph + Twitter Card metadata on /blog/:slug pages.
 *
 * Rendered AFTER <Routes> in App.tsx so react-helmet-async dedupes
 * og:image / twitter:image / og:url etc. in favor of these per-article values,
 * overriding any generic defaults already declared on the page.
 *
 * Source of truth: src/data/blogPosts.ts (each post's `image`, title, excerpt).
 */
const AutoBlogSEO = () => {
  const { pathname } = useLocation();

  if (!pathname.startsWith("/blog/")) return null;

  const slug = pathname.replace(/^\/blog\//, "").replace(/\/+$/, "");
  if (!slug) return null;

  const post = getPostBySlug(slug);
  if (!post) return null;

  const url = `${SITE}/blog/${post.slug}`;
  const image = post.image
    ? (post.image.startsWith("http") ? post.image : `${SITE}${post.image}`)
    : DEFAULT_OG;
  const description = post.excerpt;
  const title = `${post.title} | ترخیصان`;

  return (
    <Helmet>
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="ترخیصان" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={post.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:section" content={post.category} />
      {post.keywords?.map((k) => (
        <meta key={k} property="article:tag" content={k} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={post.title} />
    </Helmet>
  );
};

export default AutoBlogSEO;
