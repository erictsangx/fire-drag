/**
 * Created by erictsangx on 19/12/2016.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        background_scripts: "./background_scripts/index.js",
        content_scripts: "./content_scripts/index.js",
        options: "./options/index.jsx",
    },
    output: {
        path: "addon",
        filename: "[name]/index.js"
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test : /\.jsx?/,
            loaders: ['babel'],
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve(__dirname),
        ],
        modulesDirectories: [
            'src',
            'node_modules',
        ],
    },
    plugins: [
        // Since some NodeJS modules expect to be running in Node, it is helpful
        // to set this environment var to avoid reference errors.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    devtool: 'sourcemap'
};