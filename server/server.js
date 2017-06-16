// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost:27017/attend');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Device = mongoose.model('Device', {
  beaconID:{type:String,unique: true}
  ,reg:Object
  ,subs:[String]
  ,track:String
});

// Routes


    // create device and send back all devices after creation
    app.post('/api/devices', function(req, res) {

        console.log("creating device");

        // create a device, information comes from request from Ionic
        Device.create({
            reg:{
              name : req.body.name,
              phone : req.body.phone,
              email: req.body.email
            },
            track: req.body.track,
            done : false
        }, function(err, device) {
            if (err)
                res.send(err);

            // get and return all the devices after you create another
            Device.find(function(err, devices) {
                if (err)
                    res.send(err)
                res.json(devices);
            });
        });

    });




// listen (start app with node server.js) ======================================
app.listen(8090, function() {
  console.log("App listening on port 8080");
});
