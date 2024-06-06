// Defining the pingIP function
function pingIP(ipAddress) { 
    var settings = { 
        // Defines the configurations for the request 
        cache: false, 
        dataType: "json", 
        async: true, 
        crossDomain: true, 
        url: "http://" + ipAddress,
        method: "GET", 
        headers: { 
            accept: "application/json", 
            "Access-Control-Allow-Origin": "*", 
        }, 
    };

    // Sends the request and observes the response 
    $.ajax(settings).done(function (response) { 
        console.log(response); 
    
    }); 
} 

$(document).ready(function() {
    $(".custom-button").click(function() {
        // Ping the first IP address
        pingIP("204.16.236.8"); 
        
        // Ping the second IP address
        pingIP("204.16.238.8");
    });
});