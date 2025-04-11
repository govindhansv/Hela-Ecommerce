// Filename - sitemapRouter.js

const slugify = require("slugify");
const express = require("express"),
  { SitemapStream, streamToPromise } = require("sitemap"),
  Todo = require("../model/productModel"),
  date = new Date().toISOString(),
  zlib = require("zlib"),
  router = express.Router();

let sitemap;

router.get("/", async function (req, res) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  // If we have a cached entry send it
  if (sitemap) return res.send(sitemap);

  try {
    // Fetching todo records and mapping
    // it the desired URL pattern
    const data = await Todo.find(),
      todos = data.map(({ _id, name }) => {
        const slug = slugify(name, { lower: true, strict: true });
        return `/product/${_id}/${slug}`;
      }),
      // Base url of our site
      smStream = new SitemapStream({
        hostname: "https://helah.in/",
      }),
      pipeline = smStream.pipe(zlib.createGzip());

    // Write todo URL to the stream
    todos.forEach((item) =>
      smStream.write({
        url: item,
        // lastmod: date,
        // changefreq: "daily",
        // priority: 0.7,
      })
    );

    // Manually add all the other important URLs
    smStream.write({
      url: "/about",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });
    smStream.write({
      url: "/contact",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });

    // Cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    smStream.end();

    // Stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
