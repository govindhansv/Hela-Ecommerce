import { useEffect } from 'react';

const PerformanceMonitor = ({ enabled = process.env.NODE_ENV === 'development' }) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
          
          // Send to analytics if needed
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              event_category: 'Performance'
            });
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer not supported');
        }

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
            
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(entry.processingStart - entry.startTime),
                event_category: 'Performance'
              });
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observer not supported');
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsValue * 1000),
              event_category: 'Performance'
            });
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observer not supported');
        }
      }
    };

    // Monitor resource loading
    const observeResources = () => {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Log slow resources (over 1 second)
            if (entry.duration > 1000) {
              console.warn(`Slow resource: ${entry.name} - ${Math.round(entry.duration)}ms`);
            }
            
            // Monitor image loading specifically
            if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
              console.log(`Image loaded: ${entry.name} - ${Math.round(entry.duration)}ms`);
            }
          });
        });
        
        try {
          resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
          console.warn('Resource observer not supported');
        }
      }
    };

    // Monitor long tasks
    const observeLongTasks = () => {
      if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.warn(`Long task detected: ${Math.round(entry.duration)}ms`);
            
            if (window.gtag) {
              window.gtag('event', 'long_task', {
                value: Math.round(entry.duration),
                event_category: 'Performance'
              });
            }
          });
        });
        
        try {
          longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
          console.warn('Long task observer not supported');
        }
      }
    };

    // Monitor memory usage (Chrome only)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const logMemory = () => {
          const memory = performance.memory;
          console.log('Memory usage:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
          });
        };

        // Log memory usage every 30 seconds
        const memoryInterval = setInterval(logMemory, 30000);
        
        return () => clearInterval(memoryInterval);
      }
    };

    // Initialize monitoring
    observeWebVitals();
    observeResources();
    observeLongTasks();
    const cleanupMemory = monitorMemory();

    // Cleanup function
    return () => {
      if (cleanupMemory) cleanupMemory();
    };
  }, [enabled]);

  // Component doesn't render anything
  return null;
};

// Hook for component-level performance monitoring
export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // Longer than one frame (60fps)
        console.warn(`${componentName} render time: ${Math.round(renderTime)}ms`);
      }
    };
  });
};

// Hook for measuring custom metrics
export const useCustomMetric = (metricName) => {
  const startMeasure = () => {
    performance.mark(`${metricName}-start`);
  };

  const endMeasure = () => {
    performance.mark(`${metricName}-end`);
    performance.measure(metricName, `${metricName}-start`, `${metricName}-end`);
    
    const measure = performance.getEntriesByName(metricName)[0];
    console.log(`${metricName}: ${Math.round(measure.duration)}ms`);
    
    // Clean up marks and measures
    performance.clearMarks(`${metricName}-start`);
    performance.clearMarks(`${metricName}-end`);
    performance.clearMeasures(metricName);
    
    return measure.duration;
  };

  return { startMeasure, endMeasure };
};

export default PerformanceMonitor;