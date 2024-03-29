/* eslint-env commonjs */

const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  responsive: {
    adapter: require("responsive-loader/sharp"),
  },
  images: {
    disableStaticImages: true,
  },
  productionBrowserSourceMaps: false,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    });
    return config;
  },
});
