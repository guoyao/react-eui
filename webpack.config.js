var path = require('path');
var fs = require('fs');
var program = require('commander');
var webpack = require('webpack');

// file-loader 强制转换为 publicPath + hash.ext，这会影响css中的背景图片定位
// 官方没有暂未给出明确的解决方案，此处利用三方插件避免该问题，可持续跟进
// https://github.com/webpack/css-loader/issues
// any problems @chenqiang03
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('es6-promise').polyfill();

program.option('-d, --debug', 'Enable debug')
    .option('-p, --port <n>', 'Set port for server', parseInt)
    .parse(process.argv);

var PORT = program.port || 8080;
var DEBUG = !!program.debug;

var documentPath = __dirname;

module.exports = {
    entry: {
        main: DEBUG ? [
            'webpack-dev-server/client?http://localhost:' + PORT,
            'webpack/hot/only-dev-server',
            './demo/public/main'
        ] : ['./index.js']
    },
    output: {
        filename: DEBUG ? '[name].js' : 'react-eui.min.js',
        path: documentPath + '/dist',
        publicPath: '/demo'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'] // 空字符串对应不需要后缀名的情况
    },
    eslint: {
        configFile: '.eslintrc'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(documentPath, 'index.js'),
                    path.join(documentPath, 'src'),
                    path.join(documentPath, 'demo')
                ],
                exclude: /node_modules/,
                loader: ['babel'],
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!est',
                    {
                        publicPath: './'
                    }
                )
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=8192'
            }
        ]
    },
    plugins: (DEBUG ? [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css')
    ] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('react-eui.min.css'),
        new webpack.NoErrorsPlugin()
    ]),
    devtool: 'eval-cheap-module-source-map'
};
