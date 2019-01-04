//Get "Game Type" from dataset "data-game-type" in HTML
var buttons = document.querySelectorAll("button");
for(var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function(event){
    loadGameForm(event.target.dataset.gameType);
  };
};

//Sen game-type to getGame F and establish callback function
function loadGameForm(gameType){
  getGame(gameType, function(game){
      buildForm(game.id, game.customizations);
  });

};

//Get customizable propieties for each game from JSON
//Callback gives data (game id / customiz-prop) form JSON and send it to buildForm F
function getGame(gameId, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/games/"+gameId);
    xhr.responseType = "json";
    xhr.onload = function(){
        callback(xhr.response);
    };
    xhr.send();
};

//Add actions to FORM with game information from JSON and send F
function buildForm(gameId, customizations){
  var gameForm      = document.getElementById("game-form");
  //"onsubmit" executes a JavaScript when a form is submitted
  // this form will execute
  gameForm.onsubmit = function () {
    var gift        = newCustomizedGift(gameId, customizations);
    postGift(gift, function (response) {
      // window.location.href = "gifts/" + customizations.id
    });
  };

  gameForm.innerHTML = "";
  for(var i = 0; i < customizations.length; i++) {

    var customization = customizations[i];
    addCustomizationWidget(customization);

  }
  var submit = document.createElement("INPUT");
  submit.type ="submit";
  submit.value = "Customize!";
  gameForm.appendChild(submit);
};



function newCustomizedGift(gameId, customizationList){

  event.stopPropagation();
  event.preventDefault();
  var form = document.getElementById("game-form");
  var customizations = {};

  for(var i = 0; i < customizationList.length; i++) {
    var name = customizationList[i].name;
    var value = form.elements[name].value;
    customizations[name] = value;
  }

  var gift = {
    "game": {
      "id": gameId,
      "customizations": customizations
    }
  };

  return gift;

};

function postGift(gift, callback) {

    var gift = {nose: JSON.stringify(gift)};

    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.post("/gifts/", gift, function(data){
      window.location.href = data.url
    });
};

function addCustomizationWidget(customization) {

  var type = customization.type;
  var selector = '#form-template [data-type="'+type+'"]';
  var template = document.querySelector(selector).cloneNode(true);
  var descriptionParagraph = template.querySelector("p:first-of-type");

  descriptionParagraph.textContent = customization.description;
  completeTemplate(type, template, customization);
  document.getElementById("game-form").appendChild(template);

};

function completeTemplate(type, template, customization){
  widgetByType[type](template, customization);
};

var widgetByType = {

  "text": function(template, customization){
    var input = template.querySelector("input");
    input.value = customization.default;
    input.name = customization.name;
    input.style.display="inline-block";
  },

  "graphic": function(template, customization){
    var list = template.querySelector("ul");
    for(var i = 0; i < customization.options.length; i++) {
      var option=customization.options[i];

      var li = document.createElement('LI');

      var label = document.createElement("LABEL");
      label.style.display="inline-block";
      label.style.width="60px";
      label.style.height="40px";
      label.style.backgroundImage='url("'+option+'")';
      label.style.backgroundSize = "contain";
      label.style.backgroundRepeat = "no-repeat";

      var radio = document.createElement("INPUT");
      radio.type = "radio";
      radio.value = option;
      radio.name = customization.name;

      li.appendChild(label);
      label.appendChild(radio);
      list.appendChild(li);
    }
  },

  "color": function(template, customization){
    var list = template.querySelector("ul");
    for(var i = 0; i < customization.options.length; i++) {
      var option=customization.options[i];

      var li = document.createElement('LI');

      var label = document.createElement("LABEL");
      label.style.display="inline-block";
      label.style.width="100px";
      label.style.height="100px";
      label.style.backgroundColor=option;

      var radio = document.createElement("INPUT");
      radio.type = "radio";
      radio.value = option;
      radio.name = customization.name;

      li.appendChild(label);
      label.appendChild(radio);
      list.appendChild(li);
    }

  }

};
