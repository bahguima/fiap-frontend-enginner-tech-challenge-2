/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  assetPrefix: "/dashboard-assets",
  compiler: { styledComponents: true },
  experimental: { cpus: 1 },
  transpilePackages: [
    "msw",
    "@mswjs/interceptors",
    "@open-draft/deferred-promise",
    "rettime",
    "until-async",
  ],
};

export default nextConfig;
