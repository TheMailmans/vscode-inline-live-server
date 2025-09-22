/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  target: 'node', // VS Code extensions run in Node.js context
  entry: './src/extension.ts', // Main entry point
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    clean: true, // Clean the output directory before emit
  },
  devtool: 'source-map', // Generate source maps for debugging
  externals: {
    vscode: 'commonjs vscode', // VS Code API is external
    'fsevents': 'commonjs fsevents', // Native module external
    'vsls': 'commonjs vsls', // Live Share native module external
    'live-server': 'commonjs live-server', // Live server module external
    // Additional native modules that might cause issues
    'chokidar': 'commonjs chokidar',
    'faye-websocket': 'commonjs faye-websocket',
    'http-proxy': 'commonjs http-proxy',
    'proxy-middleware': 'commonjs proxy-middleware',
    'connect': 'commonjs connect',
    'serve-index': 'commonjs serve-index',
    'morgan': 'commonjs morgan',
    'cors': 'commonjs cors',
    'http-auth': 'commonjs http-auth',
    'send': 'commonjs send',
    'opn': 'commonjs opn',
    'event-stream': 'commonjs event-stream',
    'colors': 'commonjs colors',
    'emitter': 'commonjs emitter',
    'http-shutdown': 'commonjs http-shutdown',
    'ips': 'commonjs ips',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.node$/,
        use: 'ignore-loader',
      },
      {
        test: /vsls\/vscode\.ts$/,
        use: 'ignore-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Keep console logs for debugging
            drop_debugger: true,
          },
          mangle: {
            keep_fnames: true, // Keep function names for debugging
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: false, // Disable code splitting for VS Code extensions
  },
  plugins: [
    // Handle dynamic requires in live-server module
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    // Ignore dynamic requires for native modules
    new webpack.IgnorePlugin({
      resourceRegExp: /^fsevents$/,
    }),
    // Handle dynamic requires in live-server
    new webpack.ContextReplacementPlugin(
      /live-server/,
      (data) => {
        delete data.dependencies;
      }
    ),
    // Ignore native modules that cause issues
    new webpack.IgnorePlugin({
      resourceRegExp: /^(chokidar|faye-websocket|http-proxy|proxy-middleware|connect|serve-index|morgan|cors|http-auth|send|opn|event-stream|colors|emitter|http-shutdown|ips)$/,
    }),
    // Copy package.json and other necessary files to dist
    new CopyPlugin({
      patterns: [
        { from: 'package.json', to: 'package.json' },
        { from: 'README.md', to: 'README.md' },
        { from: 'CHANGELOG.md', to: 'CHANGELOG.md' },
        { from: 'LICENSE', to: 'LICENSE' },
        { from: 'images', to: 'images' },
        { from: 'media', to: 'media' },
        { from: 'lib', to: 'lib' },
      ],
    }),
  ],
  stats: {
    colors: true,
    errorDetails: true,
  },
  // Performance hints
  performance: {
    hints: 'warning',
    maxEntrypointSize: 2048000, // 2MB for large VS Code extensions
    maxAssetSize: 2048000, // 2MB for large VS Code extensions
  },
};

// Development configuration
const devConfig = {
  ...config,
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  plugins: [
    ...config.plugins,
  ],
};

// Production configuration
const prodConfig = {
  ...config,
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    ...config.plugins,
    // Bundle analyzer for production builds
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-analysis.html',
      openAnalyzer: false,
    }),
  ],
};

// Export configurations based on environment
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return devConfig;
  }
  return prodConfig;
};