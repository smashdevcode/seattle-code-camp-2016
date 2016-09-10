const path = require('path');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.join(__dirname, '/app'),
        filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    module: {
      loaders: [
        { 
          test: /\.ts$/, 
          loader: 'ts-loader' 
        }
      ]
    }
};