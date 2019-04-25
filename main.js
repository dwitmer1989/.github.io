username = ""; 

function populateLeaderBoards(){
    scores = JSON.parse(getAllScores());
    for(var i = 0; i < scores['scores'].length; i++){
        currentLine = scores['scores'][i]; 
        scoreLine = "<div class='scoreLine'>"; 
            scoreLine += "<h4>"+ (i+1) + ".)</h4>"; 
            scoreLine += "<h4>" + currentLine['game'] + "</h4>"; 
            scoreLine += "<h4>" + currentLine['score'] + "</h4>"; 
            scoreLine += "<h4>" + currentLine['user'] + "</h4>"; 
        scoreLine += "</div>"; 
        document.getElementById('leaderboards').innerHTML += scoreLine; 
    } 
}


//below here is all of the database access functions
function addGame(game){ 
    response=$.ajax({
        type: "GET",
        data: ({game: game}),
        url: "https://www.relevantdevelopment.tech/GFTDatabaseConnector/addGame.php",
        async: false
    }).responseText; 
    
    return response; 
}

function logScore(game, user, score){
    //the first time a score is recorded for a game, the game is added to the database. Therefore, we call addGame() every time
    //we log a score in case the game doesn't exist. The server side knows this and only trys to add the game if it doesn't 
    //exist in the database. 
    addGame(game); 

    //add the score for the user. This function will check whether or not the user exists and return 1 if the user doesn't exist. 
    response=$.ajax({
        type: "GET",
        data: ({game: game, user: user, score: score}),
        url: "https://www.relevantdevelopment.tech/GFTDatabaseConnector/logScore.php",
        async: false
    }).responseText; 
    
    return response; 
}

function getAllScores(){
    response=$.ajax({
        type: "GET",
        url: "https://www.relevantdevelopment.tech/GFTDatabaseConnector/getAllScores.php",
        async: false
    }).responseText; 
    
    return(response); 
}

function addUser(fName, lName, dob, password, username){
    response=$.ajax({
        type: "GET",
        data: ({fName: fName, lName: lName, dob: dob, password: password, username: username}),
        url: "https://www.relevantdevelopment.tech/GFTDatabaseConnector/addUser.php",
        async: false
    }).responseText; 
    
    if(response != "")
        alert(response); 
    else   
        alert("Account added. Have fun!"); 
}

function checkUserLogin(username, password){
    response=$.ajax({
        type: "GET",
        data: ({username: username, password: password}),
        url: "https://www.relevantdevelopment.tech/GFTDatabaseConnector/loginUser.php",
        async: false
    }).responseText; 
    alert(response); 
}