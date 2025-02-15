/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...other config options...
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: 'static/audio/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig
