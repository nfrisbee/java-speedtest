// Function to get user's IP address
function getUserIP(callback) {
    $.getJSON('https://api.ipify.org?format=json', function(data) {
        callback(data.ip);
    });
}

// Defining the pingUser function
function pingUser(userIP) {
    var ipAddresses = ['204.16.236.8', '204.16.238.8'];
    var settings = {
        url: "http://localhost:3000/ping",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ userIP: userIP, ipAddresses: ipAddresses }),
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
        getUserIP(function(userIP) {
            pingUser(userIP);
        });
    });
});