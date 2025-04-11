import React, { useEffect } from 'react';
import axios from 'axios';

const SitemapGenerator = () => {
  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Fetch sitemap data from backend
        const response = await axios.get('http://localhost:3000/api/sitemap?format=json');
        const { data } = response;
        console.log(data);
        
        // Construct XML structure
        const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
        const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        const urlsetClose = '</urlset>';

        const urls = data
          .map((route) => `
            <url>
              <loc>${route}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `)
          .join('');

        const sitemapXML = `${xmlHeader}${urlsetOpen}${urls}${urlsetClose}`;

        // Trigger a download of the sitemap
        const blob = new Blob([sitemapXML], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'sitemap.xml';
        link.click();
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    generateSitemap();
  }, []);

  return <div>Sitemap is being generated...</div>;
};

export default SitemapGenerator;
