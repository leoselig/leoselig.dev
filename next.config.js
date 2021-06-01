/* eslint-env commonjs */

const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  trailingSlash: true,

  responsive: {
    adapter: require("responsive-loader/sharp"),
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
