const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // eslint-disable-line
const CompressionWebpackPlugin = require('compression-webpack-plugin') // eslint-disable-line

const autoprefixer = require('autoprefixer') // eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin') // eslint-disable-line
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // eslint-disable-line


const root = process.cwd()
const src = path.join(root, 'src')

const isDev = process.env.NODE_ENV

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [
      // modify this if importing css from other libs
      path.resolve(src, 'universal/a'),
    ],
  },
}

const cssLoader = {
  loader: 'css-loader',
  options: {
    root: src,
    minimize: true,
    modules: true,
    camelCase: false,
    importLoaders: 1,
    localIdentName: isDev ? 'uik-[name]__[local]' : '[hash:8]',
  },
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      }),
    ],
  },
}


const stylingLoaders = [
  cssLoader,
  postCssLoader,
  sassLoader,
]

const razzleConfig = {
  plugins: [],
  modify: (baseConfig, { target, dev }) => {
    const appConfig = Object.assign({}, baseConfig)

    // Setup SCSS
    appConfig.module.rules.push(dev && target === 'web'
      ? {
        test: /.(s)css$/,
        use: [
          'style-loader',
          ...stylingLoaders,
        ],
      }
      : {
        test: /.(s)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: stylingLoaders,
        }),
      })

    // For correct SSR, we still need this on server as well so always extract it
    appConfig.plugins.push(new ExtractTextPlugin('static/css/[name].[hash:8].css'))
    // appConfig.plugins.push(new BundleAnalyzerPlugin())

    if (!dev) {
      appConfig.plugins.push(new CompressionWebpackPlugin({
        include: [
          /\/*.css/,
          /\/*.js/,
        ],
      }))
    }

    return appConfig
  },
}

if (isDev) {
  razzleConfig.plugins.push('flow')
}

module.exports = razzleConfig
