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
  
        let tempOne = $("<p>").text("Temperature: " + temp + "°F");
        $("#cityView").append(tempOne);
  
        let humid = response.main.humidity;
  
        let tempTwo = $("<p>").text("Humidity: " + humid + "%");
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
        $("#5title").empty();
        $("#day-five").empty();
        console.log(weatherResponse);
        console.log(weatherURL);
        $("#day-five").empty();
          $("#five-title").empty();

      let dayCinco = $("<h3>").text("Next 5 Days:");
      $("#5title").append(dayCinco);
       for (let j = 0 ; j< weatherResponse.list.length; j+=8){
          var newP = $("<div class='card-deck'>");
          $("#day-five").append(newP);

    
          
          let month = weatherResponse.list[j].dt_txt.split("-")[1];
          let day = weatherResponse.list[j].dt_txt.split("-")[2].split(" ")[0];
          let year = weatherResponse.list[j].dt_txt.split("-")[0];


          let fiveone = $("<h5 class='card-title'>").text(
            month + "•" + day + "•" + year ); 

            
          let icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherResponse.list[j].weather[0].icon + ".png");
            
          let temp = parseInt((weatherResponse.list[j].main.temp-273.15)*1.85 + 32);
          let fiveTwo = $("<p class ='card-text'>").text("Temperature: " + temp + "°F");
          let humid = weatherResponse.list[j].main.humidity;
          let fiveThree = $("<p class='card-text'>").text("Humidity: " + humid + "%");
          let fiveDiv = $("<div class=' card-body five'>");

      
          fiveDiv.append(fiveone);
          fiveDiv.append(icon);
          fiveDiv.append(fiveTwo);
          fiveDiv.append(fiveThree);
          newP.append(fiveDiv)
         
        
          
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
  //render 




  // Style the list of previous city buttons for underneath the search bar using the localStorage get Item
  // to get the array of previous stuff. All in the render function

  // Solve duplicate button issue?

  // Solve if I click the rendered button to make a search for that button.