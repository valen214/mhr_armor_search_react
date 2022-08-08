








module.exports = function(env){

  const isDevelopment = webpackEnv === 'development';
  const isProduction = webpackEnv === 'production';

  return {
    mode: isProduction ? 'production' : isDevelopment && 'development',
    // entry: ,
    resolve: {
      extensions: [ '.ts', '.js', '*' ],
      modules: [
        // path.resolve(__dirname, 'lib/mylib/src'),
        // path.resolve(__dirname, 'lib/mylib'),
        // path.resolve(__dirname, 'lib'),
        path.resolve(__dirname, 'src'),
      ],
      alias: {
        mylib: path.resolve(__dirname, 'lib/mylib/src'),
      },
    },
  }
}