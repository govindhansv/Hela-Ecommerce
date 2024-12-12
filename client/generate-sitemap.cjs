// generate-sitemap.js
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");
const axios = require("axios");

const staticLinks = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  // Add more static URLs here
];

async function fetchProductSlugs() {
  // Replace with your actual API endpoint
  const response = await axios.get("https://api.yourdomain.com/products/slugs");
  return response.data.slugs; // Adjust according to your API response structure
}

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: "https://www.yourdomain.com" });

  // Write the sitemap to a file in the public directory
  const writeStream = createWriteStream(
    path.join(__dirname, "public", "sitemap.xml")
  );

  sitemap.pipe(writeStream);

  // Add static links to the sitemap
  staticLinks.forEach((link) => sitemap.write(link));

  // Fetch product slugs and add dynamic links to the sitemap
  const productSlugs = await fetchProductSlugs();
  productSlugs.forEach((slug) => {
    sitemap.write({
      url: `/product/${slug}`,
      changefreq: "weekly",
      priority: 0.9,
    });
  });

  sitemap.end();

  await streamToPromise(writeStream);
}

generateSitemap()
  .then(() => {
    console.log("Sitemap generated successfully.");
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });
