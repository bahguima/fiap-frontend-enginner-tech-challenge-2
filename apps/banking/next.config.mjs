/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [
    "@open-draft/deferred-promise",
    "@open-draft/logger",
    "@open-draft/until",
    "rettime",
    "until-async",
  ],
};

export default nextConfig;
