
//login user on any window that includes this javascript
document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem('currentUser') != null){
        document.getElementById('loginSignup').innerHTML = "Welcome " + localStorage.getItem('currentUser'); 
    } 
  })

function populateLeaderBoards(){
    scores = JSON.parse(getAllScores());
    topLine = "<div class='scoreLine'><h4>NUMBER</h4><h4>GAME</h4><h4>SCORE</h4><h4>USER</h4></div>";
    document.getElementById('leaderboards').innerHTML += topLine; 
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

function loginUser(){
    username = document.getElementById('loginUsername').value; 
    password = document.getElementById('loginPassword').value; 
    if(checkUserLogin(username, password) == "false")
        alert("Incorrect username and/or password. If you haven't already signed up, click on the sign up button below."); 
    else{
        alert(username + " logged in! Your scores will now be uploaded to the leaderboards."); 
        localStorage.setItem('currentUser', username); 
        document.getElementById('loginSignup').innerHTML = "Welcome " + username;
    } 
}

function signUpUser(){
    fName = document.getElementById('suFName').value; 
    lName = document.getElementById('suLName').value;
    dob = document.getElementById('suDOB').value;
    username = document.getElementById('suUsername').value;
    password = document.getElementById('suPassword').value;
    passwordConfirm = document.getElementById('suPasswordConfirm').value;

    //make sure none of the spots are void
    if(fName ==""){
        alert("Please enter a value for first name"); 
        return; 
    }
    if(lName ==""){
        alert("Please enter a value for last name"); 
        return; 
    }
    if(dob==""){
        alert("Please enter a date for birthdate"); 
        return; 
    }
    if(username ==""){
        alert("Please enter a value for username"); 
        return; 
    }
    if(password ==""){
        alert("Please enter a value for password"); 
        return; 
    }
    if(passwordConfirm == ""){
        alert("Please enter a value for confirmation password"); 
        return; 
    }
    if(password != passwordConfirm){
        alert("Password mismatch"); 
        return; 
    }
     
    //if the function has gotten this far, there should be no errors in the input. 
    //add the user
    alert(addUser(fName, lName, dob, password, username));  
}

//--------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------below here is all of the database access functions--------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------//

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
        return(response); 
    else   
        return("Account added. Have fun!"); 
}

function checkUserLogin(username, password){
    response=$.ajax({
        type: "GET",
        data: ({username: username, password: password}),
        url: "https://www.relevantdevelopment.tech/GFTDatabaseConnector/loginUser.php",
        async: false
    }).responseText; 
    return(response); 
}