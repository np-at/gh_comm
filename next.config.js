/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: function (config, context) {
        if (!context.isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    }
}

module.exports = nextConfig
