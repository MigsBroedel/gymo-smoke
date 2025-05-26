const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
});
