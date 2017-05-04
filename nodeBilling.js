//Adding required npm package for server
var PropertiesReader = require('properties-reader');
var express = require('express');
var http = require('http');
var currentdate = require('moment');
var moment = require('moment-timezone');
var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;

var db=null;
MongoClient.connect('mongodb://localhost:27017/mittens', function(err, dbconn) {
    if (!err) {
        console.log("we are connected to mongoDB");
        db=dbconn;
        }
    });

var flag=true;
var bodyParser = require('body-parser');
var FileStreamRotator = require('file-stream-rotator')
var morgan = require('morgan')

var syncrequest = require('sync-request');
var request = require('request');
var async = require('async');

//Get Properties from Resources file
var properties = PropertiesReader(__dirname + '/resources/server.properties');
var start;

// ensure log directory exists 
var fs = require('fs');
var logDirectory = __dirname + '/billings-logs'
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream 
var accessLogStream = FileStreamRotator.getStream({
	date_format: 'YYYY-MM-DD',
	filename: logDirectory + '/billings-%DATE%.log',
	frequency: 'daily',
	verbose: false
})

// setup the logger
var app = express();
// app.use(morgan('combined', {
// 	stream: accessLogStream
// }))

/* Route all static files to root directory */
app.use(express.static(__dirname + '/billing-ui/'));

// app.get('/meows',function(req,res,next){
// 		console.log("inside get of server");
// 		db.collection('meows',function(err,meowsCollection){

// 		meowsCollection.find().toArray(function(err,meows){
// 			return res.json(meows);


		 


// 		});

// 	});

	
	
// });

app.get('/countrychart',function(req,res,next){
		db.collection('countrychart',function(err,countryCollection){
        console.log("inside countrychart db call");
        countryCollection.find().toArray(function(err,countrychart){
            return res.json(countrychart);
            console.log('countrychart object is here:',countrychart);
        });   

        
        });
});

// app.post('/countrychart1',function(req,res,next){
//         var SeltopMarketTag=req.body.topMarketTag;
//         console.log("SeltopMarketTag:",SeltopMarketTag);
//         db.collection('countrychart1',function(err,countryCollection){
//         console.log("inside countrychart1 db call");
//         countryCollection.find({'Industry':SeltopMarketTag}).toArray(function(err,countrychart1){
//             return res.json(countrychart1);
//             console.log('countrychart1 object is here:',countrychart1);
//         });   

        
//         });
// });


app.get('/categorychart',function(req,res,next){
		db.collection('categorychart',function(err,countryCollection){
        console.log("inside categorychart db call");
        countryCollection.find().sort({Count:-1}).limit(10).toArray(function(err,categorychart){
            return res.json(categorychart);
            console.log('categorychart object is here:',categorychart);
        });   

        
        });
});


app.get('/categorychart1',function(req,res,next){
        db.collection('categorychart1',function(err,countryCollection){
        console.log("inside categorychart1 db call");
        countryCollection.find().sort({Count:-1}).limit(10).toArray(function(err,categorychart1){
            return res.json(categorychart1);
            console.log('categorychart object is here:',categorychart1);
        });   

        
        });
});

// parse application/json and url-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Match the incoming request to a route:
app.use(require('meta-router/middleware').match('routes.json'));

// Finally, invoke the route handler (if applicable)
app.use(require('meta-router/middleware').invokeHandler());

// Server listening in port 3050
PORT = properties.getRaw('server.port');
app.listen(PORT);