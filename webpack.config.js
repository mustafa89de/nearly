const path = require('path');
const webpack = require("webpack");

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.vue$/, use: 'vue-loader'},
      {test: /\.css$/, use: ['vue-style-loader', 'css-loader', 'postcss-loader']},
      {test: /\.scss$/, use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']},
      {test: /\.svg$/, use: {loader: 'vue-svg-loader', options: {svgo: {plugins: [{removeViewBox: false}]}}}},
      {test: /\.sw\.js$/i, use: [{loader: 'file-loader'}]}
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    },
    extensions: [
      '.vue',
      '.js'
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/frontend/index.html',
    }),
    new CleanWebpackPlugin(),
    new WebpackPwaManifest({ // must be after HtmlWebpackPlugin
      name: 'nearly',
      short_name: 'nearlyPWA',
      background_color: '#ffffff',
      theme_color: "#FFFFFF",
      display: "standalone",
      scope: "/",
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve("src/frontend/assets/pwaicons/192.png"),
          sizes: '192x192'
        },
        {
          src: path.resolve("src/frontend/assets/pwaicons/192.png"),
          sizes: '512x512'
        }
      ]
    }),
    new webpack.DefinePlugin({
      'MAPBOX_TOKEN': process.env.MAPBOX_TOKEN
    })
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
};