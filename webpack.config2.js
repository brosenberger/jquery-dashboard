'use strict';

var webpack = require('webpack');


const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

var config = {
    context: __dirname + '/src/js', // `__dirname` is root of project and `src` is source
    entry: {
        app: './index.js',
        library: 'jquery.dashboard',
        libraryTarget: 'umd'
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: '[name].bundle.js',
        publicPath: '/assets'
    },
    devServer: {
        open: true, // to open the local server in browser
        contentBase: [__dirname + '/demo', __dirname+ "/assets"]
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/runtime.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/, //Check for all js files
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            },
            {
                test: /\.(less)$/, //Check for sass or scss file names
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            plugins: [
                                new CleanCSSPlugin({advanced: true})
                            ]
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    devtool: "eval-source-map", // Default development sourcemap
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        extractLess
    ],
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
    config.devtool = "source-map";

    // Can do more here
    // JSUglify plugin
    // Offline plugin
    // Bundle styles seperatly using plugins etc,
}

module.exports = config;