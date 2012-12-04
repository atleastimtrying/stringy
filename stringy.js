window.U = {
  roundom: function(int){
    return Math.floor(Math.random()* int);
  },
  
  randomElementFetch: function(arr){
    return arr[U.roundom(arr.length)];
  },

  randomElementAssign: function(arr, value){
    return arr[U.roundom(arr.length)] = value;
  },

  randomLoop: function(int, fn ){
    for(var i = 0, l = U.roundom(int); i < l; i++){
      fn();
    }
  },

  forEach: function(arr,fn){
    for(var i = 0, l = arr.length; i < l; i++){
      fn(arr[i]);
    }
  }
};

window.Stringy = function(){
  var input = document.getElementsByTagName('input')[0];
  var output = document.getElementsByTagName('p')[0];
  var button = document.getElementsByTagName('button')[0];
  var string = '';
  var characters = [];

  var display = function(){
    output.innerHTML = string;
  };

  var addcharacter = function(character){
    characters.push(character);
  };

  var addCharacters = function(input){
    U.forEach(input.split(""), addcharacter);
  };

  var randomizeString = function(){
    var splitstring = string.split("");
    U.randomElementAssign(splitstring, U.randomElementFetch(characters));
    string = splitstring.join("");
  };

  var mutate = function(){
    U.randomLoop(7, randomizeString);
  };

  var loop = function(){
    display();
    mutate();
    setTimeout(loop, U.roundom(600));
  };

  var appendInput = function(){
    string += input.value;
    addCharacters(input.value);
    return false;
  };

  button.onclick = appendInput;
  loop();
};


window.onload = function(){
  window.stringy = new Stringy();
};