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
        handler(html: string) {
          // Hero image pre-injection was removed to avoid the port photo flashing
          // during refresh/deep-link loads. The React app now renders the hero
          // itself, and index.html shows a skeleton placeholder until mount.
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
