const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll,
  addWebpackPlugin,
  
} = require("customize-cra");

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
 
module.exports = {
  webpack: override(
    // usual webpack plugin
    addWebpackPlugin(new MonacoWebpackPlugin({
      languages: [ "typescript", "javascript" ]
    })),
  ),
  devServer: overrideDevServer(
      // dev server plugin
    watchAll(),
    (config) => {
      Object.assign(config.headers, {
        'X-Frame-Options': 'Deny',
        "Cache-Control": 'no-store',
      })
      return config;
    }
  ),
};

  
// },
// watchOptions: {
//   aggregateTimeout: 600,
// },

