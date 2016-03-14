var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    'phaser-flappy-bird': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    alias: {
      p2: path.join(__dirname, 'node_modules/phaser/build/custom/p2.js'),
      pixi: path.join(__dirname, 'node_modules/phaser/build/custom/pixi.js'),
      phaser: path.join(__dirname, 'node_modules/phaser/build/custom/phaser-split.js')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, 'src')
        ]
      }
    ],
    loaders: [
      {
        test: /phaser-split\.js$/,
        include: path.join(__dirname, 'node_modules/phaser'),
        loader: 'imports?p2=p2&PIXI=pixi'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'source-map',
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.ProvidePlugin({
       'Phaser': 'phaser'
   })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
