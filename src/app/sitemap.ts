import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://awakenedarpit.github.io/Elvyn'
  return [{ url: baseUrl, changeFrequency: 'weekly', priority: 1 }]
}
