 'use strict';
 var db=null;
 var masterstartupdb=null;

var PropertiesReader = require('properties-reader');
var express = require('express');
var http = require('http');
var currentdate = require('moment');
var moment = require('moment-timezone');
var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;

MongoClient.connect('mongodb://localhost:27017/mittens', function(err, dbconn) {
    if (!err) {
        console.log("we are connected to mongoDB");
        db=dbconn;
        }
    });

MongoClient.connect('mongodb://localhost:27017/masterstartupdb', function(err, dbconn) {
    if (!err) {
        console.log("we are connected to mongoDB : masterstartupdb");
        masterstartupdb=dbconn;
        }
    });


console.log("Your crowdfunding application has started");

var campchart=exports.campchart=function(req,res,next){
   var Selname=req.body.Primary_Key;
   console.log("selname in campchart",req.body.Primary_Key);
     db.collection('campaigndata',function(err,meowsCollection){
       
       meowsCollection.find({"Primary_Key":req.body.Primary_Key}).toArray(function(err,campchart){
          
          
           return res.json(campchart);
           

       });   

       });

}

var fundchart=exports.fundchart=function(req,res,next){
    var Selname=req.body.Name;
    console.log("selname in fundchart",req.body.Name);
      db.collection('fundchart',function(err,meowsCollection){
        
        meowsCollection.find({"Name":req.body.Name}).toArray(function(err,fundchart){
            return res.json(fundchart);
            console.log("fundchart api call returns : ",res.json(fundchart));

        });   

        });

}

var masterData=exports.masterData=function(req,res,next)
    {
        
        var SelName=req.body.Name;
        var Fund_Data_Availability=req.body.Fund_Data_Availability;
        var SelCountry=req.body.Country;
        var SelIndustryTag=req.body.IndustryTag;
        var SelChannel=req.body.Channel;
        console.log(SelCountry);
        console.log("Billingservice:",SelIndustryTag);
        console.log("Inside billing service");
        // console.log(db.meows.find({}));
        var startTime = new Date().getTime();
        console.log('starttime')
        console.log(startTime)
        masterstartupdb.collection('meows',function(err,meowsCollection){
            console.log("inside db call -- 1");
            var query ={};

            if ((SelName != undefined)&&(SelName!='')){
                query['Name'] = SelName;
            }

            if ((SelCountry != undefined)&&(SelCountry!='')){
                query['Country'] = SelCountry;
                console.log('It has country')
            }
            
            if ((SelIndustryTag != undefined)&&(SelIndustryTag!='')){
                query['IndustryTag'] = SelIndustryTag;
            }


            if ((SelChannel != undefined)&&(SelChannel!='')){
                query['Channel'] = SelChannel;
            }

            if ((Fund_Data_Availability != undefined)&&(Fund_Data_Availability!='')){
           query['Fund_Data_Availability'] = Fund_Data_Availability;
       }

          
            console.log("master tabel query",query);
            meowsCollection.find(query).toArray(function(err,meows){
                return res.json(meows);
            });   

            
            });
          var endTime = new Date().getTime();
          console.log("duration [ms] = " + (endTime-startTime));

    }

var top=exports.top=function(req,res,next){

    var SelIndustryTag=req.body.topIndustryTag;

  var searchquery="";   
    var subarray="";
    var text1="";
    var text2="";
    
    var q1="[";
    var q2="]"
    var q3=""
    var q4;
    var q5=""
    var q6=""
    var q7=""
    var q8=""
    var q9=""
    var q10=""
    var q11=""
    var q12=""
    var q13=""
    var q14=""
    var q15=""
    var q16=""
    var q17=""

    
    console.log("SelIndustryTag:",SelIndustryTag);  

    db.collection('meows',function(err,meowsCollection){
       
        var query ={};
        var subquery ={};        

               
        if ((SelIndustryTag != undefined)&&(SelIndustryTag!='')){
            q3="{\"Category1\":\""
            q6="{\"Category2\":\""
            q7="{\"Category3\":\""
            q8="{\"Category4\":\""
            q9="{\"Category5\":\""
            q10="{\"Category6\":\""
            q11="{\"Category7\":\""
            q12="{\"Category8\":\""
            q13="{\"Category9\":\""
            q14="{\"Category10\":\""
            q15="{\"Category11\":\""
            q16="{\"Category12\":\""            
            q4=SelIndustryTag;
            q5="\"}"
            q17=","
        
             subarray=q1
            +q3+q4+q5+q17
            +q6+q4+q5+q17
            +q7+q4+q5+q17
            +q8+q4+q5+q17
            +q9+q4+q5+q17
            +q10+q4+q5+q17
            +q11+q4+q5+q17
            +q12+q4+q5+q17
            +q13+q4+q5+q17
            +q14+q4+q5+q17
            +q15+q4+q5+q17
            +q16+q4+q5
            +q2;
      
           
            var jsonObj = JSON.parse(subarray);
             console.log("type of query",typeof(jsonObj));
            query["$or"]=jsonObj;
                    
           
        }

        console.log("actual query is",query);     
    
            meowsCollection.find(query).limit(20).toArray(function(err,toptable){
            return res.json(toptable);
        });   

        
        });
    
}

