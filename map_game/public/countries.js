var Countries = function(){
  this.list = [];
}

Countries.prototype = {
  addCountriesToList: function(countries){
    for (var i = 0; i < countries.length; i++){
      this.list.push(countries[i]);
    }
  },
  newLocation: function(){
    var randomIndex = Math.floor(Math.random()*this.list.length);
    return this.list[randomIndex];
  }
}