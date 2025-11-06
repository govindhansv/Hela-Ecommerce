/**
 * Asset optimization utilities for static images
 */

// Import only used static assets
import logo from '../assets/Helah_Logo_red.jpg';
import logoGrey from '../assets/logoGrey.png';
import loginBG from '../assets/LoginBG.png';
import signUpBG from '../assets/SignUpBG.png';

// Asset registry with optimization settings
export const ASSETS = {
  // Logos (high priority, high quality)
  LOGO_RED: {
    src: logo,
    alt: 'Helah Logo',
    priority: true,
    quality: 90,
    sizes: '(max-width: 768px) 150px, 250px'
  },
  LOGO_GREY: {
    src: logoGrey,
    alt: 'Helah Logo Grey',
    priority: false,
    quality: 90,
    sizes: '(max-width: 768px) 150px, 250px'
  },

  // Background Images (low priority, lower quality for faster loading)
  LOGIN_BG: {
    src: loginBG,
    alt: 'Login Background',
    priority: false,
    quality: 70,
    sizes: '100vw'
  },
  SIGNUP_BG: {
    src: signUpBG,
    alt: 'Sign Up Background',
    priority: false,
    quality: 70,
    sizes: '100vw'
  }
};

// Helper function to get asset with default optimization
export const getAsset = (assetKey) => {
  const asset = ASSETS[assetKey];
  if (!asset) {
    console.warn(`Asset ${assetKey} not found`);
    return null;
  }
  return asset;
};

// Preload critical assets
export const preloadCriticalAssets = () => {
  const criticalAssets = Object.values(ASSETS).filter(asset => asset.priority);
  
  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset.src;
    document.head.appendChild(link);
  });
};

// Asset optimization recommendations
export const OPTIMIZATION_TIPS = {
  // Convert these to WebP format for better compression
  CONVERT_TO_WEBP: [
    'LoginBG.png',
    'SignUpBG.png',
    'logoGrey.png'
  ],
  
  // These JPEGs can be further compressed
  COMPRESS_JPEG: [
    'Helah_Logo_red.jpg'
  ],
  
  // Recommended sizes for responsive images
  RESPONSIVE_SIZES: {
    logo: [150, 250, 300],
    background: [768, 1024, 1920]
  }
};

export default ASSETS;