var toptablecampaignfull=exports.toptablecampaignfull=function(req,res,next){
    var SelMarketTag=req.body.topMarketTag;
// console.log("inside top  fn in billing service");
      db.collection('campaigndata',function(err,meowsCollection){
        if(SelMarketTag!=undefined) 
        {
             meowsCollection.find({$and:[{'Fund_Raised':{$ne:" "}},{'Fund_Raised':{$ne:""}},{'MarketTag':SelMarketTag}]}).sort({'Fund_Raised':-1}).toArray(function(err,top10campaign){
            return res.json(top10campaign);
        });

        }else{
                    meowsCollection.find({$and:[{'Fund_Raised':{$ne:" "}},{'Fund_Raised':{$ne:""}}]}).sort({'Fund_Raised':-1}).toArray(function(err,top10campaign){
            return res.json(top10campaign);
        });

        }
          
    });
       

}

var top1=exports.top1=function(req,res,next){
    var SelMarketTag=req.body.topMarketTag;
// console.log("inside top  fn in billing service");
      db.collection('campaigndata',function(err,meowsCollection){
        if(SelMarketTag!=undefined) 
        {
             meowsCollection.find({$and:[{'Fund_Raised':{$ne:" "}},{'Fund_Raised':{$ne:""}},{'MarketTag':SelMarketTag}]}).sort({'Fund_Raised':-1}).limit(20).toArray(function(err,top10campaign){
            return res.json(top10campaign);
        });

        }else{
                    meowsCollection.find({$and:[{'Fund_Raised':{$ne:" "}},{'Fund_Raised':{$ne:""}}]}).sort({'Fund_Raised':-1}).limit(20).toArray(function(err,top10campaign){
            return res.json(top10campaign);
        });

        }
          
    });
       

}

var uniquecategorystartup=exports.uniquecategorystartup=function (req, res, next) {
            db.collection('uniquecategorystartup',function(err,meowsCollection){
        
        meowsCollection.find().toArray(function(err,uniquecategorystartup){
            return res.json(uniquecategorystartup);
        });   

        });


}

var uniquetopcategorystartup=exports.uniquetopcategorystartup=function (req, res, next) {
            db.collection('uniquecategorystartup',function(err,meowsCollection){
        
        meowsCollection.find().toArray(function(err,uniquetopcategorystartup){
            return res.json(uniquetopcategorystartup);
        });   

        });


}


