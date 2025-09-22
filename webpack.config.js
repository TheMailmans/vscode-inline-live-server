/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    target: 'node',
    entry: './src/extension-enhanced.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'extension-enhanced.js',
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: isProduction ? false : 'source-map',
    externals: {
      vscode: 'commonjs vscode',
      'live-server': 'commonjs live-server'
    },
    resolve: {
      extensions: ['.ts', '.js']
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
                configFile: 'tsconfig.json'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'package.json',
            to: 'package.json'
          }
        ]
      })
    ],
    optimization: {
      minimize: isProduction
    }
  };
};