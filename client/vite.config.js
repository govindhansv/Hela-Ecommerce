import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true
    }), 
    sentryVitePlugin({
      org: "gokul-hans-v",
      project: "javascript-react"
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/Common"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },

  build: {
    sourcemap: true,
    // Optimize build performance
    target: 'esnext',
    minify: 'esbuild', // Use esbuild instead of terser (faster and built-in)
    // Remove terserOptions since we're using esbuild
    rollupOptions: {
      output: {
        // Optimize chunk splitting
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // State management
          'redux': ['@reduxjs/toolkit', 'react-redux'],
          
          // UI components
          'ui-components': ['@radix-ui/react-slot', 'lucide-react'],
          
          // Form handling
          'forms': ['formik', 'yup'],
          
          // Charts and visualization
          'charts': ['chart.js', 'react-chartjs-2'],
          
          // Utilities
          'utils': ['axios', 'date-fns', 'slugify'],
          
          // Image handling
          'image-utils': ['react-image-crop'],
          
          // Carousel
          'carousel': ['react-slick', 'slick-carousel']
        },
        // Optimize asset naming
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace('.jsx', '').replace('.js', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset inlining
    assetsInlineLimit: 4096
  },

  server: {
    hmr: {
      overlay: false
    },
    // Optimize dev server
    fs: {
      strict: true
    }
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'axios',
      'formik',
      'yup'
    ],
    exclude: ['@sentry/vite-plugin']
  },

  // Fix Node.js module compatibility
  define: {
    global: 'globalThis',
  },

  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` };
      } else {
        return { relative: true };
      }
    }
  }
});