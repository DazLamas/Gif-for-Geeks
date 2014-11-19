// Create a 500px by 340px game in the 'gameDiv' element of the index.html
// renderer: how to render the game, Phaser.AUTO automatically choose the best
//option between webGL and canvas
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

// create only state 'mainState'
var mainState = {

// Define the 3 default Phaser functions:

    // This function will be executed at the beginning
     // That's where we load the game's assets
    preload: function() {

        game.load.image('player', 'tilemaps/sprites/player.png');
    },

    // Set up the game, display sprites, etc.
    create: function() {
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.add.sprite(positionX, positionY, imageName). This one will add
        // our player at the center of the screen
        // to use the player everywhere in our state, we need to use the this keyword:
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        // set the anchor point to the middle of the sprite
        this.player.anchor.setTo(0.5, 0.5);

        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);

        // Add vertical gravity to the player, it will allow to use "body" property to:
        this.player.body.gravity.y = 500;

        // Enable arrow-keys to move player.
        this.cursor = game.input.keyboard.createCursorKeys();

    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        // Call movePlayer
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
};

// mainState.preload();
// mainState.create();
// mainState.update();

// Add the 'mainState' to Phaser, called 'main', and start the state
game.state.add('main', mainState);
game.state.start('main');