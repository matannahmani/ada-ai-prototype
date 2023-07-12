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
    "react-icons": {
      transform: "react-icons/{{kebabCase member}}",
      skipDefaultConversion: true,
    },
  },
  experimental: { serverActions: true },
}
export default config
