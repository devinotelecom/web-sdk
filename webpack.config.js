const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv').config();

module.exports = (env) => {
  let BASE_URL = '';
  if (env && env.BASE_URL) {
    BASE_URL = env.BASE_URL;
  } else if (dotenv.parsed && dotenv.parsed.BASE_URL) {
    BASE_URL = dotenv.parsed.BASE_URL;
  }

  const IS_DEV = env && env.dev;

  // WebSDK config
  const webSdkConfig = {
    mode: 'production',
    entry: './src/web-sdk/index.ts',
    output: {
      filename: 'devino-web-sdk.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'Devino',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(BASE_URL),
      }),
      new CopyPlugin({
        patterns: [{ from: 'src/_samples/', to: '' }],
        options: {
          concurrency: 100,
        },
      }),
    ],
  };

  // Service worker config
  const swConfig = {
    mode: 'production',
    entry: './src/sw/index.ts',
    output: {
      filename: 'sw.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(BASE_URL),
      }),
    ],
  };

  if (IS_DEV) {
    webSdkConfig.devtool = 'source-map';
    swConfig.devtool = 'source-map';
  }

  return [webSdkConfig, swConfig];
};
