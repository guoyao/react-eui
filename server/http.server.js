var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

var devServer = require('./webpackdev.server');
var util = require('./util');

var PORT = parseInt(util.getValue('--port'), 10);
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

// 默认进入的静态资源页面
/*server.use('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/common/index.html'));
});*/


server.listen(PORT, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Static resources server start working, Listening at localhost: ' + PORT);
});