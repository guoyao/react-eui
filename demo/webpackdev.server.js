var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

// create application/json parser
app.use(bodyParser.json());
app.use(multer(
    {dest: path.join(__dirname, './upload')}
).single('name'));

module.exports = {
    start: function(port) {
        app.listen(port, 'localhost', function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log('API server start working, Listening at localhost: ' + port);
        });
    }
};