var somethi =exports.somethi=function (req, res, next) {
    var textWord=req.body.textWord;
    var Fund_Data_Availability=req.body.Fund_Data_Availability;
    var currentpageno=req.body.currentpageno;
	var SelName=req.body.Name;
    var SelCountry=req.body.Country;
	var SelIndustryTag=req.body.IndustryTag;
    var SelChannel=req.body.Channel;
    var searchquery="";   
    var subarray="";
    var text1="";
    var text2="";
    
    var q1="[";
    var q2="]"
    var q3=""
    var q4;
    var q5=""
    var q6=""
    var q7=""
    var q8=""
    var q9=""
    var q10=""
    var q11=""
    var q12=""
    var q13=""
    var q14=""
    var q15=""
    var q16=""
    var q17=""

	console.log(SelCountry);
	console.log("Billingservice:",SelIndustryTag);
	console.log("Inside billing service");
	// console.log(db.meows.find({}));
	db.collection('meows',function(err,meowsCollection){
		console.log("inside db call -- 1");
		var query ={};
        var subquery ={};
        

        if ((SelName != undefined)&&(SelName!='')){
            query['Name'] = SelName;
        }

		if ((SelCountry != undefined)&&(SelCountry!='')){
			query['Country'] = SelCountry;
			console.log('It has country')
		}
		
		if ((SelIndustryTag != undefined)&&(SelIndustryTag!='')){
            q3="{\"Category1\":\""
            q6="{\"Category2\":\""
            q7="{\"Category3\":\""
            q8="{\"Category4\":\""
            q9="{\"Category5\":\""
            q10="{\"Category6\":\""
            q11="{\"Category7\":\""
            q12="{\"Category8\":\""
            q13="{\"Category9\":\""
            q14="{\"Category10\":\""
            q15="{\"Category11\":\""
            q16="{\"Category12\":\""            
            q4=SelIndustryTag;
            q5="\"}"
            q17=","
        
			 subarray=q1
            +q3+q4+q5+q17
            +q6+q4+q5+q17
            +q7+q4+q5+q17
            +q8+q4+q5+q17
            +q9+q4+q5+q17
            +q10+q4+q5+q17
            +q11+q4+q5+q17
            +q12+q4+q5+q17
            +q13+q4+q5+q17
            +q14+q4+q5+q17
            +q15+q4+q5+q17
            +q16+q4+q5
            +q2;
      
           
            var jsonObj = JSON.parse(subarray);
             console.log("type of query",typeof(jsonObj));
            query["$or"]=jsonObj;
                    
           
		}


        if ((SelChannel != undefined)&&(SelChannel!='')){
            query['Channel'] = SelChannel;
        }

          if ((textWord != undefined)&&(textWord!='')){
                // query['$text']='{$search: textWord}'
                // query['score']='{$meta: "textScore"}'
                searchquery={$text: {$search: textWord}}, {score: {$meta: "textScore"}};
            }

            if ((Fund_Data_Availability != undefined)&&(Fund_Data_Availability!='')){
           query['Fund_Data_Availability'] = Fund_Data_Availability;
       }
       

   // console.log("type of",typeof(query));
		console.log("actual query is",query);
        if((textWord != undefined)&&(textWord!='')){
             meowsCollection.find(searchquery,query).skip((currentpageno-1)*10).limit(100).toArray(function(err,meows){
                return res.json(meows);
            }); 
        }
        else{
            meowsCollection.find(query).skip((currentpageno-1)*10).limit(100).toArray(function(err,meows){
            return res.json(meows);
        });   


        }

		
        
        });
	

}


var campaignfilter =exports.campaignfilter=function (req, res, next) {
    var searchquery="";
    var textWord=req.body.textWord;
    var SelFund_Data_Availability=req.body.Fund_Data_Availability;
    var currentpageno=req.body.currentpageno;
    var SelCampaign_Name=req.body.Campaign_Name;
    var SelCountry=req.body.Country;
    var SelMarketTag=req.body.MarketTag;
    var SelChannel=req.body.Channel;
    console.log(SelCountry);
    console.log("Billingservice:",SelMarketTag);
    console.log("Inside billing service");
    // console.log(db.meows.find({}));
    db.collection('campaigndata',function(err,meowsCollection){
        console.log("inside db call -- 1");
        var query ={};

        if ((SelCampaign_Name != undefined)&&(SelCampaign_Name!='')){
            query['Campaign_Name'] = SelCampaign_Name;
        }

        if ((SelCountry != undefined)&&(SelCountry!='')){
            query['Country'] = SelCountry;
            console.log('It has country')
        }
        
        if ((SelMarketTag != undefined)&&(SelMarketTag!='')){
            query['MarketTag'] = SelMarketTag;
        }


        if ((SelChannel != undefined)&&(SelChannel!='')){
            query['Channel'] = SelChannel;
        }
    
         if ((textWord != undefined)&&(textWord!='')){
                // query['$text']='{$search: textWord}'
                // query['score']='{$meta: "textScore"}'
                searchquery={$text: {$search: textWord}}, {score: {$meta: "textScore"}};
            }

        if ((SelFund_Data_Availability != undefined)&&(SelFund_Data_Availability!='')){
           query['Fund_Data_Availability'] = SelFund_Data_Availability;
       }
        console.log(query);

        if((textWord != undefined)&&(textWord!='')){
        meowsCollection.find(searchquery,query).skip((currentpageno-1)*10).limit(100).toArray(function(err,campaigndata){
            return res.json(campaigndata);
        });   
    }else{
         meowsCollection.find(query).skip((currentpageno-1)*10).limit(100).toArray(function(err,campaigndata){
            return res.json(campaigndata);
        }); 


    }

       
        
        });   

}

