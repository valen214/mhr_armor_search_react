const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll,
  addWebpackPlugin,
  babelInclude,
  addWebpackAlias,
  getBabelLoader,
  addWebpackResolve
} = require("customize-cra");

/*
https://medium.com/@justintulk/
how-to-turn-your-reusable-react-components-
into-an-external-dependency-part-1-ae29b4d4e5
*/


// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require("path");
 
module.exports = {
  webpack: override(
    // usual webpack plugin
    // addWebpackResolve({
    //   modules: [
    //     path.resolve(__dirname, "src/lib/mylib/src"),
    //     path.resolve(__dirname, "src/lib/mylib")
    //   ]
    // }),
    addWebpackAlias({
      "mylib": [
        path.join(__dirname, "src/lib/mylib/src")
      ]
    }),
    // (config) => {
    //   const aliases = {
    //     "mylib": [
    //       path.join(__dirname, "src/lib/mylib/src")
    //     ]
    //   }
    //   console.log(path.join(__dirname, "lib/mylib"));
    //   return addWebpackAlias(aliases)(config);
    // },
    // (config) => {
    //   const loader = getBabelLoader(config, false);
    //   const commonPath = path.normalize(
    //     path.join(process.cwd(), "lib/mylib/tsconfig.json")
    //   ).replace(/\\/g, "\\");
    //   loader.include = [ loader.include, commonPath ];
    //   return config;
    // },
    // addWebpackPlugin(new MonacoWebpackPlugin({
    //   languages: [ "typescript", "javascript" ]
    // })),
    babelInclude([
      path.resolve("src"),
      path.resolve("src/lib/mylib/src"),
    ])
  ),
  devServer: overrideDevServer(
      // dev server plugin
    watchAll(),
    (config) => {
      Object.assign(config.headers, {
        'X-Frame-Options': 'Deny',
        "Cache-Control": 'no-store',
        "Access-Control-Allow-Origin": "*",
      })
      return config;
    }
  ),
}

  
// },
// watchOptions: {
//   aggregateTimeout: 600,
// },

