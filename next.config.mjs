const dashboardRemoteUrl = (
  process.env.DASHBOARD_REMOTE_URL ?? "http://localhost:3001"
).replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  experimental: {
    cpus: 1,
  },
  transpilePackages: [
    "msw",
    "@mswjs/interceptors",
    "@open-draft/deferred-promise",
    "rettime",
    "until-async",
  ],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/dashboard/overview",
          destination: `${dashboardRemoteUrl}/api/dashboard/overview`,
        },
        {
          source: "/dashboard-assets/:path*",
          destination: `${dashboardRemoteUrl}/dashboard-assets/:path*`,
        },
        {
          source: "/dashboard",
          destination: dashboardRemoteUrl,
        },
        {
          source: "/dashboard/:path*",
          destination: `${dashboardRemoteUrl}/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
