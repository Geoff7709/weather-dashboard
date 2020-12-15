$( document ).ready(function() {
    $("#search").on('click', function(){
        var query_param = $(this).prev().val();

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&units=imperial&cnt=5&APPID=15dbd29d44cd5bae9c5c65cfeba9be16"

        var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + query_param + "&appid=15dbd29d44cd5bae9c5c65cfeba9be16"

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(weather) {
            console.log(weather)
            var locusLon = weather.coord.lon

            var locusLat = weather.coord.lat

            var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + locusLat + "&lon=" + locusLon + "&appid=15dbd29d44cd5bae9c5c65cfeba9be16"

            $("#search-city").text(weather.name)
            $("#temp").text("Temperature: " + Math.round(weather.main.temp) + "F")
            $("#humidity").text("Humidity: " + weather.main.humidity + "%")
            
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
            })
        })
        $.ajax({
        url: queryFiveDay,
        method: "GET"
        }).then(function(fiveDay) {
            console.log(fiveDay);

        })
    })

})