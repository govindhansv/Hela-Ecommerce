import React, { useState, useEffect, useRef } from "react";
import { createOptimizedUrl, supportsWebP } from "../utils/imageOptimization";

const ImageZoom = ({ width, zoomedWidth, zoomedValue, imageUrl, alt = "Product image" }) => {
  const [hoverPosition, setHoverPosition] = useState(null);
  const [imageSize, setImageSize] = useState({ width: width, height: width });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const imgRef = useRef(null);

  // Create optimized image URLs
  const optimizedImageUrl = createOptimizedUrl(imageUrl, {
    width: width,
    height: width,
    quality: 85,
    format: supportsWebP() ? 'webp' : undefined
  });

  const highResImageUrl = createOptimizedUrl(imageUrl, {
    width: zoomedValue,
    height: zoomedValue,
    quality: 90,
    format: supportsWebP() ? 'webp' : undefined
  });

  useEffect(() => {
    if (imgRef.current && isImageLoaded) {
      setImageSize({ 
        width: imgRef.current.naturalWidth, 
        height: imgRef.current.naturalHeight 
      });
    }
  }, [isImageLoaded]);

  // Preload high resolution image on hover
  useEffect(() => {
    if (hoverPosition && !highResLoaded) {
      const img = new Image();
      img.onload = () => setHighResLoaded(true);
      img.src = highResImageUrl;
    }
  }, [hoverPosition, highResImageUrl, highResLoaded]);

  const handleHover = (e) => {
    const box1Rect = e.currentTarget.getBoundingClientRect();

    const relativeX = e.clientX - box1Rect.left;
    const relativeY = e.clientY - box1Rect.top;

    const boxSize = getBoxSize();
    const x = Math.min(
      box1Rect.width - boxSize,
      Math.max(0, relativeX - boxSize / 2)
    );
    const y = Math.min(
      box1Rect.height - boxSize,
      Math.max(0, relativeY - boxSize / 2)
    );

    setHoverPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const getBoxSize = () => {
    const ratio = 0.2;
    return Math.min(width * ratio, zoomedValue * ratio);
  };

  const zoomedHeight = (zoomedWidth / imageSize.width) * imageSize.height;

  const getZoomedImagePosition = () => {
    if (hoverPosition) {
      const percentageX = (hoverPosition.x / width) * 100;
      const percentageY = (hoverPosition.y / width) * 100;

      const bgPosX = Math.floor(
        ((zoomedValue - zoomedWidth) / 100) * percentageX
      );
      const bgPosY = Math.floor(
        ((zoomedValue - zoomedHeight) / 100) * percentageY
      );

      return `${-bgPosX}px ${-bgPosY}px`;
    }

    return "0% 0%";
  };

  return (
    <div className="container relative">
      <div
        className="box1 relative overflow-hidden cursor-crosshair"
        onMouseMove={handleHover}
        onMouseLeave={handleMouseLeave}
        style={{
          width: `${width}px`,
          height: `${width}px`,
        }}
      >
        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
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
        )}

        <img
          ref={imgRef}
          src={optimizedImageUrl}
          alt={alt}
          className={`image-style w-full h-full object-contain transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          loading="eager"
        />

        {hoverPosition && (
          <div
            className="mouseSquare absolute border-2 border-green-500 pointer-events-none"
            style={{
              left: hoverPosition.x + "px",
              top: hoverPosition.y + "px",
              width: `${getBoxSize()}px`,
              height: `${getBoxSize()}px`,
            }}
          />
        )}
      </div>

      {hoverPosition && (
        <div
          className="box2 absolute border border-gray-300 shadow-lg bg-white z-10"
          style={{
            width: `${zoomedWidth}px`,
            height: `${zoomedWidth}px`,
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            overflow: "hidden",
          }}
        >
          {!highResLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <span className="text-sm text-gray-500">Loading zoom...</span>
            </div>
          )}
          
          <div
            style={{
              backgroundImage: `url(${highResLoaded ? highResImageUrl : optimizedImageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: getZoomedImagePosition(),
              backgroundSize: `${zoomedValue}px ${zoomedValue}px`,
              width: `${zoomedWidth}px`,
              height: `${zoomedWidth}px`,
              opacity: highResLoaded ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}
            className="image-zoom-container"
          />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
