const WEBPACK = require('webpack');
const PATH = require('path');
const ENV = require('yargs').argv.env; 
const UglifyJsPlugin = WEBPACK.optimize.UglifyJsPlugin;

const PROD_BUILD = "build";
const nameSpace = 'infiniteScroll';

let PLUGINS = [];

let OUTPUT_FILE = null;

if (ENV === PROD_BUILD) {

    PLUGINS.push(new UglifyJsPlugin({ minimize: true }));
    PLUGINS.push( new WEBPACK.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }));
    OUTPUT_FILE = nameSpace + '.min.js';

} else {

    OUTPUT_FILE = nameSpace + '.js';

}

const CONFIG = {
    entry: './app/index.js',
    output: {
      path: PATH.resolve(__dirname, 'dist'),
      filename: OUTPUT_FILE
    },
    module: {
      loaders: [
        {
          loader:'babel-loader',
          test: /\.js$/,
          exclude:  /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
              "style-loader",
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
      }
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    plugins: PLUGINS
}

// Exporting
module.exports = CONFIG;