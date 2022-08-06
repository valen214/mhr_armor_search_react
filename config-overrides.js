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
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = overrideDevServer(
        // dev server plugin
        watchAll(),
        
      )(configFunction)(proxy, allowedHost)
      config.headers = {
        'X-Frame-Options': 'Deny',
        "Cache-Control": 'no-store',
      }
      return config
    };
  
    
  },
  watchOptions: {
    aggregateTimeout: 600,
  },
};