var campaignmasterData=exports.campaignmasterData=function(req,res,next)
    {

        var SelCampaign_Name=req.body.Campaign_Name;
        var SelCountry=req.body.Country;
        var Fund_Data_Availability=req.body.Fund_Data_Availability;
        var SelMarketTag=req.body.MarketTag;
        var SelChannel=req.body.Channel;
        var selID=req.body.Primary_Key;
        // console.log(SelCountry);
        // console.log("Billingservice:",SelIndustryTag);
        console.log("Inside campaignmasterData");
        // console.log(db.meows.find({}));
        db.collection('campaigndata',function(err,meowsCollection){
            console.log("inside db call -- 1");
            var query ={};

        if ((SelCampaign_Name != undefined)&&(SelCampaign_Name!='')){
            query['Campaign_Name'] = SelCampaign_Name;
        }

        if ((SelCountry != undefined)&&(SelCountry!='')){
            query['Country'] = SelCountry;
            console.log('It has country')
        }
        
        if ((SelMarketTag != undefined)&&(SelMarketTag!='')){
            query['MarketTag'] = SelMarketTag;
        }


        if ((SelChannel != undefined)&&(SelChannel!='')){
            query['Channel'] = SelChannel;
        }
        if ((Fund_Data_Availability != undefined)&&(Fund_Data_Availability!='')){
           query['Fund_Data_Availability'] = Fund_Data_Availability;
       }
        if ((selID != undefined)&&(selID!='')){
           query['Primary_Key'] = selID;
       }
       
            console.log(query);
            meowsCollection.find(query).toArray(function(err,campaigndata){
                return res.json(campaigndata);
            });   

            
            });

    }


// var countrychart=exports.countrychart=function(req,res,next)
//    {
//         db.collection('countrychart',function(err,countryCollection){
//         console.log("inside countrychart db call");
//         countryCollection.find().toArray(function(err,countrychart){
//             return res.json(countrychart);
//             console.log('countrychart object is here:',countrychart);
//         });   

        
//         });
// }

var countrychart1=exports.countrychart1=function(req,res,next)
{
        var SeltopMarketTag=req.body.topMarketTag;
       
        if(SeltopMarketTag==undefined){
            SeltopMarketTag="All Category";
        }
         console.log("SeltopMarketTag:",SeltopMarketTag);
        db.collection('countrychart1',function(err,countryCollection){       
        countryCollection.find({'Industry':SeltopMarketTag}).toArray(function(err,countrychart1){
            return res.json(countrychart1);
           
        });   

         // console.log('countrychart1 object is here:',res.json(countrychart1));
        });
}


// var logger = require('log-driver')({
// 	level: "info"
// });


// logger.info("Billing Sheets Node Server");
// logger.info("Your application has started");


// //Adding required npm package for server
// var mysql = require('mysql');

// // //MySQL Configuration
// // var dbconn = mysql.createConnection({
// // 	host: 'localhost',
// // 	user: 'root',
// // 	password: 'welcome',
// // 	database: 'billingsheet'
// // });

// //Establishing a connection
// // dbconn.connect(function (err) {
// // 	if (err) {
// // 		logger.info('Billing table  connection error');
// // 	} else {
// // 		logger.info('Billing table connection successful');
// // 	}
// // });


// var insert = exports.insert = function (req, res, next) {
//      var billingDetails = req.body;
//      logger.info("Emp id : ", billingDetails.empid);
//      logger.info("Employee name : ", billingDetails.empname);
//      logger.info("SAP id : ", billingDetails.sapid);
//      logger.info("Project id : ", billingDetails.projid);
//      logger.info("Billing Status : ", billingDetails.billingstatus);
//      logger.info("Start date : ", billingDetails.startdate);
//      logger.info("End date : ", billingDetails.enddate);
//      logger.info("Updated by : ", billingDetails.updatedby);
//      billingDetails["updatedtime"] = billingDetails["updatedtime"].toString().substring(0, 10);
//      logger.info("Updated on : ", billingDetails.updatedtime);
//      //the rule implemented is that the user cannot create billing if project id is inactive.
//      dbconn.query('select status from project where projid = ' + dbconn.escape(billingDetails.projid), function (err, result) {
//          var result_status ={};
//          if (err) {
//              console.log("Error", err);
//              result_status.success=0;
//              result_status.remark = "Error in retrieving project status";
//              result_status.error=err;
//              res.json(result_status);
//          }
//          else {
//              if (result.length == 0) {
//                   result_status.success=0;
//                   result_status.remark="Non-existent project";
//                  console.log("There is no such project with id");
//                  res.json(result_status);
//              }
//              else if (result[0].status == "Inactive") {
//                   result_status.success=0;
//                   result_status.remark="Inactive project";
//                   console.log("Trying to add billing for inactive project");
//                   res.json(result_status);
//              }
//              else {
//                  //if a new billing is being added, then the previous billing of that employee must be updated so that the enddate is the current date -1
//                  console.log("BILLING DETAILS EMPID",billingDetails.empid);
//                  dbconn.query('select * from billing where empid = ' + dbconn.escape(billingDetails.empid)+'order by enddate', function (err, result) {
//                      if(err)
//                          {
//                               result_status.success=0;
//                               result_status.remark="Previous billing search error";
//                               result_status.error = err;
//                              console.log("Previous search err");
//                              res.json(result_status);
//                          }
                     
