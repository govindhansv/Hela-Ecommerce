/**
 * Asset optimization utilities for static images
 */

// Import all static assets
import logo from '../assets/Helah_Logo_red.jpg';
import logoBlack from '../assets/logoBlack.png';
import logoGrey from '../assets/logoGrey.png';
import logoWhite from '../assets/logoWhite.png';
import whitelogo from '../assets/whitelogo.jpg';
import emptyCart from '../assets/emptyCart.png';
import aboutBG from '../assets/aboutBG.png';
import loginBG from '../assets/LoginBG.png';
import signUpBG from '../assets/SignUpBG.png';
import forgot from '../assets/forgot.png';
import fourIphone from '../assets/fourIphone.png';
import iphone from '../assets/iphone.png';
import helahposter from '../assets/helahposter.jpg';
import newsletter from '../assets/newletter.png';
import error404 from '../assets/404.png';

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
  LOGO_BLACK: {
    src: logoBlack,
    alt: 'Helah Logo Black',
    priority: false,
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
  LOGO_WHITE: {
    src: logoWhite,
    alt: 'Helah Logo White',
    priority: false,
    quality: 90,
    sizes: '(max-width: 768px) 150px, 250px'
  },
  WHITE_LOGO: {
    src: whitelogo,
    alt: 'Helah White Logo',
    priority: false,
    quality: 90,
    sizes: '(max-width: 768px) 150px, 250px'
  },

  // UI Images (medium priority)
  EMPTY_CART: {
    src: emptyCart,
    alt: 'Empty Cart',
    priority: false,
    quality: 80,
    sizes: '(max-width: 768px) 200px, 300px'
  },
  ERROR_404: {
    src: error404,
    alt: '404 Error',
    priority: false,
    quality: 80,
    sizes: '(max-width: 768px) 300px, 400px'
  },

  // Background Images (low priority, lower quality for faster loading)
  ABOUT_BG: {
    src: aboutBG,
    alt: 'About Us Background',
    priority: false,
    quality: 70,
    sizes: '100vw'
  },
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
  },
  FORGOT_BG: {
    src: forgot,
    alt: 'Forgot Password',
    priority: false,
    quality: 75,
    sizes: '(max-width: 768px) 100vw, 50vw'
  },

  // Product Images (medium priority, good quality)
  FOUR_IPHONE: {
    src: fourIphone,
    alt: 'iPhone Collection',
    priority: false,
    quality: 85,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  IPHONE: {
    src: iphone,
    alt: 'iPhone',
    priority: false,
    quality: 85,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },

  // Marketing Images
  HELAH_POSTER: {
    src: helahposter,
    alt: 'Helah Poster',
    priority: false,
    quality: 80,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  NEWSLETTER: {
    src: newsletter,
    alt: 'Newsletter',
    priority: false,
    quality: 75,
    sizes: '(max-width: 768px) 100vw, 400px'
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
    'aboutBG.png',
    'emptyCart.png',
    'LoginBG.png',
    'SignUpBG.png',
    'logoBlack.png',
    'logoGrey.png',
    'logoWhite.png',
    'newletter.png',
    'fourIphone.png',
    'iphone.png',
    '404.png'
  ],
  
  // These JPEGs can be further compressed
  COMPRESS_JPEG: [
    'Helah_Logo_red.jpg',
    'helahposter.jpg',
    'whitelogo.jpg'
  ],
  
  // Recommended sizes for responsive images
  RESPONSIVE_SIZES: {
    logo: [150, 250, 300],
    background: [768, 1024, 1920],
    product: [300, 600, 900],
    ui: [200, 400, 600]
  }
};

export default ASSETS;