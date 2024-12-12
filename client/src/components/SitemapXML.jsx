import React, { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

const Sitemap = () => {
  const [sitemap, setSitemap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_URL + "/sitemap.xml"
        );
        const xmlText = await response.text(); // Get the raw XML response
        const result = await parseStringPromise(xmlText); // Parse XML to JS object

        // Access the URLs from the parsed XML
        const urls = result.urlset.url.map((url) => ({
          loc: url.loc[0],
          lastmod: url.lastmod[0],
          changefreq: url.changefreq[0],
          priority: url.priority[0],
        }));

        setSitemap(urls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        {sitemap.map((url, index) => (
          <li key={index}>
            <a href={url.loc} target="_blank" rel="noopener noreferrer">
              {url.loc}
            </a>
            <br />
            <small>
              Last Modified: {new Date(url.lastmod).toLocaleString()}
            </small>
            <br />
            <small>Change Frequency: {url.changefreq}</small>
            <br />
            <small>Priority: {url.priority}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
