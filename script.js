$( document ).ready(function() {
    $("#search").on('click', function(){
        var query_param = $(this).prev().val();

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&units=imperial&cnt=5&APPID=15dbd29d44cd5bae9c5c65cfeba9be16"

    
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(weather) {
          console.log(weather);
        })
    })

})