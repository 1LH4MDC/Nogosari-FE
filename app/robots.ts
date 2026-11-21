import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desanogosari.web.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/login',
        '/forgot-password',
        '/forgot-password/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
