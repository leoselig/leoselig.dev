/* eslint-env commonjs */

module.exports = {
  compiler: {},
  productionBrowserSourceMaps: false,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    });
    return config;
  },
};
