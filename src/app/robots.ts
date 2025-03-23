import { MetadataRoute } from 'next/server'

export default function Robots(): MetadataRoute {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.duckduckcode.com/sitemap.xml',
  }
}
