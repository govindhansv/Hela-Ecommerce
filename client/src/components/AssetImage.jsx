import React from 'react';
import OptimizedImage from './OptimizedImage';
import { getAsset } from '../utils/assetOptimization';

/**
 * Component for rendering optimized static assets
 * Usage: <AssetImage asset="LOGO_RED" className="w-32 h-16" />
 */
const AssetImage = ({ 
  asset, 
  className = '', 
  width, 
  height, 
  priority, 
  quality, 
  sizes,
  ...props 
}) => {
  const assetConfig = getAsset(asset);
  
  if (!assetConfig) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Asset not found</span>
      </div>
    );
  }

  return (
    <OptimizedImage
      src={assetConfig.src}
      alt={assetConfig.alt}
      className={className}
      width={width}
      height={height}
      priority={priority !== undefined ? priority : assetConfig.priority}
      quality={quality !== undefined ? quality : assetConfig.quality}
      sizes={sizes || assetConfig.sizes}
      {...props}
    />
  );
};

export default AssetImage;