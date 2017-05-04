billingApp.controller('campaigncontroller',function ($scope, $http,srvShareData, $route, $location,$window) {
		document.getElementById("topmenu").style.visibility = "visible";
		top();
		countrychart1();
		getMeows();
		$scope.chartna="";
		$scope.textWord="";
		$scope.currentpageno=1;

		// function top(){
		// 		$http.post("/api/billing/top1",{}).then(function(result){
		// 			$scope.top=result.data;
		// 			console.log("top fn result:",result.data);

		// 		});
		// 	};

		$scope.firstpage=function(){
			$scope.currentpageno=1;
			getMeows();

		}

		$scope.prevpage=function(){
			$scope.currentpageno=$scope.currentpageno-1;
			getMeows();

		}

		$scope.goto=function()
		{
			console.log("current page number is:",$scope.currentpageno);
			getMeows();
		}

		$scope.nextpage=function(){
			$scope.currentpageno=$scope.currentpageno+1;
			getMeows();

		}

		

		$scope.lastpage=function(){
			$scope.currentpageno=Math.ceil($scope.fullmeows.length/100);
			getMeows();

		}

		

		$scope.somett=function(){
			$scope.currentpageno=1;
			getMeows();

		};

		$scope.textSearch=function(){
			console.log($scope.textWord);
			getMeows();
			$scope.textWord="";

		}


		 $scope.getdata=function(){

// console.log($scope.fullmeows);	


// $(document).ready(function(){
//    $('gen_btn').click(function(){
       var data = $scope.fullmeows;
       if(data == '')
           return;
       
       JSONToCSVConvertor(data, "Campaign data", true);
      
//     });
// });

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
   //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
   var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
   
   var CSV = '';    
   //Set Report title in first row or line
   
   CSV += ReportTitle + '\r\n\n';

   //This condition will generate the Label/Header
   if (ShowLabel) {
       var row = "";
       
       //This loop will extract the label from 1st index of on array
       for (var index in arrData[0]) {
           
           //Now convert each value to string and comma-seprated
           row += index + '\t';
       }

       row = row.slice(0, -1);
       
       //append Label row with line break
       CSV += row + '\r\n';
   }
   
   //1st loop is to extract each row
   for (var i = 0; i < arrData.length; i++) {
       var row = "";
       
       //2nd loop will extract each column and convert it in string comma-seprated
       for (var index in arrData[i]) {
           row += '' + arrData[i][index] + '\t';
       }

       row.slice(0, row.length - 1);
       
       //add a line break after each row
       CSV += row + '\r\n';
   }

   if (CSV == '') {        
       alert("Invalid data");
       return;
   }   
   
   //Generate a file name
   var fileName = "";
   //this will remove the blank-spaces from the title and replace it with an underscore
   fileName += ReportTitle.replace(/ /g,"_");   
   
   //Initialize file format you want csv or xls
   var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
   
   // Now the little tricky part.
   // you can use either>> window.open(uri);
   // but this will not work in some browsers
   // or you will not get the correct file extension    
   
   //this trick will generate a temp <a /> tag
   var link = document.createElement("a");    
   link.href = uri;
   
   //set the visibility hidden so it will not effect on your web-layout
   link.style = "visibility:hidden";
   link.download = fileName + ".xls";
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}}
   



         $scope.reset=function()
         {	
         	console.log("inside reset")
         	$scope.resetval=1;
         	$scope.Campaign_Name="";
         	$scope.Country="";
         	$scope.MarketTag="";
         	$scope.currentpageno=1;
         	$scope.Channel="";
         	$scope.Fund_Data_Availability="";
         	$scope.textWord="";
         	getMeows();
         }  

 

		function top(){
		
				var newresult=[];
				$http.post("/api/billing/toptablecampaign",{"topMarketTag":$scope.topMarketTag}).success(function(result){
					console.log("topselmarkettag :",$scope.topMarketTag);
					$("body").css("cursor", "progress");				
					
					$scope.toptable=result;

					console.log("toptable:",$scope.toptable);
						
					$("body").css("cursor", "default");					
				});

				$http.post("/api/billing/toptablecampaignfull",{"topMarketTag":$scope.topMarketTag}).success(function(result){
					console.log("topselmarkettag :",$scope.topMarketTag);
					$("body").css("cursor", "progress");				
					
					$scope.toptablefull=result;

					console.log("toptable:",$scope.toptable);
						
					$("body").css("cursor", "default");					
				});


       }
           
       $scope.filterfortop=function(){
       	console.log("categories",$scope.topMarketTag);
       		top();
       		countrychart1();
       		
       }

         $scope.resetfortop=function(){
         	$scope.topMarketTag=undefined;
         	top();
       		countrychart1();

         }
  //       

        function getMeows(reset)

            {	

            	$("body").css("cursor", "progress");
        		$scope.resetval=0;
				console.log("inside somett");
				console.log("$scope.Fund_Data_Availability",$scope.Fund_Data_Availability);
				// console.log("selected",$scope.Country);
				// console.log("selected",$scope.IndustryTag);
				// var Country=$scope.Country;
				// var IndustryTag=$scope.IndustryTag;
				$http.post("/api/billing/campaignfilter",{"Fund_Data_Availability":$scope.Fund_Data_Availability,"textWord":$scope.textWord,"currentpageno":$scope.currentpageno,"Campaign_Name":$scope.Campaign_Name,"Country":$scope.Country, "MarketTag":$scope.MarketTag,"Channel":$scope.Channel}).success(function(result){
					//console.log("this is the filtered data : ",result);
					console.log("inside somett");
					$scope.filterData=result;
					if(result==undefined||result==""){
						$scope.chartna="No matching records"
					}	
					
				});
            	// $scope.somett();
            	$http.post('/api/billing/campaignmasterData',{"Fund_Data_Availability":$scope.Fund_Data_Availability,"Campaign_Name":$scope.Campaign_Name,"Country":$scope.Country, "MarketTag":$scope.MarketTag,"Channel":$scope.Channel}).then(function(response){
            		// console.log('masterData',response.data);
            		
            		$scope.fullmeows=response.data;
            		console.log($scope.fullmeows.length);
            		$scope.lastpageno=Math.ceil($scope.fullmeows.length/100);
            		
            		// if($scope.filterData==undefined||$scope.resetval==1)
              //   	{
              //   		$scope.meows=response.data;
              //   		$scope.resetval=0;
              //   	}
              //   	else{
              //   		$scope.meows = $scope.filterData;
              //   	}
            	});

           	   //  
                	
            $("body").css("cursor", "default");
           	    
               } 
               // console.log("this is new filtered data : ",filterData);

               
           function countrychart1() {
           		
           	 	$http.post('/api/billing/countrychart1',{"topMarketTag":$scope.topMarketTag}).then(function(response){	

	           	     	$scope.countrycharts=response.data;
	           	     	// var data = $.parseJSON(response);
	           	     	// $scope.Country=$scope.countrychart.Country;
	           	     	// console.log("inside countrychart");
	           	     	console.log("countrycharts length:",response.data);
	         
						google.charts.load('current', {'packages':['treemap']});
					    var drawRegionsMap=function() {

					    	 	var json_data1 = $scope.countrycharts;


								var result = [];
								var line;
								var array =[];
								
									
								result.push(['Location', 'Parent','number_of_startups','total_funding']);
								result.push(['Global',,0,0]);

									// console.log(typeof(json_data1[1].IndustryTag));
									// console.log(typeof($scope.Category1));


											// console.log((json_data1[1].IndustryTag)==($scope.Category1));

										if ($scope.topMarketTag== undefined) {

												$scope.topMarketTag="All Category";
											}

										for (var i = json_data1.length - 1; i >= 0; i--) {


											if((json_data1[i].Industry)==($scope.topMarketTag)){

												result.push([
												json_data1[i].State,
												json_data1[i].Country,										
												parseInt(json_data1[i].Count),
												parseInt(json_data1[i].Tot_Funding)
												])
											}		
											 // if($scope.Category1==undefined){
											 // 	$scope.chartnodata="Please select a category in the above filter";
											 // }

										}

								//console.log("country chart result:",response.data)
								// console.log(result);
								// console.log(typeof(result));
								// console.log("result is here:",result);

						        
						        var data1 = google.visualization.arrayToDataTable(result);
						        var options1 = {

						        						is3D:true,
													   minColor: '#e7711c',
													   midColor: '#fff',
													   maxColor: '#4374e0',
													   showScale: true,
													   generateTooltip: showFullTooltip

													 };

						                    

						        var worldchart = new google.visualization.TreeMap(document.getElementById('worldchart'));

						        worldchart.draw(data1, options1);
						        function showFullTooltip(row, size, value) {
										   return '<div style="background:#fd9; padding:10px; border-style:solid">' +
										          '<span style="font-family:Times New Roman"><b>' + data1.getValue(row, 0) +
										          '</b>, ' + data1.getValue(row, 1) + ', #startups ' + data1.getValue(row, 2) +
										          ', Funding: $' + data1.getValue(row, 3) + '</span><br>' 
										 }
						      }


				 		// google.charts.load('current', {'packages':['corechart']});
				      // google.charts.setOnLoadCallback(drawChart);

				    
					       google.charts.load('current', {'packages': ['corechart'], 'callback': drawCharts1});
							function drawCharts1() {
							  drawRegionsMap();
							  
							}



				 	});


           	 	$http.get('/categorychart1').then(function(response){	

	           	     	$scope.categorychart=response.data;
	           	     	// var data = $.parseJSON(response);
	           	     	// $scope.Country=$scope.countrychart.Country;
	           	     	// console.log("inside categorychart");
	           	     	// console.log($scope.countrycharts);
	           	     
				 		google.charts.load('current', {'packages':['corechart']});
				      // google.charts.setOnLoadCallback(drawChart);

				      var drawChart=function () {

				        // var data2 = google.visualization.arrayToDataTable([
				        //   ['Task', 'Hours per Day'],
				        //   ['Work',     11],
				        //   ['Eat',      2],
				        //   ['Commute',  2],
				        //   ['Watch TV', 2],
				        //   ['Sleep',    7]
				        // ]);
				        var json_data1 = $scope.categorychart;

					    	 	console.log(json_data1[1].IndustryTag);

								var result = [];
								var line;
								var array =[];
								
								result.push(['Country', 'Count']);

								for (var i = json_data1.length - 1; i >= 0; i--) {
											

											result.push([
												json_data1[i].IndustryTag,
												parseInt(json_data1[i].Count)
											])
							
								}

								
								// console.log(result);
								// console.log(typeof(result));
								// console.log("result is here:",result);
				          var data2 = google.visualization.arrayToDataTable(result);

				        var options = {
				        };

				        var chart2 = new google.visualization.PieChart(document.getElementById('piechart'));

				        chart2.draw(data2, options);
				      }

					       google.charts.load('current', {'packages': ['corechart'], 'callback': drawCharts2});
							function drawCharts2() {
							  drawChart();
							}


			 	});
           }
            countrychart1();

            getMeows();

	
	console.log("in Home controller");

	$scope.goPath = function (path) {
		$location.path(path);
	};

	$scope.detectIE = function () {
		var ua = window.navigator.userAgent,
			msie = ua.indexOf("MSIE ");

		if (msie > 0) {
			$scope.ieBrowser = true;
		} else {

			$scope.ieBrowser = false;
		}

	};


	$scope.detectIE();


	// $scope.clustersel = function(){
	// 	var cluster = $scope.cluster;
	// 	srvShareData.pushData($scope.cluster);
	// 	console.log("aaaaa",cluster);
	// };

	// $scope.clientlist=[];
	// $http.get("/api/client/clientnames").success(function (result){
	// 			console.log("result returned ",result);
	// 			//clientlist = result;
				
	// 			console.log("list",$scope.clientlist);
	// 			for(i=0;i<result.length;i++){
	// 				console.log(i,result[i].clientname)
	// 				$scope.clientlist.push(result[i].clientname);
	// 			}
	// });				

	// // $scope.pushData = function () {

	// // 	$window.sessionStorage.setItem(KEY,"ABC");
	// // };



	// 	$scope.addBilling = function () {
			
			
	// 		var projectDetails ={};
	// 		projectDetails["projname"] = $scope.projname;
	// 		console.log(projectDetails);
			
	// 		$http.post("/api/project/projectid",projectDetails).success(function (result){
	// 			$scope.projid = [];
	// 			console.log("projectid ",result[0]);
	// 			$scope.projid = result[0].projid;
	// 		});	
	
	// 		$http.post("/api/project/sapid",projectDetails).success(function (result){
	// 			$scope.sapid = [];
	// 			console.log("sapid",result[0]);
	// 			$scope.sapid = result[0].sapid;
	// 		});	
	// 		console.log($scope.startdate);
	// 		if ($scope.projid != undefined && $scope.sapid!= undefined) {
	// 		var billingDetails = {};
	// 		billingDetails["empid"] = $scope.empid;
	// 		billingDetails["empname"] = $scope.empname;
	// 		billingDetails["sapid"] = $scope.sapid;
	// 		billingDetails["projid"] = $scope.projid;
	// 		billingDetails["billingstatus"] = $scope.billingstatus;
	// 		billingDetails["startdate"] = $scope.startdate;
	// 		billingDetails["enddate"] = $scope.enddate;
	// 		billingDetails["updatedtime"] = new Date();
	// 		billingDetails["updatedby"] = $scope.username;
	// 		console.log(billingDetails);

	// 		$http.post("/api/billing/insert", billingDetails).success(function (result) {
	// 			//$scope.billingInsertCount = result;
 //                if(result.success ==0 && result.remark == "Non-existent project"){
 //                    console.log("in non existent Project");
	// 				alert("Project does not exist !!!");
 //                }
 //                else if(result.success==0 && result.remark=="Inactive project"){
 //                    console.log("Project is inactive");
	// 				alert("Project is inactive");
 //                }
 //                else if(result.success==0){
 //                    console.log("insertion error");
 //                    alert("Insertion error");
 //                }
	// 			else if (result.success==1) {
	// 				$scope.empid = "";
	// 				$scope.empname = "";
	// 				$scope.sapid = "";
	// 				$scope.projid = "";
	// 				$scope.billingstatus = "";
	// 				$scope.startdate = "";
	// 				$scope.enddate = "";
	// 				srvShareData.pushData($scope.empname);
	// 				$scope.goPath('/bsearch');
	// 			} 
	// 		});
	// 	}
	// }

	// 	$scope.addEmployee = function () {
	// 	//	var date = new Date();
	// 		var employeeDetails = {};
	// 		employeeDetails["manager"] = $scope.manager;
	// 		console.log("in addManager",employeeDetails);

	// 		$http.post("/api/employee/manager", employeeDetails).success(function (result){
	// 			$scope.mgrid = [];
	// 			console.log("result returned ",result[0]);
	// 			$scope.mgrid = result[0].mgrid;
	// 		});
	// 		if ($scope.mgrid != undefined) {
	// 		employeeDetails["empid"] = $scope.empid;
	// 		employeeDetails["firstname"] = $scope.firstname;
	// 		employeeDetails["lastname"] = $scope.lastname;
	// 		employeeDetails["designation"] = $scope.designation;
	// 		employeeDetails["manager"] = $scope.manager;
	// 		employeeDetails["mgrid"] = $scope.mgrid;
	// 		employeeDetails["country"] = $scope.country;
	// 		employeeDetails["cluster"] = $scope.cluster;
	// 		employeeDetails["status"] = $scope.status;
	// 		employeeDetails["updatedtime"] = new Date();
	// 	//	employeeDetails["updatedtime"] = moment(date).format("YYYY-MM-DD hh:mm:ss");
	// 		employeeDetails["updatedby"] = $scope.username;
	// 		console.log(employeeDetails);
	// 		$http.post("/api/employee/insert", employeeDetails).success(function (result) {
	// 			$scope.employeeInsertCount = result;
 //                if(result.success == 0 && result.remark == "Could not create an employee record"){
 //                    console.log("Error in creating record for employee");
 //                    alert("Error in inserting employee record");
 //                }
 //                else if(result.success==0 && result.remark == "Error in creating billing record"){
 //                    console.log("Employee record created but record on billing not created.");
 //                    alert("Employee record created but the default billing record not created");

 //                    srvShareData.pushData($scope.firstname);
 //                    $scope.goPath('/esearch');
 //                }
 //                else if(result.success==1){
	// 				$scope.empid = "";
	// 				$scope.firstname = "";
	// 				$scope.lastname = "";
	// 				$scope.designation = "";
	// 				$scope.manager = "";
	// 				$scope.mgrid = "";
	// 				$scope.country = "";
	// 				$scope.cluster = "";
	// 				$scope.status = "Active";

	// 				srvShareData.pushData($scope.firstname);
	// 				$scope.goPath('/esearch');
	// 			} 
	// 		});
	// 	}
	// }	

	// 	$scope.addProject = function () {
	// 		var clientDetails = {};
	// 		clientDetails["clientname"] = $scope.clientname;
	// 		console.log(clientDetails);
			
	// 		$http.post("/api/client/clientid",clientDetails).success(function (result){
	// 			$scope.clientid = [];
	// 			console.log("clientid ",result[0]);
	// 			$scope.clientid = result[0].clientid;
	// 		});	

	// 		if ($scope.clientid != undefined) {
	// 		var projectDetails = {};
	// 		projectDetails["projid"] = $scope.projid;
	// 		projectDetails["projname"] = $scope.projname;
	// 		projectDetails["sapid"] = $scope.sapid;
	// 		projectDetails["clientid"] = $scope.clientid;
	// 		projectDetails["clientname"] = $scope.clientname;
	// 		projectDetails["country"] = $scope.country;
	// 		projectDetails["startdate"] = $scope.startdate;
	// 		projectDetails["enddate"] = $scope.enddate;
	// 		projectDetails["status"] = $scope.status;
	// 		projectDetails["updatedby"] = $scope.username;
	// 		projectDetails["updatedtime"] = new Date();
	// 		console.log(projectDetails);
	// 		$http.post("/api/project/insert", projectDetails).success(function (result) {
	// 			console.log("result returned in insert api",result,typeof(result));
	// 			//console.log("compare 1",result.localeCompare("Non-existent client"));
 //                //console.log("compare 1",result.localeCompare("Inactive client"));
	// 			if(result.success ==0 && result.remark === "Client inexistent"){
	// 				console.log("in non existent client");

	// 				alert("Client does not exist !!!");
	// 			}
	// 			else if (result.success ==0 && result.remark==="Inactive client"){
	// 				console.log("in Inactiveclient");

	// 				alert("Client is Inactive !!!");
	// 				//$scope.projectInsertCount = result;
	// 			}
				
	// 			else if ($scope.projectInsertCount == 1) {
	// 				$scope.projid = "";
	// 				$scope.projname = "";
	// 				$scope.sapid = "";
	// 				$scope.clientid = "";
	// 				$scope.clientname = "";
	// 				$scope.country = "";
	// 				$scope.startdate = "";
	// 				$scope.enddate = "";
	// 				$scope.status = "Active";

	// 				srvShareData.pushData($scope.projname);
	// 				$scope.goPath('/psearch');
	// 			} 
	// 			else {
	// 				$scope.projectInsertCount = 0;
	// 			}
	// 		});
	// 	}
	// }

	// 	$scope.autocompleteManager = function (typed) {		
	// 	var typedKw = {};
	// 	typedKw["typword"] = typed;
	// 			$http.post("/api/billing/automanager", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].manager);
	// 				}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});
	// 		}
	// 	$scope.autocompleteClient = function (typed) {		
	// 	var typedKw = {};
	// 	typedKw["typword"] = typed;
	// 			$http.post("/api/billing/autoclient", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].clientname);
	// 				}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});
	// 		}

	// 	$scope.autocompleteProject = function (typed) {		
	// 	var typedKw = {};
	// 	typedKw["typword"] = typed;
	// 			$http.post("/api/billing/autoproject", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].projname);
	// 				}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});
	// 		}


		// $scope.clientnames = function(){
		// 	//var clientlist={};

			
		// 		// $('#select').empty();
		// 		// $.each(clientlist, function(i, p) {
		// 		//     $('#select').append($('<option></option>').val(p).html(p));
		// 		// });
		// 		// var select  = document.getElementById("clientnames");
		// 		// for(var i = 0; i < clientlist.length; i++) {
		// 		// 	var opt = clientlist[i];
		// 		// 	console.log("option",clientlist[i]);
		// 		//     var el = document.createElement('option');
		// 		//     el.innerHTML = clientlist[i];
		// 		//     console.log("html",el.innerHTML);
		// 		//     el.value = clientlist[i];
		// 		//     console.log("element",el);
		// 		//     select.appendChild(el);
		// 		// }

			
		// }

		// $scope.addManager = function(){
		// 	var employeeDetails = {};
			
		// 	employeeDetails["manager"] = $scope.manager;
		// 	console.log("in addManager",employeeDetails);

		// 	$http.post("/api/employee/manager", employeeDetails).success(function (result){
		// 		console.log("result returned ",result);

		// 	});

		// 	/*employeeDetails["mgrid"] = ;
		// 	console.log("innnn",result);*/
		// }


		// $(document).ready(function() {
		// 	console.log("in datepicker");
		//     $("#startdate").datepicker();
		//     $("#enddate").datepicker();
		//     $("button").click(function() {
		//     	var selected = $("#dropdown option:selected").text();
		//         var startdate = $("#startdate").val();
		//         var enddate = $("#enddate").val();
		//     });
		// });

		// $(document).ready(function() {
		//     $("#startdate1").datepicker();
		//     $("#enddate1").datepicker();
		//     $("button").click(function() {
		//     	var selected = $("#dropdown option:selected").text();
		//         var startdate1 = $("#startdate1").val();
		//         var enddate1 = $("#enddate1").val();
		//     });
		// });

	// 	$scope.addClient = function () {
	// 	var clientDetails = {};
	// 	clientDetails["clientid"] = parseInt($scope.clientid);
	// 	clientDetails["clientname"] = $scope.clientname;
	// 	clientDetails["status"] = $scope.clientstatus;
	// 	clientDetails["updatedby"] = $scope.username;
	// 	clientDetails["updatedtime"] = new Date();

	// 	$http.post("/api/client/insert", clientDetails).success(function (result) {
	// 		 if(result.success==0 ){
	// 		 	alert("Insertion Error!!!");
	// 		 }
	// 		 else{
	// 		 	alert("Inserted Successfully!!!");
	// 		 }
	// 		$scope.clientInsertCount = result;
	// 		if ($scope.clientInsertCount == 1) {
	// 			$scope.clientid = "";
	// 			$scope.clientname = "";
	// 			$scope.clientstatus = "Active";

	// 			srvShareData.pushData($scope.clientname);
	// 			$scope.goPath('/csearch');
	// 		} else {
	// 			$scope.clientInsertCount = 0;
	// 		}
	// 	});
	// }

	// $scope.billinglistAll =  function(){
	// 	$http.post("/api/billing/listAll", billingDetails).success(function (result) {
	// 			console.log("BillingList returned : ", result);
	// 		});
	// }


});



	
/*$(document).on("click", '#navheader', function(e){
	$('ul li').removeClass('active');
});*/

$(document).on("click", '#navtab1', function(e){
	$('ul li').removeClass('active');
	$('#navtab1').addClass('active');
});
$(document).on("click", '#navtab2', function(e){
	$('ul li').removeClass('active');
	$('#navtab2').addClass('active');
});
$(document).on("click", '#navtab3', function(e){
	$('ul li').removeClass('active');
	$('#navtab3').addClass('active');
});
$(document).on("click", '#navtab4', function(e){
	$('ul li').removeClass('active');
	$('#navtab4').addClass('active');
});


// var first = document.getElementById('manager'),
//     second = document.getElementById('mgrid');

//     first.onkeyup = function () { 
//       second.value = first.value;
//     };



