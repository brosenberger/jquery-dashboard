/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'jquery.dashboard';

let plugins = [], outputFile, entryFile = 'index.js', library = 'Dashboard';

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({minimize: true}));
    outputFile = libraryName + '.min.js';
} else {
    if (env === 'sample') {
        entryFile = 'samples.js';
        libraryName = 'jquery.dashboard.samples';
        library = 'DashboardSamples';
    }

    outputFile = libraryName + '.js';
}


const config = {
    entry: __dirname + '/src/js/'+entryFile,
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile,
        library: library,
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
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js', '.handlebars'],
        alias: {
            'handlebars': 'handlebars/runtime.js'
        }
    },
    plugins: plugins
};

module.exports = config;