//                      else
//                          {
//                              var latest_billing_details = {};
//                              var dt = new Date();
//                              console.log("PREV search", result);
//                              console.log(result.length);
//                              latest_billing_details = result[result.length - 1];
//                                latest_billing_details.enddate = dt.getFullYear()+ "-"  + ("0" + (dt.getMonth() + 1).toString()).slice(-2) + "-" + ("0" + (dt.getDate()-1)).slice(-2)  ;
//                              latest_billing_details.startdate = 
//                              console.log("Thses details shall get updated:",latest_billing_details);
//                              dbconn.query('UPDATE billing SET ? where billingid = '+ dbconn.escape(latest_billing_details.billingid), latest_billing_details, function (err, result) {
//                      if (err) {
//                          console.log("Error", err);
//                           result_status.success=0;
//                           result_status.remark="Could not update previous billing details";
//                           result_status.error=err;
//                           res.json(result_status);
//                      }
//                      else {
//                          console.log("I have updated the previous billing details")
//                      }
//                  });
                             
//                          }
//                  });
                 
//                  dbconn.query('INSERT INTO billing SET ?', billingDetails, function (err, result) {
//                      if (err) {
//                          console.log("Error", err);
//                          result_status.success=0;
//                          result_status.remark="Error in inserting new billing record";
//                          result_status.error=err;
//                          res.json(result_status);
//                      }
//                      else {
//                           result_status.success=1;
//                           //result_status.error="Inactive project";
//                          res.json(result_status);
//                      }
//                  });
//              }
//          }
//      });
//  }


// var listAll = exports.listAll = function (req, res, next) {
// 	dbconn.query('SELECT * FROM billing', function (err, records) {
// 		if (err) {
// 			logger.info("Error", err);
// 			res.json("Error");	
// 		}
// 		res.json(records);
// 	});
// }

// var search = exports.search = function (req, res, next) {
// 	var billingDetails = req.body;
// 	console.log(billingDetails);
// 	dbconn.query('SELECT * FROM billing WHERE empname = ' +  dbconn.escape(billingDetails.empname), function (err, records) {
// 		if (err) {
// 			logger.info("Error", err);
// 			res.json("Error");	
// 		}
// 		res.json(records);
// 	});
// }

// var deleteBilling = exports.deleteBilling = function (req, res, next) {
// 	var billingDetails = req.body;
// 	console.log(billingDetails);
// 	dbconn.query('DELETE FROM billing WHERE empname = ' +  dbconn.escape(billingDetails.empname), function (err, records) {
// 		if (err) {
// 			logger.info("Error", err);
// 			res.json("Error");	
// 		}
// 		logger.info(records);
// 		res.json(records);
// 	});
// }

// var getBillingRecords = exports.getBillingRecords = function (req, res, next) {
// 	// var cluster = req.body.cluster;
//     console.log("In getBillingRecords api",req.body);
// 	dbconn.query("SELECT billing.* from employee join billing on employee.empid = billing.empid " , function (err, records) {
// 		if (err) {
// 			console.log("Error", err);
// 			res.json("Error");
// 		} else 	 {
// 			res.json(records);
// 		} 
// 	});
// }

// var clusterBillingRecords = exports.clusterBillingRecords = function (req, res, next) {
//     var cluster = req.body.cluster;
//     console.log("In getBillingRecords api",cluster,req.body);
//     dbconn.query("SELECT billing.* from employee join billing on employee.empid = billing.empid where employee.cluster = " + dbconn.escape(cluster), function (err, records) {
//         if (err) {
//             console.log("Error", err);
//             res.json("Error");
//         } else   {
//             res.json(records);
//         } 
//     });
// }