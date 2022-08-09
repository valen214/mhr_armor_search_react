
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = function(config, env){

  return {
    mode: "production",
    entry: {
      "game-related": path.resolve(
        __dirname,
        "src/lib/search_algo/game_related.ts"
      ),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-typescript',
                  '@babel/preset-react'
                ],
                plugins: [
                  isDevelopment && require.resolve('react-refresh/babel')
                ].filter(Boolean)
              }
            }
          ]
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  }
}