function getLeadersFromDatabase(){
    alert(dbConnect()); 
}

function dbConnect(){
    return $.ajax({
        type: "GET",
        url: "https://relevantdevelopment.tech/GFTDatabaseConnector/mysqlConnect.php",
        async: false
    }).responseText;

}