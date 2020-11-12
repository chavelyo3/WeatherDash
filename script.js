$(document).ready(function () {
    //variables
    let cityLi = $("#city-list");
    if(JSON.parse(localStorage.getItem("previousCities"))){
      var list = JSON.parse(localStorage.getItem("previousCities"))
    } else {
      var list = [];
    }
    let searchBtn = $("#button")
    let hour = moment().hours();
  
  // this gets the weather and the uv 
    function currentWeather() {
  
    let apiKey = "02fe379588f9e1cd3f2ff3502c073b17";
      let input = $("#input").val();
      list.push(input);
      localStorage.setItem("previousCities", JSON.stringify(list))
      $("#input").val("");
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey;

        $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        $("#cityView").empty();
        
        console.log(response);
  
        console.log(queryURL);
        console.log(response.weather[0].icon);
  
        let pinput = $("<p>")
          .addClass("ppp")
          .text(input + " " + "(" + moment().format("LLL") + ")");
        $("#cityView").append(pinput);
  
        let image = $("<img>").attr("src","https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#cityView").append(image);
  
        let temp = parseInt((response.main.temp -273.15) *1.85 + 32);
  
        temp = Math.floor(temp);
  
        let tempOne = $("<p>").text("Temprature: " + temp + " °F");
        $("#cityView").append(tempOne);
  
        let humid = response.main.humidity;
  
        let tempTwo = $("<p>").text("Humidity: " + humid + " %");
        $("#cityView").append(tempTwo);
  
        let windSpeed = response.wind.speed;
  
        let tempThree = $("<p>").text("Wind Speed: " + windSpeed);
        $("#cityView").append(tempThree);
  
        let lon = response.coord.lon;
        let lat = response.coord.lat;
        console.log(lat);
        console.log(lon);
              
        //uv Index
        let uviURL =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        $.ajax({
          url: uviURL,
          method: "GET",
        }).then(function (uviResponse) {
          
          console.log(uviResponse[0].value);
          console.log(uviURL);
          let tempFour = $("<span>").text(uviResponse[0].value);
          console.log(tempFour.text(uviResponse[0].value));
        
          
          let tempFive = $("<p>").text("UV Index : ");
          tempFive.append(tempFour);
          $("#cityView").append(tempFive);
         
          
          if (uviResponse[0].value > 0 && uviResponse[0].value <= 2) {
            tempFour.attr("class", "green");
          } else if (uviResponse[0].value > 2 && uviResponse[0].value <= 5) {
            tempFour.attr("class", "yellow");
          } else if (uviResponse[0].value > 5 && uviResponse[0].value <= 7) {
            tempFour.attr("class", "orange");
          } else if (uviResponse[0].value > 7 && uviResponse[0].value <= 10) {
            tempFour.attr("class", "red");
          }
        });
      });

      //five day forecast
      let weatherURL  = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + apiKey;
      $.ajax({
        url: weatherURL,
        method: "GET",
      }).then(function (weatherResponse) {
        $("#five-title").empty();
        $("#dayFive").empty();
        console.log(weatherResponse);
        console.log(queryURL);

      let dayCinco = $("<h3>").text("Forecast For The Next 5 Days:");
      $("#five-title").append(dayCinco);

        let imgIcon = "http://openweathermap.org/img/wn/"
        for (j = 0 ; j< weatherResponse.list.length; j+=8){
          var newP = $("<p>").text(weatherResponse.list[j].dt_txt)
          $("#dayFive").append(newP)
        }  
        
      // image link http://openweathermap.org/img/wn/ 
         
      
      
      });
      renderList()
    }

       //start button 
      
      searchBtn.on("click", currentWeather)
    
    function renderList() {

    }
    renderList();
     // clear button 

     let clearBtn = $("#clearBtn");
     clearBtn.on("click", function(){
        cityLi.empty();
        list = []
        localStorage.setItem("previousCities", JSON.stringify(list))
        renderList()
     });

  // storing cities 
  //get stored cities and create list (li)

    })
 