
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

function is_key_valid() {
    while(status) {
        
    }
}

const ongoingReqs;
var attrquery = {
    attr_name: "",
    comparison: "",
    compare_to: "",
    app_name: "",
}
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/request', function(req, res) {
    var key = rand_gen_key();
    
    ongoingReqs[key] = {
        'status': 'waiting'
    }
    res.json({ 'key': key, 'status': ongoingReqs[key], 'required': [attrquery, attrquery], 'optional': [attrquery]});
});

router.get('/status/:key', function(req, res) {
    var key = req.param.key;
    res.json('status': ongoingReqs[key])
});

router.get('/status/:key', function(req, res) {
    var key = req.param.key;
    res.json({'status': ongoingReqs[key].});
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/lifelayer', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);