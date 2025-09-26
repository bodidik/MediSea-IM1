import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: { instrumentationHook: true },
  webpack: (config) => {
    const root = process.cwd();
    const appDir = path.join(root, "app");

    config.resolve.alias["@"] = root;
    config.resolve.alias["@/app"] = appDir;
    config.resolve.alias["@/components"] = [
      path.join(root, "components"),
      path.join(appDir, "components"),
    ];

    return config;
  },
};
export default nextConfig;
