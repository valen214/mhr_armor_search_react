const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll 
} = require("customize-cra");
 
module.exports = {
  webpack: override(
    // usual webpack plugin
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  ),
  watchOptions: {
    aggregateTimeout: 600,
  },
};