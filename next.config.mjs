/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Fonts are loaded via <link> in app/layout.tsx; skip Next's build-time
  // stylesheet inlining so the build has no external network dependency.
  optimizeFonts: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // The www host is configured in App Hosting to serve this same app, which
  // made it a complete duplicate of the site: every www page rendered fine and
  // pointed its canonical at the apex, so Search Console reported www URLs as
  // "Alternate page with proper canonical tag" and indexed none of them.
  // A 301 to the apex leaves one crawlable host and keeps www traffic.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.goldendiamondupholstery.co.za' }],
        destination: 'https://goldendiamondupholstery.co.za/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
export default nextConfig;
