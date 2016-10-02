var textCreate = function(text){
  var pTag = document.createElement("p");
  pTag.innerText = text
  return pTag;
}

var textToPage = function(pTag){
  document.body.appendChild(pTag);
}

var winner = function(countryName){
  var winner = "Well Done, You have guessed correctly. It was: " + countryName; 
  var congratulationText = textCreate(winner);
  textToPage(congratulationText);
}

var playGame = function(latLng, guessMap, countryName){
  var correctAnswer = latLng;
  var guess;
  window.onclick = function(){
    guess = guessMap.addClickEvent(correctAnswer);
    if(guess) winner(countryName);
  }
  
}

var newLocation = function(countryList, playerMap, guessMap){
  var location = countryList.newLocation();
  var lat = location.latlng[0];
  var lng = location.latlng[1];
  playerMap.centerAt(lat, lng);
  var correctLatLng = {lat, lng};
  var countryName = location.name;
  playGame(correctLatLng, guessMap, countryName);
}

var buttonCreate = function(name){
  var button = document.createElement("button");
  button.id = name;
  button.innerText = name;
  return button;
}

var buttonToPage = function(button){
  document.body.appendChild(button);
}

var setupGame = function(countries){
  var playerContainer = document.getElementById('player-map');
  var playerMap = new Map(playerContainer, {lat:50, lng:10}, 13, false);

  var guessContainer = document.getElementById('guess-map');
  var guessMap = new Map(guessContainer, {lat:50, lng:10}, 3, true);

  var countryList = new Countries();
  countryList.addCountriesToList(countries);

  var startButton = buttonCreate("Start");
  buttonToPage(startButton);

  startButton.onclick = function(){
    newLocation(countryList, playerMap, guessMap);
  }
}

var requestComplete = function(){
  console.log(this.status);
  console.log("Request complete");
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  setupGame(countries);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var inititalize = function(){
  var url = "http://localhost:5000";
  console.log("Before request");
  makeRequest(url, requestComplete);
  console.log("After Request");
}


window.onload = inititalize;