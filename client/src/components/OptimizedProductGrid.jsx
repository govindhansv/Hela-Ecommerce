import React, { useState, useEffect, useMemo } from 'react';
import ProductCard2 from './Cards/ProductCard2';
import VirtualizedProductList from './VirtualizedProductList';
import { useLazyList } from '../hooks/useLazyLoading';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { URL } from '../Common/api';

const OptimizedProductGrid = ({ 
  initialProducts = [], 
  loadMoreProducts,
  useVirtualization = false,
  preloadImages = true,
  className = ''
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Extract image URLs for preloading
  const imageUrls = useMemo(() => {
    return products.map(product => `${URL}/img/${product.imageURL}`);
  }, [products]);

  // Preload images
  const { isLoading: imagesLoading, getLoadingStats } = useImagePreloader(
    preloadImages ? imageUrls.slice(0, 12) : [], // Preload first 12 images
    {
      priority: imageUrls.slice(0, 6), // Prioritize first 6 images
      batchSize: 3,
      delay: 100
    }
  );

  // Lazy loading for infinite scroll
  const loadMore = async () => {
    if (!loadMoreProducts || !hasMore) return false;

    try {
      const newProducts = await loadMoreProducts(page + 1);
      
      if (newProducts && newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
        return true;
      } else {
        setHasMore(false);
        return false;
      }
    } catch (error) {
      console.error('Error loading more products:', error);
      return false;
    }
  };

  const { sentinelRef, isLoading: loadingMore } = useLazyList(loadMore, {
    threshold: 0.8,
    rootMargin: '200px'
  });

  // Update products when initialProducts change
  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore(true);
  }, [initialProducts]);

  // Loading component
  const LoadingGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  // Show loading state for initial load
  if (products.length === 0 && (imagesLoading || loadingMore)) {
    return <LoadingGrid />;
  }

  // Virtualized list for large datasets
  if (useVirtualization && products.length > 50) {
    return (
      <div className={className}>
        <VirtualizedProductList
          products={products}
          itemHeight={400}
          containerHeight={800}
          itemsPerRow={window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1}
          gap={24}
        />
        
        {/* Infinite scroll sentinel */}
        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-8">
            {loadingMore && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Regular grid layout
  return (
    <div className={className}>
      {/* Image loading progress (development only) */}
      {process.env.NODE_ENV === 'development' && preloadImages && (
        <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
          Images: {getLoadingStats().loaded}/{getLoadingStats().total} loaded 
          ({getLoadingStats().progress}%)
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard2
            key={`${product._id}-${index}`}
            product={product}
            priority={index < 6} // Prioritize first 6 products
            className="transform transition-transform hover:scale-105"
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && !loadingMore && (
        <div ref={sentinelRef} className="h-10" />
      )}

      {/* No more products message */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more products to load
        </div>
      )}

      {/* Empty state */}
      {products.length === 0 && !loadingMore && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default OptimizedProductGrid;