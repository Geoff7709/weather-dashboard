$( document ).ready(function() {
    console.log($("input").val())
    
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    
    var searchHistory = $("#search-history")
    
    
    function renderHistory() {
        searchHistory.empty();
        
        for (var i = 0; i < searches.length; i++) {
            var searchItem = $("<li>");
            searchItem.attr("class", "history")
            searchItem.text(searches[i]);
            searchHistory.append(searchItem);
        }
    }
    renderHistory()
    console.log($(searches).get(-1))
    function setPage() {
        var lastSearch = $(searches).get(-1);
    
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + lastSearch + "&units=imperial&APPID=15dbd29d44cd5bae9c5c65cfeba9be16"
        
        var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + lastSearch + "&units=imperial&appid=15dbd29d44cd5bae9c5c65cfeba9be16"

                
        // function setHistory() {
        //     var newSearch = query_param
                    
        //     if (newSearch !== "") {
        //         searches.push(newSearch)
        //         query_param = null
        //         localStorage.setItem("searches", JSON.stringify(searches))
        //     }
        // }
        // setHistory();

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(weather) {
            // console.log(weather)
            var locusLon = weather.coord.lon

            var locusLat = weather.coord.lat

            var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + locusLat + "&lon=" + locusLon + "&appid=15dbd29d44cd5bae9c5c65cfeba9be16"

            $("#search-city").text(weather.name + " (" + moment().format("MMMM Do") + ")")
            $("#temp").text("Temperature: " + Math.round(weather.main.temp) + "F")
            $("#humidity").text("Humidity: " + weather.main.humidity + "%")
            $("#weather-icon").attr({"src": "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png", "alt": "Weather Icon"})
            
            $.ajax({
                url: uviURL,
                method: "GET"
            }).then(function(uvi) {
                var uvIndex = uvi.value
                var uvDisplay =  $("#uv-index")
                uvDisplay.text("UV Index: " + uvIndex)
                if (uvIndex < 3) {
                    uvDisplay.attr("class", "uv-good")
                }
                else if (2 < uvIndex < 6) {
                    uvDisplay.attr("class", "uv-poor")
                }
                else if (5 < uvIndex < 8) {
                    uvDisplay.attr("class", "uv-bad")
                }
                else if (7 < uvIndex < 11) {
                    uvDisplay.attr("class", "uv-danger")
                }
                else if (uvIndex > 10) {
                    uvDisplay.attr("class", "stay-inside")
                }
            })
        })
        $.ajax({
        url: queryFiveDay,
        method: "GET"
        }).then(function(fiveDay) {
            var arrayOfDays = [fiveDay.list[4],
            fiveDay.list[12],
            fiveDay.list[20],
            fiveDay.list[28],
            fiveDay.list[36],]

            var daysDisplay = [$("#day1"),
            $("#day2"),
            $("#day3"),
            $("#day4"),
            $("#day5"),]

            var iconDisplay = [$("#weather-icon1"),
            $("#weather-icon2"),
            $("#weather-icon3"),
            $("#weather-icon4"),
            $("#weather-icon5"),]

            var tempDisplay = [$("#temp1"),
            $("#temp2"),
            $("#temp3"),
            $("#temp4"),
            $("#temp5"),]

            var humDisplay = [$("#humidity1"),
            $("#humidity2"),
            $("#humidity3"),
            $("#humidity4"),
            $("#humidity5"),]
            
            console.log(arrayOfDays)
            for (var i =0; i < 5; i++) {
                
                daysDisplay[i].text(moment(arrayOfDays[i].dt_txt).format("M/D"))
                
                iconDisplay[i].attr({"src": "http://openweathermap.org/img/w/" + arrayOfDays[i].weather[0].icon + ".png", "alt": "Weather Icon"})

                tempDisplay[i].text("Temperature: " + Math.round(arrayOfDays[i].main.temp) + "F")

                humDisplay[i].text("Humidity: " + arrayOfDays[i].main.humidity + "%")
            }
        })
    }
    setPage();
            
    $("#search").on('click', function() {
        var query_param = $("input").val();
    
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&units=imperial&APPID=15dbd29d44cd5bae9c5c65cfeba9be16"
        
        var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + query_param + "&units=imperial&appid=15dbd29d44cd5bae9c5c65cfeba9be16"

                
        function setHistory() {
            var newSearch = query_param
                    
            if (newSearch !== "") {
                searches.push(newSearch)
                query_param = null
                localStorage.setItem("searches", JSON.stringify(searches))
            }
        }
        setHistory();

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(weather) {
            // console.log(weather)
            var locusLon = weather.coord.lon

            var locusLat = weather.coord.lat

            var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + locusLat + "&lon=" + locusLon + "&appid=15dbd29d44cd5bae9c5c65cfeba9be16"

            $("#search-city").text(weather.name + " (" + moment().format("MMMM Do") + ")")
            $("#temp").text("Temperature: " + Math.round(weather.main.temp) + "F")
            $("#humidity").text("Humidity: " + weather.main.humidity + "%")
            $("#weather-icon").attr({"src": "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png", "alt": "Weather Icon"})
            
            $.ajax({
                url: uviURL,
                method: "GET"
            }).then(function(uvi) {
                var uvIndex = uvi.value
                var uvDisplay =  $("#uv-index")
                uvDisplay.text("UV Index: " + uvIndex)
                if (uvIndex < 3) {
                    uvDisplay.attr("class", "uv-good")
                }
                else if (2 < uvIndex < 6) {
                    uvDisplay.attr("class", "uv-poor")
                }
                else if (5 < uvIndex < 8) {
                    uvDisplay.attr("class", "uv-bad")
                }
                else if (7 < uvIndex < 11) {
                    uvDisplay.attr("class", "uv-danger")
                }
                else if (uvIndex > 10) {
                    uvDisplay.attr("class", "stay-inside")
                }
            })
        })
        $.ajax({
        url: queryFiveDay,
        method: "GET"
        }).then(function(fiveDay) {
            var arrayOfDays = [fiveDay.list[4],
            fiveDay.list[12],
            fiveDay.list[20],
            fiveDay.list[28],
            fiveDay.list[36],]

            var daysDisplay = [$("#day1"),
            $("#day2"),
            $("#day3"),
            $("#day4"),
            $("#day5"),]

            var iconDisplay = [$("#weather-icon1"),
            $("#weather-icon2"),
            $("#weather-icon3"),
            $("#weather-icon4"),
            $("#weather-icon5"),]

            var tempDisplay = [$("#temp1"),
            $("#temp2"),
            $("#temp3"),
            $("#temp4"),
            $("#temp5"),]

            var humDisplay = [$("#humidity1"),
            $("#humidity2"),
            $("#humidity3"),
            $("#humidity4"),
            $("#humidity5"),]
            
            console.log(arrayOfDays)
            for (var i =0; i < 5; i++) {
                
                daysDisplay[i].text(moment(arrayOfDays[i].dt_txt).format("M/D"))
                
                iconDisplay[i].attr({"src": "http://openweathermap.org/img/w/" + arrayOfDays[i].weather[0].icon + ".png", "alt": "Weather Icon"})

                tempDisplay[i].text("Temperature: " + Math.round(arrayOfDays[i].main.temp) + "F")

                humDisplay[i].text("Humidity: " + arrayOfDays[i].main.humidity + "%")
            }
        })
    })

    $("#clear-history").on("click", function() {
        // console.log("test")
        searchHistory.empty();
        localStorage.clear();
    })
})
