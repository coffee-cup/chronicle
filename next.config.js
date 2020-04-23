const withPWA = require("next-pwa");
const nextSourceMaps = require("@zeit/next-source-maps")();
const withPlugins = require("next-compose-plugins");

const isProd = process.env.NODE_ENV === "production";

module.exports = withPlugins([withPWA, nextSourceMaps], {
  pwa: {
    disable: !isProd,
    dest: "public",
  },
  env: {
    SENTRY_DSN: isProd ? process.env.SENTRY_DSN : "",
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    return config;
  },
});
