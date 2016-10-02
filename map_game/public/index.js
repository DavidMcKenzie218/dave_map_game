var newLocation = function(countryList, map){
  var location = countryList.newLocation();
  var lat = location.latlng[0];
  var lng = location.latlng[1];
  map.centerAt(lat, lng);
  playGame();
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
  var container = document.getElementById('map');
  var map = new Map(container, {lat:50, lng:10}, 13);

  var countryList = new Countries();
  countryList.addCountriesToList(countries);

  var startButton = buttonCreate("Start");
  buttonToPage(startButton);

  startButton.onclick = function(){
    newLocation(countryList, map);
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