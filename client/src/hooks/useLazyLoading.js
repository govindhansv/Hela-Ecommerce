import { useState, useEffect, useRef, useCallback } from 'react';

export const useLazyLoading = (options = {}) => {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const observe = useCallback((element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isCurrentlyIntersecting = entry.isIntersecting;
          setIsIntersecting(isCurrentlyIntersecting);

          if (isCurrentlyIntersecting && !hasIntersected) {
            setHasIntersected(true);
            
            if (triggerOnce) {
              observerRef.current?.disconnect();
            }
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    observerRef.current.observe(element);
  }, [rootMargin, threshold, triggerOnce, hasIntersected]);

  useEffect(() => {
    if (elementRef.current) {
      observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [observe]);

  const reset = useCallback(() => {
    setIsIntersecting(false);
    setHasIntersected(false);
    if (elementRef.current) {
      observe(elementRef.current);
    }
  }, [observe]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
    shouldLoad: triggerOnce ? hasIntersected : isIntersecting,
    reset
  };
};

// Hook for lazy loading lists with pagination
export const useLazyList = (loadMore, options = {}) => {
  const {
    threshold = 0.8,
    rootMargin = '100px'
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);
          try {
            const result = await loadMore();
            if (result === false || (result && result.hasMore === false)) {
              setHasMore(false);
            }
          } catch (error) {
            console.error('Error loading more items:', error);
          } finally {
            setIsLoading(false);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore, isLoading, hasMore, threshold, rootMargin]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setHasMore(true);
  }, []);

  return {
    sentinelRef,
    isLoading,
    hasMore,
    reset
  };
};

export default useLazyLoading;