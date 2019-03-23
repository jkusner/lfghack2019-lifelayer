
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

function rand_gen_key() {
    var dict = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZ'
    var randStr = ''
    var len = dict.length-1
    var i;
    for( i = 0; i <= 128; i++) {
        var n = Math.floor(Math.random() * len) + 0
        randStr += dict.charAt(n)
    }
    console.log(randStr)
    return randStr
}

function is_status_not_waiting(key) {
    if (key in onGoingReqs) {
        if(onGoingReqs[key].status !== 'waiting') {
            return 1;
        } else {
            return 0;
        }
    } else {
        return -1;
    }
}

function change_status(key, status) {
    if (key in onGoingReqs) {
        onGoingReqs[key].status = status
    } else {
        return -1;
    }
}

function delete_status(key) {
    delete onGoingReqs[key]
}

function check_status(key) {
    var request = require('request');
    request('http://localhost:8080/lifelayer/status/'+key, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (is_status_not_waiting == -1) {
                return 1;
            } else {
                return -1;
            }
        }
    })
}
const onGoingReqs = {};
var attrquery = {
    attr_name: "",
    comparison: "",
    compare_to: "",
    app_name: "",
}
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/request', function(req, res) {
    var key = rand_gen_key();
    var required = req.body.required
    var optional = req.body.optional
    onGoingReqs[key] = {
        'req': req.body,
        'status': 'waiting'
    }
    res.send(key);
});

router.get('/request/:key', function(req, rest) {
    var key = req.params.key
    if(key in onGoingReqs) {
        res.json({'request': ongoingReqs[key].req})
    } else {
        res.json(({'status': 'ERROR: Invalid key'}))
    }
});

router.get('/status/:key', function(req, res) {
    var key = req.params.key
    if(key in onGoingReqs) {
        res.json({'status': ongoingReqs[key].status})
    } else {
        res.json(({'status': 'ERROR: Invalid key'}))
    }
});





// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/lifelayer', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);