function getLeadersFromDatabase(){
    alert(dbConnect()); 
}

function dbConnect(){
    return $.ajax({
        type: "GET",
        url: "http://relevantdevelopment.tech/GFTDatabaseConnector/mysqlConnect.php",
        async: false
    }).responseText;
}