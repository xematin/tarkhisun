import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { blogPosts as importedBlogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const postsPerPage = 8;

  // Sort posts by id descending (newest first)
  const allBlogPosts = [...importedBlogPosts].sort((a, b) => b.id - a.id);

  // Get unique categories
  const categories = ["همه", ...Array.from(new Set(allBlogPosts.map((post) => post.category)))];

  // Filter posts by selected category and search query
  const blogPosts = allBlogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "همه" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const baseUrl = "https://tarkhisun.com/blog";
  const canonicalUrl = currentPage === 1 ? baseUrl : `${baseUrl}?page=${currentPage}`;

  useEffect(() => {
    // Set RTL direction for Persian content
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
  }, []);

  // Structured Data for Blog
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "بلاگ مشاوره امور گمرکی بندرعباس | ترخیصان",
    description: "مقالات تخصصی مشاوره امور گمرکی بندرعباس شهید رجایی، راهنمای ترخیص کالا و قوانین گمرکی",
    url: "https://tarkhisun.com/blog",
    publisher: {
      "@type": "Organization",
      name: "ترخیصان",
      address: {
        "@type": "PostalAddress",
        addressLocality: "بندرعباس",
        addressRegion: "هرمزگان",
        addressCountry: "IR",
      },
    },
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Calculate pagination for display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
       <Helmet>
        <link rel="canonical" href="https://tarkhisun.com/blog" />
        <title>{currentPage === 1 ? "بلاگ مشاوره امور گمرکی بندرعباس شهید رجایی | مقالات تخصصی ترخیص کالا" : `بلاگ گمرکی بندرعباس - صفحه ${currentPage} | مقالات ترخیص کالا`}</title>
        <meta name="description" content={currentPage === 1 ? "مقالات تخصصی مشاوره امور گمرکی بندرعباس شهید رجایی، راهنمای ترخیص کالا، قوانین گمرکی و آخرین اخبار تجاری ایران" : `صفحه ${currentPage} از ${totalPages} - مقالات تخصصی گمرکی بندرعباس شهید رجایی و راهنمای ترخیص کالا`} />
        <meta name="keywords" content="مشاوره امور گمرکی, بندرعباس, شهید رجایی, ترخیص کالا, واردات, صادرات, گمرک, تجارت بین المللی, قوانین گمرکی" />
        
        {currentPage > 1 && (
          <link rel="prev" href={currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`} />
        )}
        {currentPage < totalPages && (
          <link rel="next" href={`${baseUrl}?page=${currentPage + 1}`} />
        )}
        <meta property="og:title" content={currentPage === 1 ? "بلاگ گمرکی بندرعباس | مقالات تخصصی ترخیص کالا" : `بلاگ گمرکی بندرعباس - صفحه ${currentPage}`} />
        <meta property="og:description" content={currentPage === 1 ? "مقالات تخصصی مشاوره امور گمرکی بندرعباس شهید رجایی" : `صفحه ${currentPage} از ${totalPages} - مقالات تخصصی گمرکی بندرعباس`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="ترخیصان" />
        <meta property="og:image" content="https://tarkhisun.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="بلاگ ترخیصان - مقالات تخصصی گمرکی و ترخیص کالا" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentPage === 1 ? "بلاگ گمرکی بندرعباس | مقالات تخصصی ترخیص کالا" : `بلاگ گمرکی - صفحه ${currentPage}`} />
        <meta name="twitter:description" content={currentPage === 1 ? "مقالات تخصصی مشاوره امور گمرکی بندرعباس شهید رجایی" : `صفحه ${currentPage} از ${totalPages} - مقالات گمرکی`} />
        <meta name="twitter:image" content="https://tarkhisun.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

      <PageBreadcrumb items={[{ label: "بلاگ" }]} />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-white">
          <div className="container mx-auto px-4" dir="rtl">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="heading-primary mb-6 text-persian">
                بلاگ مشاوره امور گمرکی
                <br />
                <span className="text-accent">بندرعباس شهید رجایی</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-persian">
                مقالات تخصصی، راهنمای جامع و آخرین اخبار حوزه گمرک و تجارت بین‌المللی
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground text-persian">
                <span>✓ راهنمای ترخیص کالا</span>
                <span>✓ قوانین گمرکی</span>
                <span>✓ نکات واردات و صادرات</span>
                <span>✓ اخبار تجاری</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4" dir="rtl">
              <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <h2 className="heading-secondary mb-4 text-persian">آخرین مقالات</h2>
                <p className="text-lg text-muted-foreground text-persian">
                  با مطالعه مقالات ما از آخرین رویه‌ها و قوانین گمرکی مطلع شوید
                </p>
              </div>

              {/* Search Box */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground text-persian">جستجو در مقالات</h3>
                </div>
                <div className="relative max-w-md">
                  <Input
                    type="text"
                    placeholder="جستجو بر اساس عنوان یا محتوا..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-3 text-persian"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mt-3 text-persian">
                    <strong>{blogPosts.length}</strong> نتیجه برای "<strong className="text-accent">{searchQuery}</strong>"
                  </p>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground text-persian">فیلتر بر اساس دسته‌بندی</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer text-sm px-4 py-2 transition-all hover:scale-105 text-persian ${
                        selectedCategory === category
                          ? "bg-accent text-white hover:bg-accent/90"
                          : "hover:bg-accent/10 hover:text-accent hover:border-accent"
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                      {category !== "همه" && (
                        <span className="mr-2 text-xs opacity-70">
                          ({allBlogPosts.filter((post) => post.category === category).length})
                        </span>
                      )}
                      {category === "همه" && <span className="mr-2 text-xs opacity-70">({allBlogPosts.length})</span>}
                    </Badge>
                  ))}
                </div>
                {(selectedCategory !== "همه" || searchQuery) && (
                  <p className="text-sm text-muted-foreground mt-4 text-persian">
                    نمایش <strong>{blogPosts.length}</strong> مقاله
                    {selectedCategory !== "همه" && (
                      <> در دسته‌بندی <strong className="text-accent">{selectedCategory}</strong></>
                    )}
                  </p>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {currentPosts.map((post) => (
                  <Card key={post.id} className="card-service group cursor-pointer overflow-hidden !p-0">
                    <div className="w-full aspect-[16/7] bg-muted overflow-hidden">

                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
                      )}
                    </div>
                    <CardHeader className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full text-persian">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground text-persian">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>

                      <CardTitle className="text-xl group-hover:text-accent transition-colors text-persian">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="text-persian line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground text-persian">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>

                        <Link to={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="group text-persian">
                            ادامه مطلب
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center" dir="ltr">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index + 1}>
                          <PaginationLink
                            onClick={() => handlePageChange(index + 1)}
                            isActive={currentPage === index + 1}
                            className="cursor-pointer"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {/* Coming Soon */}
              <div className="mt-16 text-center">
                <div className="bg-secondary/50 rounded-2xl p-8 max-w-2xl mx-auto">
                  <h3 className="heading-tertiary mb-4 text-persian">مقالات بیشتر به زودی</h3>
                  <p className="text-muted-foreground mb-6 text-persian">
                    ما در حال تهیه مقالات جامع در زمینه مشاوره امور گمرکی، ترخیص کالا و تجارت بین‌المللی هستیم
                  </p>
                  <Button variant="outline" className="text-persian">
                    اطلاع از انتشار مقالات جدید
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Blog;
