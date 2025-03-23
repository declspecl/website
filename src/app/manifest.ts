import { MetadataRoute } from 'next/server'

export default function Manifest(): MetadataRoute {
  return {
    name: 'DuckDuckCode',
    short_name: 'DDC',
    description: 'AI DevTool: Code smarter, not harder.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}
