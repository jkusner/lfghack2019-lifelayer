// call the packages we need
let express = require('express');        // call express
let app = express();                 // define our app using express
let bodyParser = require('body-parser');

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

let port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

function rand_gen_key() {
    let dict = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZ'
    let randStr = ''
    let len = dict.length-1
    let i;
    for( i = 0; i <= 128; i++) {
        let n = Math.floor(Math.random() * len) + 0
        randStr += dict.charAt(n)
    }
    //console.log(randStr)
    return randStr
}

function change_status(key, status) {
    if (key in onGoingReqs) {
        onGoingReqs[key].status = status
    } else {
        return false;
    }
}

function delete_request(key) {
    delete onGoingReqs[key]
}

function get_answers(questions, attrs_providers) {
    let answers = {}
    for(param of questions) {
        //console.log(param)
        answers[param.attr_name] = {answer: smart_retrieve(param), provided_by: attrs_providers[param.attr_name]}
    }
    return {AnswersResponse: answers}
}

// const data = {
//     "app_name": "Sample App",
//     "api_key": "aB3EdRHAP1IWT9bjOAAuhVbslyrhCozI",
//     "required": [
//         {
//         "attr_name": "age",
//         "arguments": [],
//         "comparison": "gte",
//         "compare_to": "21"
//         },
//         {
//         "attr_name": "creditLimit",
//         "arguments": [],
//         "comparison": "gte",
//         "compare_to": "5000"
//         }
//     ],
//     "optional": [
//         {
//         "attr_name": "accountBalance",
//         "arguments": [],
//         "comparison": "gte",
//         "compare_to": "10000"
//         },
//         {
//         "attr_name": "accountStatus",
//         "arguments": [],
//         "comparison": "eq",
//         "compare_to": "1"
//         }
//     ]
// }

//console.log({...data.required, ...data.optional})

function smart_retrieve(param) {
    let credit_data = require('./acct_details')
    let user_age = 25
    let user_acct_balance = 2000
    let attr_name = param.attr_name
    let compare_to = param.compare_to
    let comp_op = param.comparison
    if(attr_name === "creditLimit") {
        return compare_limit(sum_credit(credit_data), compare_to, comp_op)
    } else if(attr_name === "accountStatus") {
        return compare_limit(get_account_status(credit_data), compare_to, comp_op)
    } else if(attr_name === "age") {
        return compare_limit(user_age, compare_to, comp_op)
    } else {
        return compare_limit(user_acct_balance, compare_to, comp_op)
    }
}

function sum_credit(credit_data) {
    return credit_data.accountGroupSummary[0].accounts.map(x => x.creditCardAccountSummary.creditLimit).reduce((a,b) => a + b)
}

function get_account_status(credit_data) {
    return credit_data.accountGroupSummary[0].accounts.some(x => x.creditCardAccountSummary.accountStatus === 'ACTIVE')
}

function compare_limit(user_limit, provided_limit, comp_op) {
    user_limit = Number(user_limit)
    provided_limit = Number(provided_limit)
    opMap = {"gt": (a, b) => a > b, "lt": (a, b) => a < b, "gte": (a, b) => a >= b, "lte": (a, b) => a <= b,  "eq": (a, b) => a === b, "ne": (a, b) => a !== b}
    //console.log(comp_op)
    return opMap[comp_op](user_limit, provided_limit)
}



//onGoingReqs hashmap
const onGoingReqs = {};

//API ENDPOINTS
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/request', function(req, res) {
    let key = rand_gen_key();
    onGoingReqs[key] = {
        'req': req.body,
        'status': 'waiting'
    }
    res.send(key);
});

router.get('/request/:key', function(req, res) {
    let key = req.params.key
    if(key in onGoingReqs) {
        res.json({'request': onGoingReqs[key].req})
    } else {
        res.json(({'status': 'ERROR: Invalid key'}))
    }
});

router.get('/status/:key', function(req, res) {
    let key = req.params.key
    if(key in onGoingReqs) {
        res.json({'status': onGoingReqs[key].status})
    } else {
        res.json(({'status': 'ERROR: Invalid key'}))
    }
});

router.post('/request/:key/reject', function(req, res) {
    let key = req.params.key
    onGoingReqs[key].status = 'reject'
    res.json({"AnswersResponse": "The request has been rejected"})
});

router.post('/request/:key/accept', function(req, res) {
    let key = req.params.key
    onGoingReqs[key].status = 'fetching'
    let required = onGoingReqs[key].req.required //req.body.required
    let optional = onGoingReqs[key].req.optional //req.body.optional
    //console.log([...required, ...optional])

    res.json(get_answers([...required, ...optional], req.body));
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/lifelayer', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);