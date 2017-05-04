billingApp.controller('campaignDetailController', function ($scope, srvShareData, $http, $route) {
  document.getElementById("topmenu").style.visibility = "visible";
	console.log('Inside campaignDetailController');
	// $scope.Selname="hello";
	getMeows();
campchart();
  
  $scope.campaignnamearray=[];
  $scope.chartna="";

	function getMeows(reset)

            {	

              
              $scope.Primary_Key="";
            	$scope.Primary_Key =window.location.href.split("=")[1];
              console.log("primary key si :",$scope.Primary_Key);
            	// $scope.campaignnamearray=$scope.selcampaignname.split("%20");
             //  $scope.finalselcampaignname=$scope.finalselcampaignname.concat($scope.campaignnamearray[0]);
             //  for (var i = 1; i < $scope.campaignnamearray.length; i++) {

             //    $scope.finalselcampaignname=$scope.finalselcampaignname.concat(" ",$scope.campaignnamearray[i]);
             //  }
            
              $scope.resetval=0; 
            	$http.post('/api/billing/campaignmasterData',{"Primary_Key":$scope.Primary_Key}).then(function(response){
            		$scope.fullmeows=response.data;
            
            	});
              
           	    
               } 


  function campchart()
               {
                $scope.charttitle="Funding Details";
                 var result = [];
                 var str1="";
                 // var fund="'";
                 // var fundtype="";
                 console.log("selected campaign name in campchart function",$scope.Primary_Key);
                  str1=$scope.Primary_Key;

               while (str1.indexOf("�") >= 0){
                   str1=str1.replace("%EF%BF%BD","�");
                   console.log("� exists");
               }
                while (str1.indexOf("%27") >= 0){
                  str1=str1.replace("%27","'");
                }
                
                console.log("NEW:",str1);

                 $http.post('/api/billing/campchart',{"Primary_Key":str1}).then(function(response){
                   console.log("fundchart response",response);
                   
                    result.push([    
                                     "Name",
                                     "Pledged Amount",
                                     { role: 'style' }
                                    

                                     
                                   ])
                  //    if(response.data[0]==undefined| response.data[0]==""){
                  //               $scope.chartna="data not available for chart !";
                  // }

                  // else {

                    if (response.data[0].Goal != "") {
                   result.push([
                                     'Pledged Amount',
                                     parseInt(response.data[0].Goal),
                                     'orange'
                                     
                                     
                                   ])

                 };

                   if (response.data[0].Fund_Raised != "") {
                   result.push([
                                     'Fund Raised',
                                     parseInt(response.data[0].Fund_Raised),
                                     'green'
                                     
                                   ])

                 };
                                        

                 
                   console.log("result",result);

               google.charts.load('current', {packages: ['corechart']});
               google.charts.setOnLoadCallback(drawChart);


             function drawChart() {
              console.log("in drawChart");
                    var data = google.visualization.arrayToDataTable(result);

                       var options = {
                        // backgroundColor:'#FFF8DC',
                        forceIFrame:true,
                         title: 'Funding Chart',
                         titleTextStyle :{ 
                            
                            fontSize: 20,
                            bold: true,
                          },
                         chartArea: {width: '50%'},
                         legend: { position: "none" },
                         hAxis: {
                           fontName: 'Times New Roman', 
                           title: 'Funding Type',
                                   },
                         vAxis: {
                           fontName: 'Times New Roman',
                           title: 'USD($)'
                         },
                         animation: {
                                    duration: 1000,
                                    startup: true
                                }
                         
                       };
                       var view = new google.visualization.DataView(data);
                       var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                       chart.draw(data, options);
                   }
                 // }

                 }); 
             };

});
