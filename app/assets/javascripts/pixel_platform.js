function getGift(giftId, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/gifts/"+giftId);
    xhr.responseType = "json";
    xhr.onload = function(){
        callback(xhr.response);
    };
    xhr.send();
}

// Create a 500px by 340px game in the 'pixel_platform_Div' element of the index.html
// renderer: how to render the game, Phaser.AUTO automatically choose the best
//option between webGL and canvas
var game        = new Phaser.Game(1200, 480, Phaser.AUTO, 'pixel_platform_Div');

var score       = 0;
var life        = 3;

var allGames = {

    "1": newSimpleGame,
    "2": newSimpleGame2

};


function getCustomizationAndStart() {
    var hashTokens = window.location.pathname.split('/');
    var giftId = parseInt(hashTokens[hashTokens.length - 1], 10) || 1;
    getGift(giftId, function(gift){
        var gameState = allGames[gift.game.id];
        var mainState = gameState(gift.game.customizations);
        // Add the 'mainState' to Phaser, called 'main', and start the state
        game.state.add('main', mainState);
        game.state.start('main');
    });
};


getCustomizationAndStart();








