billingApp.controller('startupDetailController', function ($scope, srvShareData, $http, $route) {
  document.getElementById("topmenu").style.visibility = "visible";
	console.log('Inside startupDetailController');
	// $scope.Selname="hello";
	getMeows();
  $scope.startupnamearray="";
  $scope.chartna="";

	function getMeows(reset)

            {	
             //  $scope.selstartupname =window.location.href.split("=")[1];
             //    fundchart();
            	// console.log("Selected Startup",$scope.selstartupname);            
            	console.log("inside startupdetailctrl");
              var rawCategory=[];
              var finalCategory=[];

              $scope.finalselstartupname="";
              $scope.selstartupname =window.location.href.split("=")[1];
              
              $scope.startupnamearray=$scope.selstartupname.split("%20");
              $scope.finalselstartupname=$scope.finalselstartupname.concat($scope.startupnamearray[0]);
              for (var i = 1; i < $scope.startupnamearray.length; i++) {

                $scope.finalselstartupname=$scope.finalselstartupname.concat(" ",$scope.startupnamearray[i]);
              }
        		$scope.resetval=0;
            console.log("selstartupname:",typeof($scope.selstartupname));
            console.log("finalselstartupname:",typeof($scope.finalselstartupname));
            	$http.post('/api/billing/masterData',{"Name":$scope.finalselstartupname}).then(function(response){
            		$scope.fullmeows=response.data;

                // for (var i = 0; i < 12; i++) {  
                //       if (response.data[0].Category[i]!="NA") {
                //         Category.push([
                //           response.data.Category[i]                          
                //         ])
                //       }
                      
                //   }
                rawCategory=response.data[0];
                  console.log("Category list",rawCategory);
            
            	});
              fundchart();


          } 

  
   function fundchart()
  {
    var result = [];
    var fund="'";
    var fundtype="";
    console.log("selected startup name in fundchart function",$scope.finalselstartupname);

    $http.post('/api/billing/fundchart',{"Name":$scope.finalselstartupname}).then(function(response){
      // console.log("fundchart response",response);
      // console.log(response);
      var count=0;
      // var fund1=response.data[0].Seed;
      // var date1=response.data[0].Seed_Date;
      // var SeriesA=response.data[0].SeriesA;
      // console.log("postipo equity",response.data[0]);
      for (var k in response.data[0]) {
        if (response.data[0].hasOwnProperty(k)) {
           ++count;
        }
      }
      // console.log("object length is",count);

      // console.log(fund1);
      // for (var i = 1; i < Things.length; i++) {
      //   Things[i]
      // }

       result.push([    
                        "name",
                        "fund",
                        { role: 'annotation' },
                       
                      ])
    if(response.data[0]==undefined| result==""){
      $scope.chartna="data not available for chart !";
    }
    else {
      $scope.charttitle="Funding Details"
   

       if (response.data[0].Angel != "") {
      result.push([
                        'Angel',
                        parseInt(response.data[0].Angel),
                        response.data[0].Angel_Date
                      ])

    };
       if (response.data[0].ConvertibleNote != "") {
      result.push([
                        'ConvertibleNote',
                        parseInt(response.data[0].ConvertibleNote),
                        response.data[0].ConvertibleNote_Date
                      ])

    };
      if (response.data[0].DebtFinancing != "") {
      result.push([
                        'DebtFinancing',
                        parseInt(response.data[0].DebtFinancing),
                        response.data[0].DebtFinancing_Date
                      ])

    };
      if (response.data[0].EquityCrowdfunding != "") {
      result.push([
                        'EquityCrowdfunding',
                        parseInt(response.data[0].EquityCrowdfunding),
                        response.data[0].EquityCrowdfunding_Date
                      ])

    };
      if (response.data[0].Grant != "") {
      result.push([
                        'Grant',
                        parseInt(response.data[0].Grant),
                        response.data[0].Grant_Date
                      ])

    };
      if (response.data[0].NonEquityAssistance != "") {
      result.push([
                        'NonEquityAssistance',
                        parseInt(response.data[0].NonEquityAssistance),
                        response.data[0].NonEquityAssistance_Date
                      ])

    };
      if (response.data[0].PostIpoDebt != "") {
      result.push([
                        'PostIpoDebt',
                        parseInt(response.data[0].PostIpoDebt),
                        response.data[0].PostIpoDebt_Date
                      ])

    };
      if (response.data[0].PostIpoEquity != "") {
      result.push([
                        'PostIpoEquity',
                        parseInt(response.data[0].PostIpoEquity),
                        response.data[0].PostIpoEquity_Date
                      ])

    };
      if (response.data[0].PrivateEquity != "") {
      result.push([
                        'PrivateEquity',
                        parseInt(response.data[0].PrivateEquity),
                        response.data[0].PrivateEquity_Date
                      ])

    };
    if (response.data[0].ProductCrowdfunding != "") {
      result.push([
                        'ProductCrowdfunding',
                        parseInt(response.data[0].ProductCrowdfunding),
                        response.data[0].ProductCrowdfunding_Date
                      ])

    };
    if (response.data[0].Round != "") {
      result.push([
                        'Round',
                        parseInt(response.data[0].Round),
                        response.data[0].Round_Date
                      ])

    };
    if (response.data[0].SecondaryMarket != "") {
      result.push([
                        'SecondaryMarket',
                        parseInt(response.data[0].SecondaryMarket),
                        response.data[0].SecondaryMarket_Date
                      ])

    };


       if (response.data[0].Seed != "") {
      result.push([
                        'seed',
                        parseInt(response.data[0].Seed),
                        response.data[0].Seed_Date,

                      ])

    };
       
       if (response.data[0].SeriesA != "") {
      result.push([
                        'SeriesA',
                        parseInt(response.data[0].SeriesA),
                        response.data[0].SeriesA_Date
                      ])

    };
      if (response.data[0].SeriesB != "") {
      result.push([
                        'SeriesB',
                        parseInt(response.data[0].SeriesB),
                        response.data[0].SeriesB_Date
                      ])

    };

     if (response.data[0].SeriesC != "") {
      result.push([
                        'SeriesC',
                        parseInt(response.data[0].SeriesC),
                        response.data[0].SeriesC_Date
                      ])
                          };

     if (response.data[0].SeriesD != "") {
      result.push([
                        'SeriesD',
                        parseInt(response.data[0].SeriesD),
                        response.data[0].SeriesD_Date
                      ])

    };

     if (response.data[0].SeriesE != "") {
      result.push([
                        'SeriesE',
                        parseInt(response.data[0].SeriesE),
                        response.data[0].SeriesE_Date
                      ])
    };

    if (response.data[0].SeriesF != "") {
      result.push([
                        'SeriesF',
                        parseInt(response.data[0].SeriesF),
                        response.data[0].DSeriesF_Date
                      ])

    };
    if (response.data[0].SeriesG != "") {
      result.push([
                        'SeriesG',
                        parseInt(response.data[0].SeriesG),
                        response.data[0].SeriesG_Date
                      ])

    };
    if (response.data[0].SeriesH != "") {
      result.push([
                        'SeriesH',
                        parseInt(response.data[0].SeriesH),
                        response.data[0].SeriesH_Date
                      ])

    };
    if (response.data[0].Undisclosed != "") {
      result.push([
                        'Undisclosed',
                        parseInt(response.data[0].Undisclosed),
                        response.data[0].Undisclosed_Date
                      ])

    };

    if (response.data[0].Venture != "") {
      result.push([
                        'Venture',
                        parseInt(response.data[0].Venture),
                        response.data[0].Venture_Date
                      ])

    };
 


      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
       var data = google.visualization.arrayToDataTable(result);

          var options = {
            backgroundColor:'white',
            title: '',
            chartArea: {width: '70%'},
            legend: { position: "none" },
            hAxis: {
              fontName: 'Times New Roman', 
              title: 'Type of funding',
                      },
            vAxis: {
              fontName: 'Times New Roman',
              title: 'USD($)'
            },

            
          };
          var view = new google.visualization.DataView(data);
          var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
          chart.draw(data, options);
      }

    }
    });
  }
});



