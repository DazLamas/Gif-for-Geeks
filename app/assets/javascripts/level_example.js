var States = States || {};

States.LevelExample = function (game) {

};

//clase de js
States.LevelExample.prototype.preload = function () {
    var game = this.game;
    //Load the tilemap file
    game.load.tilemap('test_map', 'tilemaps/maps/mario_bros.json', null, Phaser.Tilemap.TILED_JSON);
    //Load the spritesheet for the tilemap
    game.load.image('mario_bros', 'tilemaps/tiles/mario_bros.png');
    //Load the player
    // game.load.image('player', 'tilemaps/sprites/phaser-dude.png');
    game.load.image('player', 'tilemaps/sprites/phaser-dude.png');

};

States.LevelExample.prototype.create = function () {


    var game = this.game;
    game.width = 1000;
    game.height = 600;
    // alert(game.world_definedSize)

    game.stage.backgroundColor = '#787878';
    // var map = new Tilemap.create(game, 'test_map', 1200, 1000);
    var map = game.add.tilemap('test_map', 30, 40);

    //'mario_bros' is the name of the spritesheet inside of Tiled Map Editor
    map.addTilesetImage('mario_bros', 'mario_bros');

    //'terrain' is the name of a layer inside of Tiled Map Editor
    var layer = map.createLayer('Terrain');

    // map.setCollisonBetween(1, 800, true, 'Terrain')
    // Sets the world size to match the size of this layer
    layer.resizeWorld();
    layer.wrap = true;

    this.cursors = game.input.keyboard.createCursorKeys();

    //Add player
    game.player = game.add.sprite(50, 530, 'player');
    game.player.health = 50;   // simple as that really.
    game.player.scale.x = 0.2; // set the size/scale of the width
    game.player.scale.y = 0.2; // same for the height of the player

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(game.player, Phaser.Physics.ARCADE);

    game.world.bounds.setTo(0, 0, 50, 50);
    game.player.collideWorldBounds = true;
};

States.LevelExample.prototype.update = function () {
    var cursors = this.cursors;
    var game = this.game;

    if (cursors.left.isDown)
    {
     //   game.camera.x += 8;
        game.player.position.x -= 8;
    }
    else if (cursors.right.isDown)
    {
       // game.camera.x -= 8;
         game.player.position.x += 8;
    }

    if (cursors.up.isDown)
    {
       // game.camera.y += 8;
         game.player.position.y -= 8;
    }
    else if (cursors.down.isDown)
    {
     //   game.camera.y -= 8;
         game.player.position.y += 8;
    }
}