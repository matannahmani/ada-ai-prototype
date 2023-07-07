import "./src/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  transpilePackages: ["lucide-react"],
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
  experimental: { serverActions: true },
}
export default config
