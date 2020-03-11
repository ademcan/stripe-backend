// import all the required packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
// define port number
const port = process.env.PORT || 3001;
 
// instantiate express with the correct parameters
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
// create a Router
const router = express.Router();
 
// example of a GET method that returns a simple "Hello World"
router.get('/', (req, res) => {
  res.send( "Hello World!" );
});
 
var stripe_sk = 'sk_test_XXXXXXXXXX';


router.post('/createStripePaymentIntent', function (req, res) {
  var stripe = require("stripe")(stripe_sk);
  stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd'
  }, function (err, paymentIntent) {
    res.json({
      setupIntentId: paymentIntent.client_secret
    })
  });
})

// define the router to use
app.use('/', router);
 
// start express
app.listen(port, function() {
    console.log("Runnning on " + port);
});
 
module.exports = app;