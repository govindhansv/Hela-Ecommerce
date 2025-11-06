import React, { useEffect, useState } from "react";

const Sitemap = () => {
  const [sitemap, setSitemap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Native XML parser function (no external dependencies)
  const parseXMLSitemap = (xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("XML parsing failed");
    }
    
    const urls = Array.from(xmlDoc.querySelectorAll("url")).map((urlNode) => ({
      loc: urlNode.querySelector("loc")?.textContent || "",
      lastmod: urlNode.querySelector("lastmod")?.textContent || "",
      changefreq: urlNode.querySelector("changefreq")?.textContent || "",
      priority: urlNode.querySelector("priority")?.textContent || "",
    }));
    
    return urls;
  };

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_URL + "/sitemap.xml"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        const urls = parseXMLSitemap(xmlText);
        
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
