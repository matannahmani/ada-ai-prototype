import "./src/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  // modularizeImports: {
  //   ""
  // },
  experimental: { serverActions: true },
}
export default config
