import React, { useState, useEffect, useRef } from 'react';
import { createOptimizedUrl, supportsWebP } from '../utils/imageOptimization';

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  quality = 75,
  sizes,
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Create low quality placeholder
  const lowQualitySrc = createOptimizedUrl(src, {
    width: Math.min(width || 50, 50),
    quality: 20
  });

  // Create high quality source
  const highQualitySrc = createOptimizedUrl(src, {
    width,
    height,
    quality,
    format: supportsWebP() ? 'webp' : undefined
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Progressive loading effect
  useEffect(() => {
    if (!isInView || !src) return;

    let isCancelled = false;

    const loadImage = async () => {
      try {
        // First load low quality image
        if (lowQualitySrc && lowQualitySrc !== src) {
          const lowQualityImg = new Image();
          lowQualityImg.onload = () => {
            if (!isCancelled) {
              setCurrentSrc(lowQualitySrc);
            }
          };
          lowQualityImg.src = lowQualitySrc;
        }

        // Then load high quality image
        const highQualityImg = new Image();
        highQualityImg.onload = () => {
          if (!isCancelled) {
            setCurrentSrc(highQualitySrc);
            setIsLoaded(true);
            if (onLoad) onLoad();
          }
        };
        highQualityImg.onerror = () => {
          if (!isCancelled) {
            setHasError(true);
            if (onError) onError();
          }
        };
        highQualityImg.src = highQualitySrc;
      } catch (error) {
        if (!isCancelled) {
          setHasError(true);
          if (onError) onError();
        }
      }
    };

    loadImage();

    return () => {
      isCancelled = true;
    };
  }, [isInView, src, lowQualitySrc, highQualitySrc, onLoad, onError]);

  // Placeholder component
  const Placeholder = () => (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className}`}
      style={{ width, height }}
    >
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );

  // Error component
  const ErrorPlaceholder = () => (
    <div
      className={`bg-gray-100 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-500">
        <svg
          className="w-8 h-8 mx-auto mb-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-xs">Failed to load</span>
      </div>
    </div>
  );

  if (hasError) {
    return <ErrorPlaceholder />;
  }

  if (!isInView) {
    return (
      <div ref={imgRef} className={className} style={{ width, height }}>
        <Placeholder />
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={currentSrc || placeholder}
        alt={alt}
        className={`
          w-full h-full object-cover transition-all duration-500
          ${!isLoaded ? 'blur-sm scale-105' : 'blur-0 scale-100'}
          ${currentSrc === lowQualitySrc ? 'filter blur-sm' : ''}
        `}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default ProgressiveImage;