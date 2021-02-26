/* eslint-env node */

const { getEnvironmentVariable } = require("./scripts/environmentVariables");

module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:5000/"],
      staticDistDir: getEnvironmentVariable("LIGHTHOUSE_STATIC_SITE_PATH"),
    },
    upload: {
      target: "filesystem",
      outputDir: "./_reports/lighthouse",
    },
  },
};
