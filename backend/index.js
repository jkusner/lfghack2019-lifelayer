
// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        return false;
    }
}

function delete_status(key) {
    delete onGoingReqs[key]
}

const onGoingReqs = {};

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/request', function(req, res) {
    var key = rand_gen_key();
    onGoingReqs[key] = {
        'req': req.body,
        'status': 'waiting'
    }
    res.send(key);
});

router.get('/request/:key', function(req, res) {
    var key = req.params.key
    if(key in onGoingReqs) {
        res.json({'request': onGoingReqs[key].req})
    } else {
        res.json(({'status': 'ERROR: Invalid key'}))
    }
});

router.get('/status/:key', function(req, res) {
    var key = req.params.key
    if(key in onGoingReqs) {
        res.json({'status': onGoingReqs[key].status})
    } else {
        res.json(({'status': 'ERROR: Invalid key'}))
    }
});

router.post('/request/:key/reject', function(req, res) {
    var key = req.params.key
    onGoingReqs[key].status = 'reject'
});

router.post('/request/:key/accept', function(req, res) {
    var key = req.params.key
    onGoingReqs[key].status = 'fetching'
    var stringList = req.body


});

function check_string_list() {
    var credit_data = require('./acct_details')
    //sum_credit(credit_data)
}

function sum_credit(credit_data) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log(credit_data.accounts.map(x => x.creditLimit).reduce(reducer))
}


//check_string_list()




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/lifelayer', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);