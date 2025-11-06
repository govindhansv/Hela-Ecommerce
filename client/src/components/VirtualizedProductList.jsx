import React, { useState, useEffect, useRef, useMemo } from 'react';
import ProductCard2 from './Cards/ProductCard2';

const VirtualizedProductList = ({ 
  products = [], 
  itemHeight = 400, 
  containerHeight = 600,
  itemsPerRow = 3,
  gap = 16,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Calculate dimensions
  const itemWidth = useMemo(() => {
    if (containerWidth === 0) return 0;
    return (containerWidth - (gap * (itemsPerRow - 1))) / itemsPerRow;
  }, [containerWidth, itemsPerRow, gap]);

  const rowHeight = itemHeight + gap;
  const totalRows = Math.ceil(products.length / itemsPerRow);
  const totalHeight = totalRows * rowHeight;

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.min(
      totalRows - 1,
      Math.ceil((scrollTop + containerHeight) / rowHeight)
    );
    
    // Add buffer rows for smoother scrolling
    const bufferRows = 2;
    const bufferedStartRow = Math.max(0, startRow - bufferRows);
    const bufferedEndRow = Math.min(totalRows - 1, endRow + bufferRows);

    return {
      start: bufferedStartRow,
      end: bufferedEndRow
    };
  }, [scrollTop, rowHeight, containerHeight, totalRows]);

  // Get visible items
  const visibleItems = useMemo(() => {
    const items = [];
    for (let row = visibleRange.start; row <= visibleRange.end; row++) {
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index < products.length) {
          items.push({
            index,
            product: products[index],
            row,
            col,
            top: row * rowHeight,
            left: col * (itemWidth + gap)
          });
        }
      }
    }
    return items;
  }, [products, visibleRange, itemsPerRow, rowHeight, itemWidth, gap]);

  // Handle scroll
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for priority loading
  const [visibleIndexes, setVisibleIndexes] = useState(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleIndexes = new Set(visibleIndexes);
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            newVisibleIndexes.add(index);
          } else {
            newVisibleIndexes.delete(index);
          }
        });
        setVisibleIndexes(newVisibleIndexes);
      },
      {
        root: containerRef.current,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    // Observe all visible items
    const items = containerRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [visibleItems, visibleIndexes]);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      {/* Total height spacer */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Visible items */}
        {visibleItems.map(({ index, product, top, left }) => (
          <div
            key={`${product._id}-${index}`}
            data-index={index}
            className="absolute"
            style={{
              top,
              left,
              width: itemWidth,
              height: itemHeight
            }}
          >
            <ProductCard2
              product={product}
              priority={visibleIndexes.has(index)}
              className="h-full"
            />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {products.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default VirtualizedProductList;