// Defining the pingUser function
function pingUser() { 
    var settings = { 
        url: "http://localhost:3000/ping",
        method: "POST", 
        contentType: "application/json",
        data: JSON.stringify({ ip: "user_ip_here" }),
        success: function(response) {
            console.log(response);
            alert('Ping results received. Check console for details.');
        },
        error: function(error) {
            console.error(error);
            alert('Failed to ping the user\'s IP address.');
        }
    };

    // Sends the request and observes the response 
    $.ajax(settings);
} 

$(document).ready(function() {
    $(".custom-button").click(function() {
        pingUser();
    });
});