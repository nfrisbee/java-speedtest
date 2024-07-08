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
            alert('Ping results received! You can now close this window.');
            $('body').removeClass('loading');
        },
        error: function(error) {
            console.error(error);
            alert('Failed to ping the user\'s IP address. Please contact your recruiter helpdesk@1800contacts.com ');
            $('body').removeClass('loading');
        } 
    };

    // Sends the request and observes the response
    $.ajax(settings);
}

$(document).ready(function() {
    $(".custom-button").click(function() {
        $('body').addClass('loading');
        getUserIP(function(userIP) {
            pingUser(userIP);
        });
    });
});