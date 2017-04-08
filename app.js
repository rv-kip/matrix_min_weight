var express                 = require('express'),
    logger                  = require('./lib/logger'),
    getPath                 = require('./lib/get_path'),
    config                  = require('./config/config.js').config,
    package_json            = require('./package.json'),
    bodyParser              = require('body-parser');

var app = express();
app.use(bodyParser.json({ extended: true }));

app.set('config', config);
app.set('package_json', package_json);
app.set('port', config.server.port || 8081);
app.set('hostname', config.server.hostname || '0.0.0.0');

// Routes
app.all('*', function (req, res, next){ // Log all requests
    var app = req.app;
    var logline = ['method=' + req.method, 'path=' + req.path, 'ip=' + req.ip];
    logger.info(logline.join(' '));
    next();
});
app.get("/ping", handle_ping);
app.post("/", handle_matrix);

// Handlers
function handle_ping(req, res){
    var app = req.app;

    var ping_data = {
        "status"        : "OK",
        "name"          : app.get('package_json').name,
        "version"       : app.get('package_json').version,
        "pid"           : "_" + process.pid
    };
    res.status(200).send(ping_data);
}

function handle_matrix(req, res){
    var data = req.body;
    var path_weight_map = {};

    // Process the matrix
    for (var i = 0; i < data[0].length; i++) {
        getPath(data, 0, i, [], path_weight_map);
    }

    var path_weight_map_keys = Object.keys(path_weight_map).map(function (x) {
        return parseInt(x, 10);
    });

    var min_weight = path_weight_map_keys.reduce(function(a, b, i, arr) {return Math.min(a,b);});

    response_data = {
        weight: min_weight,
        path: path_weight_map[min_weight],
    };

    res.status(200).send(response_data);
}

// Start server
var server = app.listen(app.get('port'), app.get('hostname'), function() {
    logger.info('Server listening on http://' + app.get('hostname') + ':' + app.get('port'));
});