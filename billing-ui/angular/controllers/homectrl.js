billingApp.controller('homeController',function ($scope, $http,srvShareData, $route, $location,$window) {
		// $scope.resetval=0;
		
		document.getElementById("topmenu").style.visibility = "visible";
		top();
		countrychart();
		getMeows();

		var listnames=[];
		var data=[{}];
		var idType='';
		var nameType='';
		$scope.textWord="";
		$scope.chartna="";
		
		flag=true;
		$scope.currentpageno=1;


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
       
       JSONToCSVConvertor(data, "Startup data", true);
      
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
}
   }
   //this part will append the anchor tag and remove it after automatic click



         $scope.reset=function()
         {	
         	console.log("inside reset")
         	$scope.resetval=1;
         	$scope.textWord="";
         	$scope.Name="";
         	$scope.Country="";
         	$scope.Category="";
         	$scope.Channel="";
         	$scope.currentpageno=1;
         	$scope.Fund_Data_Availability="";
         	getMeows();
         }  


		function top(){
			$("body").css("cursor", "progress");
			$http.post('/api/billing/uniquetopcategorystartup',{}).then(function(response){	

            		$scope.topIndustryTag=response.data;
            		console.log("top categories: ",$scope.topIndustryTag);
            		
            	});

				$http.post("/api/billing/toptable",{"topIndustryTag":$scope.Category1}).success(function(result){
					
					//console.log("this is the toptable data : ",result);
					$scope.toptable=result;	
									
				});
				$("body").css("cursor", "default");	

       }

       $scope.filterfortop=function(){
       	console.log("categories",$scope.topIndustryTag);
       		top();
       		countrychart();
       		
       }

         $scope.resetfortop=function(){
         	$scope.Category1="";
         	top();
       		countrychart();

         }
  //       

        function getMeows()

            {	
            	

            	$http.post('/api/billing/uniquecategorystartup',{"Fund_Data_Availability":$scope.Fund_Data_Availability,"Name":$scope.Name,"Country":$scope.Country, "IndustryTag":$scope.Category,"Channel":$scope.Channel}).success(function(response){	
            		$scope.IndustryTag=response;   
            		        	
            		console.log("categories",$scope.IndustryTag);
            		
            	});

            	// console.log("full meows length",$scope.fullmeows)

            	console.log("inside getMeows")
            	// top();
        		$scope.resetval=0;
				console.log("inside somett");
				// console.log("selected",$scope.Country);
				// console.log("selected",$scope.IndustryTag);
				// var Country=$scope.Country;
				// var IndustryTag=$scope.IndustryTag;
				$http.post("/api/billing/Country",{"Fund_Data_Availability":$scope.Fund_Data_Availability,"textWord":$scope.textWord,"currentpageno":$scope.currentpageno,"Name":$scope.Name,"Country":$scope.Country, "IndustryTag":$scope.Category,"Channel":$scope.Channel}).success(function(result){
					
					//console.log("this is the filtered data : ",result);
					
					$scope.filterData=result;	
					if(result==undefined||result==""){
						$scope.chartna="No matching records!"
					}
					
				});
            	// $scope.somett();
            	$("body").css("cursor", "progress");
            	$http.post('/api/billing/masterData',{"Fund_Data_Availability":$scope.Fund_Data_Availability,"Name":$scope.Name,"Country":$scope.Country, "IndustryTag":$scope.Category,"Channel":$scope.Channel}).success(function(response){
            		console.log('masterData',response.length);
            		
            		$scope.fullmeows=response;
            		$scope.fullmeows1=response;
            		$scope.fullmeows2=response;
            		$scope.fullmeows3=response;
            		//namefetch();
            		console.log("fullmeows1",$scope.fullmeows1);

            		if(Math.ceil($scope.fullmeows.length/100)==0){
            			$scope.lastpageno=1;
            		}
            		else{
            			$scope.lastpageno=Math.ceil($scope.fullmeows.length/100);
            		}
            		$("body").css("cursor", "default");	
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
                	
            
           	    
               } 
               // console.log("this is new filtered data : ",filterData);

               
           function countrychart() {

           	 	$http.get('/countrychart').then(function(response){	

           	 		console.log("category for country chart :",$scope.Category1);

	           	     	$scope.countrycharts=response.data;
	           	     	// var data = $.parseJSON(response);
	           	     	// $scope.Country=$scope.countrychart.Country;
	           	     	// console.log("inside countrychart");
	           	     	// console.log($scope.countrycharts);
	         
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

											// if($scope.Category1==undefined){
											// for (var i = json_data1.length - 1; i >= 0; i--)	
											// 	result.push([
											// 	json_data1[i].State,
											// 	json_data1[i].Country,										
											// 	parseInt(json_data1[i].Count),
											// 	parseInt(json_data1[i].Tot_Funding)
											// 	])
											// }
											// if($scope.Category1==undefined){
											// 	$scope.Category1="NA";										

											// }
											
											if ($scope.Category1== undefined) {

												$scope.Category1="All";
											}
											// console.log('categry1 undefined',$scope.Category1);
											// console.log('json data',(json_data1[1].Category));
											// console.log((json_data1[1].Category)==($scope.Category1));
										for (var i = json_data1.length - 1; i >= 0; i--) {


											if((json_data1[i].Category)==($scope.Category1) ){

												result.push([
												json_data1[i].State,
												json_data1[i].Country,	
												parseInt(json_data1[i].Count),
												parseInt(json_data1[i].Tot_Funding),
												
												])
											}											

										}

								console.log("country chart result:",result)
								// console.log(result);
								// console.log(typeof(result));
								// console.log("result is here:",result);

						        
						        var data1 = google.visualization.arrayToDataTable(result);
						        var options1 = {

						        	
													    minHighlightColor: '#8c6bb1',
												        midHighlightColor: '#9ebcda',
												        maxHighlightColor: '#edf8fb',
												        minColor: '#009688',
												        midColor: '#f7f7f7',
												        maxColor: '#ee8100',
												        // maxColorvalue:8801409714640,
												        // minColorvalue:0,
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


           	 	$http.get('/categorychart').then(function(response){	

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

				        var options = {backgroundColor:'white',


				        	// backgroundColor: '#B4B4AF',
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
            // countrychart();

            // getMeows();

	
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



