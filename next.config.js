/** @type {import('next').NextConfig} */

const devConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
}

const extraProdConfig = {
    basePath: "",
}

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log("Using development configuration")
    return devConfig
  } else {
    /* config options for all phases except development here */
    console.log("Using production configuration")
    let prodConfig = Object.assign(devConfig, extraProdConfig) // This makes sure that static builds contain the CSS
    return prodConfig
  }

}
