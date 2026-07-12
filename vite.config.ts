import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
// @ts-ignore - Critters types issue
import Critters from 'critters';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    {
      name: 'vite-plugin-hero-injection',
      enforce: 'post' as const,
      transformIndexHtml: {
        order: 'post' as const,
        handler(html: string, ctx: any) {
          const { bundle } = ctx;
          if (!bundle) return html;
          
          // Find ALL hero image variants with hashed URLs
          const hero480Avif = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-480') && chunk.fileName?.endsWith('.avif')
          );
          const hero768Avif = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-768') && chunk.fileName?.endsWith('.avif')
          );
          const hero1024Avif = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-1024') && chunk.fileName?.endsWith('.avif')
          );
          const hero1440Avif = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-1440') && chunk.fileName?.endsWith('.avif')
          );
          const hero1920Avif = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-1920') && chunk.fileName?.endsWith('.avif')
          );
          
          // WebP fallbacks
          const hero480Webp = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-480') && chunk.fileName?.endsWith('.webp')
          );
          const hero768Webp = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-768') && chunk.fileName?.endsWith('.webp')
          );
          const hero1024Webp = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-1024') && chunk.fileName?.endsWith('.webp')
          );
          const hero1440Webp = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-1440') && chunk.fileName?.endsWith('.webp')
          );
          const hero1920Webp = Object.values(bundle).find(
            (chunk: any) => chunk.fileName?.includes('hero-port-1920') && chunk.fileName?.endsWith('.webp')
          );
          
          if (!hero1920Avif || !hero1024Webp) return html;
          
          // Create full <picture> element with media queries for each device size
          const pictureElement = `
        <picture id="hero-initial-image" style="position:absolute;inset:0;z-index:0;pointer-events:none;">
          <!-- Mobile: 480px only -->
          <source media="(max-width: 767px)" type="image/avif" srcset="/${(hero480Avif as any).fileName}" />
          <source media="(max-width: 767px)" type="image/webp" srcset="/${(hero480Webp as any).fileName}" />
          
          <!-- Tablet: 1024px only -->
          <source media="(min-width: 768px) and (max-width: 1439px)" type="image/avif" srcset="/${(hero1024Avif as any).fileName}" />
          <source media="(min-width: 768px) and (max-width: 1439px)" type="image/webp" srcset="/${(hero1024Webp as any).fileName}" />
          
          <!-- Desktop: 1920px only -->
          <source media="(min-width: 1440px)" type="image/avif" srcset="/${(hero1920Avif as any).fileName}" />
          <source media="(min-width: 1440px)" type="image/webp" srcset="/${(hero1920Webp as any).fileName}" />
          
          <!-- Fallback for older browsers -->
          <img 
            src="/${(hero1024Webp as any).fileName}"
            alt="بندر شهید رجایی بندرعباس و عملیات گمرکی ترخیص کالا"
            style="width:100%;height:100%;object-fit:cover;"
            width="1920"
            height="1080"
            fetchpriority="high"
            loading="eager"
            decoding="async" />
        </picture>`;
          
          // Conditional preload tags - only for homepage
          const conditionalPreloadScript = `
    <script>
      if (location.pathname === '/') {
        var preloads = [
          { href: '/${(hero480Avif as any).fileName}', media: '(max-width: 767px)' },
          { href: '/${(hero1024Avif as any).fileName}', media: '(min-width: 768px) and (max-width: 1439px)' },
          { href: '/${(hero1920Avif as any).fileName}', media: '(min-width: 1440px)' }
        ];
        preloads.forEach(function(p) {
          var link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = p.href;
          link.type = 'image/avif';
          link.fetchPriority = 'high';
          link.media = p.media;
          document.head.appendChild(link);
        });
      }
    </script>`;
          
          // Inject conditional preload script in <head>
          html = html.replace('<!-- LCP Hero Image Preload - Generated dynamically by vite-plugin-lcp-preload -->', conditionalPreloadScript);
          
          // Inject picture element right after <body>
          html = html.replace('<body>', `<body>\n    ${pictureElement}`);
          
          return html;
        }
      }
    },
    {
      name: 'vite-plugin-critters',
      enforce: 'post' as const,
      async transformIndexHtml(html: string) {
        const critters = new Critters({
          path: '/',
          preload: 'swap',
          pruneSource: true,
          logLevel: 'info',
          reduceInlineStyles: false,
        });
        return await critters.process(html);
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png', 'og-image.jpg', 'robots.txt'],
      manifest: {
        name: 'ترخیصان - مشاوره گمرکی بندرعباس',
        short_name: 'ترخیصان',
        description: 'مشاوره تخصصی امور گمرکی بندرعباس با هوش مصنوعی ترخیصان‌یار. ترخیص سریع کالا بندرعباس شهید رجایی با 20 سال تجربه',
        theme_color: '#1a472a',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'fa',
        dir: 'rtl',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['business', 'productivity', 'finance'],
        screenshots: [
          {
            src: '/og-image.jpg',
            sizes: '1200x630',
            type: 'image/jpeg'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Google Analytics excluded from Service Worker caching for real-time tracking
          {
            urlPattern: /^https:\/\/gomrok24\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'exchange-rate-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: false
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router-vendor';
          }
          
          // Radix UI - split into smaller chunks
          if (id.includes('@radix-ui/react-accordion') || 
              id.includes('@radix-ui/react-collapsible')) {
            return 'radix-accordion';
          }
          if (id.includes('@radix-ui/react-dialog') || 
              id.includes('@radix-ui/react-alert-dialog')) {
            return 'radix-dialog';
          }
          if (id.includes('@radix-ui')) {
            return 'radix-other';
          }
          
          // Utilities
          if (id.includes('clsx') || 
              id.includes('class-variance-authority') || 
              id.includes('tailwind-merge')) {
            return 'ui-utils';
          }
          
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Forms
          if (id.includes('react-hook-form') || 
              id.includes('@hookform/resolvers') || 
              id.includes('zod')) {
            return 'forms';
          }
          
          // Query client
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.woff2')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (assetInfo.name?.match(/\.(webp|avif|jpg|jpeg|png)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        arrows: true,
        collapse_vars: true,
        comparisons: true,
        computed_props: true,
        hoist_funs: true,
        hoist_props: true,
        hoist_vars: false,
        inline: true,
        loops: true,
        negate_iife: true,
        properties: true,
        reduce_funcs: true,
        reduce_vars: true,
        switches: true,
        toplevel: true,
        typeofs: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
}));
