/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: function (config, context) {
    if (!context.isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  optimizeFonts: true,
  // images: {
  //   loader: "custom",
  //   disableStaticImages: true
  // },
  compiler: {
    styledComponents: true
  }
};
module.exports = nextConfig;
// const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");
// module.exports = withPlugins([optimizedImages], nextConfig);
// module.exports = withPlugins(
//   [
//     [
//       optimizedImages,
//       {
//         // these are the default values so you don't have to provide them if they are good enough for your use-case.
//         // but you can overwrite them here with any valid value you want.
//         inlineImageLimit: 8192,
//         imagesFolder: "images",
//         imagesName: "[name]-[hash].[ext]",
//         handleImages: ["jpeg", "png", "webp", "gif", "svg"],
//         removeOriginalExtension: false,
//         optimizeImages: true,
//         optimizeImagesInDev: true,
//         mozjpeg: {
//           quality: 80
//         },
//         optipng: {
//           optimizationLevel: 3
//         },
//         pngquant: false,
//         gifsicle: {
//           interlaced: true,
//           optimizationLevel: 3
//         },
//         svgo: {
//             // enable/disable svgo plugins here
//         },
//         webp: {
//           preset: "default",
//           quality: 75
//         }
//       }
//     ]
//   ],
//   nextConfig
// );
