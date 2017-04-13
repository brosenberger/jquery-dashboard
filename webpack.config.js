/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'jquery.dashboard';

let plugins = [], outputFile, entryFile = 'index.js', library = 'Dashboard';

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({minimize: true}));
    outputFile = '.min.js';
} else {
    outputFile = '.js';
}

const config = {
    entry: {
        core: __dirname + '/src/modules/core/index.js',
        templates: __dirname + '/src/modules/templates/index.js',
        jqueryui: __dirname + '/src/modules/jquery-ui/index.js',
        samples: __dirname + '/src/modules/samples/index.js',
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: libraryName+".[name]"+outputFile,
        library: ["Dashboard", "[name]"],
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.handlebars/,
                loader: "handlebars-template-loader"
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./modules')],
        extensions: ['.json', '.js', '.handlebars'],
        alias: {
            'handlebars': 'handlebars/runtime.js'
        }
    },
    plugins: plugins
};

module.exports = config;