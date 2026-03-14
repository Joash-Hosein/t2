const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure PNG and other images are bundled properly
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg').concat(['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp']);

module.exports = config;
