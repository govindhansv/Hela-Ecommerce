import { useState, useEffect, useCallback } from 'react';
import { preloadImage } from '../utils/imageOptimization';

export const useImagePreloader = (images = [], options = {}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    priority = [],
    batchSize = 3,
    delay = 100
  } = options;

  const preloadBatch = useCallback(async (imageBatch) => {
    const promises = imageBatch.map(async (src) => {
      try {
        await preloadImage(src);
        setLoadedImages(prev => new Set([...prev, src]));
        return { src, success: true };
      } catch (error) {
        setFailedImages(prev => new Set([...prev, src]));
        return { src, success: false, error };
      }
    });

    return Promise.allSettled(promises);
  }, []);

  const preloadImages = useCallback(async () => {
    if (images.length === 0) return;

    setIsLoading(true);
    setProgress(0);

    // Sort images by priority
    const priorityImages = images.filter(img => priority.includes(img));
    const regularImages = images.filter(img => !priority.includes(img));
    const sortedImages = [...priorityImages, ...regularImages];

    let loadedCount = 0;

    // Process images in batches
    for (let i = 0; i < sortedImages.length; i += batchSize) {
      const batch = sortedImages.slice(i, i + batchSize);
      
      await preloadBatch(batch);
      
      loadedCount += batch.length;
      setProgress((loadedCount / sortedImages.length) * 100);

      // Add delay between batches to prevent overwhelming the browser
      if (i + batchSize < sortedImages.length && delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    setIsLoading(false);
  }, [images, priority, batchSize, delay, preloadBatch]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const isImageLoaded = useCallback((src) => {
    return loadedImages.has(src);
  }, [loadedImages]);

  const isImageFailed = useCallback((src) => {
    return failedImages.has(src);
  }, [failedImages]);

  const getLoadingStats = useCallback(() => {
    return {
      total: images.length,
      loaded: loadedImages.size,
      failed: failedImages.size,
      progress: Math.round(progress),
      isComplete: !isLoading && loadedImages.size + failedImages.size === images.length
    };
  }, [images.length, loadedImages.size, failedImages.size, progress, isLoading]);

  return {
    isLoading,
    progress,
    loadedImages,
    failedImages,
    isImageLoaded,
    isImageFailed,
    getLoadingStats,
    preloadImages
  };
};

export default useImagePreloader;