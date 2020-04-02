const withPWA = require("next-pwa");
const nextSourceMaps = require("@zeit/next-source-maps")();
const withPlugins = require("next-compose-plugins");
const webpack = require("webpack");

console.log("SENTRY DSN", process.env.SENTRY_DSN);

module.exports = withPlugins([withPWA, nextSourceMaps], {
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
  },
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    return config;
  },
});
