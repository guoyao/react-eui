var path = require('path');
var program = require('commander');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('../webpack.config');
var devServer = require('./webpackdev.server');

program.option('-d, --debug', 'Enable debug')
    .option('-p, --port <n>', 'Set port for server', parseInt)
    .parse(process.argv);

var PORT = program.port || 8080;
var API_PORT = PORT + 1;

devServer.start(API_PORT);

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: {colors: true},
    proxy: {
        '/api/*': {
            target: 'http://localhost:' + API_PORT,
            secure: false
        }
    }
});

server.listen(PORT, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Static resources server start working, Listening at localhost: ' + PORT);
});
