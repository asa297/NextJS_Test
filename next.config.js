// next.config.js
const withPlugins = require('next-compose-plugins')
const path = require('path')
const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')

const nextConfig = {
  /* config options here */
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // Important: return the modified config

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '<components>': path.resolve(__dirname, './components'),
      '<actions>': path.resolve(__dirname, './stores/actions'),
      '<reducers>': path.resolve(__dirname, './stores/reducers'),
      '<utils>': path.resolve(__dirname, './utils'),
      '<action_types>': path.resolve(__dirname, './stores/type'),
      '<styles>': path.resolve(__dirname, './styles'),
      '<services>': path.resolve(__dirname, './services'),
      '<helpers>': path.resolve(__dirname, './helpers'),
      '<static>': path.resolve(__dirname, './static'),
    }

    new Dotenv({
      path: path.join(__dirname, '.env'),
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    })

    return config
  },
}

module.exports = withPlugins(
  [
    [
      withSass,
      {
        cssModules: true,
        // cssLoaderOptions: {
        //   localIdentName: '[local]___[hash:base64:5]',
        // },
      },
    ],
  ],
  nextConfig,
)
