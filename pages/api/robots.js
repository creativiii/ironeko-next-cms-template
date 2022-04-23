import { Config } from "../../ironeko.config";

export default async function sitemapFunc(req, res) {
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");
  const robots = `User-agent: * \nDisallow: \nSitemap: ${Config.base}/sitemap.xml`;
  res.status(200).send(robots);
}
