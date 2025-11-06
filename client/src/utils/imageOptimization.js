/**
 * Image optimization utilities for client-side compression and processing
 */

// Check if WebP is supported
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Check if AVIF is supported
export const supportsAVIF = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
};

// Compress image file
export const compressImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      format = 'image/jpeg'
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        },
        format,
        quality
      );
    };

    img.onerror = () => reject(new Error('Image loading failed'));
    img.src = URL.createObjectURL(file);
  });
};

// Generate responsive image sizes
export const generateResponsiveSizes = (baseWidth) => {
  const breakpoints = [320, 640, 768, 1024, 1280, 1536];
  return breakpoints
    .filter(bp => bp <= baseWidth * 2) // Don't generate sizes larger than 2x the base
    .map(width => `${width}w`)
    .join(', ');
};

// Create optimized image URL with parameters
export const createOptimizedUrl = (baseUrl, options = {}) => {
  if (!baseUrl) return '';
  
  const {
    width,
    height,
    quality = 75,
    format,
    fit = 'cover'
  } = options;

  const url = new URL(baseUrl, window.location.origin);
  
  if (width) url.searchParams.set('w', width);
  if (height) url.searchParams.set('h', height);
  if (quality) url.searchParams.set('q', quality);
  if (format) url.searchParams.set('f', format);
  if (fit) url.searchParams.set('fit', fit);

  return url.toString();
};

// Preload critical images
export const preloadImage = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    
    if (options.crossOrigin) {
      link.crossOrigin = options.crossOrigin;
    }
    
    link.onload = () => resolve(src);
    link.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    
    document.head.appendChild(link);
  });
};

// Lazy load images with Intersection Observer
export const createLazyLoader = (options = {}) => {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    loadingClass = 'loading',
    loadedClass = 'loaded'
  } = options;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.classList.remove(loadingClass);
          img.classList.add(loadedClass);
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin,
    threshold
  });

  return {
    observe: (img) => imageObserver.observe(img),
    unobserve: (img) => imageObserver.unobserve(img),
    disconnect: () => imageObserver.disconnect()
  };
};

// Convert image to WebP format
export const convertToWebP = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('WebP conversion failed'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => reject(new Error('Image loading failed'));
    img.src = URL.createObjectURL(file);
  });
};

// Get optimal image format based on browser support
export const getOptimalFormat = () => {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
};

// Calculate image dimensions maintaining aspect ratio
export const calculateDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = originalWidth;
  let height = originalHeight;
  
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
};