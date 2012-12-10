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
  },
  
  tag: function(selector){
    return document.getElementsByTagName(selector)[0];
  },
  
  class: function(selector){
    return document.getElementsByClassName(selector)[0];
  },
  
  id: function(selector){
    return document.getElementById(selector);
  },

  sum: function(arr){
    var result = 0;
    U.forEach(arr, function(int){
      result += parseInt(int);
    });
    return result;
  },

  getCodes:function(chars){
    var codes = [];
    U.forEach(chars, function(char){
      codes.push(char.charCodeAt(0));
    });
    return codes;
  },

  getCharCodeAverage: function(string){
    var chars = string.split("");
    var codes = U.getCodes(chars);
    var length = codes.length;
    var total = U.sum(codes);
    return Math.round(total/length) * 2;
  },

  getSumDigitSum: function(string){
    var codes = U.getCodes(string.split(""));
    return U.sum(codes) % 300;
  },
};

window.AnalyticsWindow = function(){
  var launcher = U.id('analytics');
  var modal = U.id('modal');
  var close = U.class('close');
  var list = U.id('list');
  var canvas = U.tag('canvas');
  var context = canvas.getContext('2d');
  context.fillEllipse = function(x,y,radius){
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();
  };
  var isLooping = false;
  var data = [];

  var updateData = function(){
    var currentString = window.stringy.getString();
    var time = new Date();
    if(data.length < 20){
      data.push({time: time, string: currentString});
    }else{
      data.shift();
    }
  };

  var loop = function(){
    updateData();
    display();
    if(isLooping){
      setTimeout(loop, 1000);
    }
  };

  var display = function(){
    var width = canvas.width = 464;
    var height = canvas.height = 276;
    context.fillStyle = 'white';
    context.fillRect(0,0,width, height);
    U.forEach(data, function(element){
      var r = element.time.getHours() * 10
      var g = element.time.getMinutes() * 4
      var b = element.time.getSeconds() * 4
      var x = U.getCharCodeAverage(element.string);
      var y = U.getSumDigitSum(element.string);
      var r = element.string.length;
      context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 0.6)";
      context.fillEllipse(x,y,r);
    });
  };

  // var display = function(){
  //   list.innerHTML = '';
  //   U.forEach(data, function(element){
  //     list.innerHTML += '<li>' + element.time + ':' + element.string + '</li>'
  //   });
  // };

  var start = function(){
    isLooping = true;
    loop();
  };
  
  var stop = function(){
    isLooping = false;
  };

  launcher.onclick = function(){
    modal.style.display = 'block';
    start();
  };
  
  close.onclick = function(){
    modal.style.display = 'none';
    stop();
  };
};

window.Stringy = function(){
  var input = U.tag('input');
  var output = U.tag('p');
  var button = U.tag('button');
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
    var character = U.randomElementFetch(characters);
    U.randomElementAssign(splitstring, character);
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
  
  this.getString = function(){
    return string;
  };

  button.onclick = appendInput;
  loop();
};


window.onload = function(){
  window.stringy = new Stringy();
  window.analyticsWindow = new AnalyticsWindow();
};