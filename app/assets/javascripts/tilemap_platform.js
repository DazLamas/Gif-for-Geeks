// Create a 500px by 340px game in the 'pixel_platform_Div' element of the index.html
// renderer: how to render the game, Phaser.AUTO automatically choose the best
//option between webGL and canvas
var game = new Phaser.Game(1200, 480, Phaser.AUTO, 'pixel_platform_Div');

// create only state 'mainState'
var mainState = {

// Define the 3 default Phaser functions:

    // This function will be executed at the beginning
     // That's where we load the game's assets
    preload: function() {

        //Player
        game.load.image('player', 'assets/player.png');

        //map JSON
        game.load.tilemap('mario_terrain_tilemap', 'assets/pixel_platform/mario_terrain_tilemap.json', null, Phaser.Tilemap.TILED_JSON)
        //tileset PNG
        game.load.image('mario_tileset', 'assets/pixel_platform/mario_tileset.png')


    },

    // Set up the game, display sprites, etc.
    create: function() {

        // MAP ----------

        game.stage.backgroundColor = '#3498db';
        map = game.add.tilemap('mario_terrain_tilemap');
        map.addTilesetImage('mario_tileset', 'mario_tileset');//('1') spritesheet/tileset name inside of Tiled Map Editor. ('2') key in preload function
        layer = map.createLayer('terrain');//'terrain' is the name of a layer inside of Tiled Map Editor
        layer.wrap = true;

        // PLAYER -------

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // This one will add our player at the center of the screen
        // to use the player everywhere in our state, we need to use the this keyword:
        this.player = game.add.sprite(250, 170, 'player');
        // set the anchor point to the middle of the sprite
        this.player.anchor.setTo(0.5, 0.5);
        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);
        // Add vertical gravity to the player, it will allow to use "body" property to:
        this.player.body.gravity.y = 500;

        // Enable arrow-keys to move player.
        this.cursor = game.input.keyboard.createCursorKeys();

        // Calling createWorld function defined bellow
        // this.createWorld();

        // COLLISION
        map.setCollisionBetween(0, 277, true, this.currentLayer);
        game.physics.arcade.collide(this.player, layer);
        this.layer.enableBody = true;
    },

    update: function() {
        // This function is called 60 times per second

        // Tell Phaser that the player and the walls should collide.
        // This works because we previously enabled Arcade physics for both the player
        //and the walls. Add the collisions at the beginning of the update function


        // Calling movePlayer function
        this.movePlayer();

    },

    movePlayer: function() {
    // If the left arrow key is pressed
        if (this.cursor.left.isDown) {
            // Move the player to the left
            this.player.body.velocity.x = -200;
       }

       // If the right arrow key is pressed
       else if (this.cursor.right.isDown) {
           // Move the player to the right
           this.player.body.velocity.x = 200;
       }

       // If neither the right or left arrow key is pressed
       else {
           // Stop the player
           this.player.body.velocity.x = 0;
       }

       // If the up arrow key is pressed and the player is touching the ground
       if (this.cursor.up.isDown && this.player.body.touching.down) {
           // Move the player upward (jump)
           this.player.body.velocity.y = -320;
       }
    },

    // createWorld: function() {

    //     // Create wall group
    //     this.walls = game.add.group();
    //     // Add Arcade physics to the wall
    //     this.walls.enableBody = true;

    //     // Create the 10 walls
    //     game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
    //     game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right

    //     game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
    //     game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
    //     game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
    //     game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right

    //     game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
    //     game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right

    //     var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
    //     middleTop.scale.setTo(1.5, 1);
    //     var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
    //     middleBottom.scale.setTo(1.5, 1);

    //     //Set all the walls to be immovable
    //     this.walls.setAll('body.immovable', true);
    // },
};


// Add the 'mainState' to Phaser, called 'main', and start the state
game.state.add('main', mainState);
game.state.start('main');