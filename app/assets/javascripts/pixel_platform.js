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

        game.load.image('player', 'assets/player.png');

        game.load.image('wallH', 'assets/wallHorizontal.png');

        game.load.image('gift', 'assets/gift.png');


    },

    // Set up the game, display sprites, etc.
    create: function() {

        // we have to start the physics system running, and then for every
        // sprite or Group that we wish to use physics on we enable them
        // Once done the sprites gain a new body property, which is an instance of
        // ArcadePhysics.Body. This represents the sprite as a physical body in Phasers Arcade Physics engine.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // MAP ----------

        game.stage.backgroundColor = '#3498db';

        // PLAYER -------

        // to use the player everywhere in our state, we need to use the this keyword:
        this.player = game.add.sprite(250, 170, 'player');

        this.player.anchor.setTo(0.5, 0.5); //anchor point

        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);
        // Add vertical gravity to the player, it will allow to use "body" property to:
        this.player.body.gravity.y = 500;
        this.player.body.bounce.y = 0.2; //bote
        this.player.body.collideWorldBounds = true; //malditos límites

        // --------

        // Enable arrow-keys to move player.That are all instances of Phaser.Key objects
        this.cursor = game.input.keyboard.createCursorKeys();

        // Calling createWorld function defined bellow
        this.createWorld();

        //GIFT -------
        gifts = game.add.group();

        gifts.enableBody = true;

       // Create 12 gifts spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var gift = gifts.create(i * 70, 0, 'gift');

            //  Let gravity do its thing
            gift.body.gravity.y = 6;

            //  This just gives each gift a slightly random bounce value
            gift.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    },

    update: function() {
        //This function is called 60 times per second

        // Tell Phaser that the player and the platform should collide.
        // This works because we previously enabled Arcade physics for both the player
        // and the platform. Add the collisions at the beginning of the update function
        game.physics.arcade.collide(this.player, this.platform);

        game.physics.arcade.collide(gifts, this.platform);

        // Check if player overlaps gifts and send info to collectGift function
        game.physics.arcade.overlap(this.player, gifts, this.collectGift, null, this);

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

    createWorld: function() {

        // Create wall group
        this.platform = game.add.group();
        // Add Arcade physics to the wall. This permit player to collide with the flour
        this.platform.enableBody = true;

        // Create the 10 platform
        // game.add.sprite(0, 0, 'wallV', 0, this.platform); // Left
        // game.add.sprite(480, 0, 'wallV', 0, this.platform); // Right

        floor = game.add.sprite(0, 470, 'wallH', 0, this.platform); // Top left
        floor.scale.setTo(6, 1);
        // game.add.sprite(300, 0, 'wallH', 0, this.platform); // Top right
        // game.add.sprite(0, 320, 'wallH', 0, this.platform); // Bottom left
        // game.add.sprite(300, 320, 'wallH', 0, this.platform); // Bottom right

        // game.add.sprite(-100, 160, 'wallH', 0, this.platform); // Middle left
        // game.add.sprite(400, 160, 'wallH', 0, this.platform); // Middle right

        // var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.platform);
        // middleTop.scale.setTo(1.5, 1);
        // var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.platform);
        // middleBottom.scale.setTo(1.5, 1);

        //Set all the platform to be immovable
        this.platform.setAll('body.immovable', true);
    },

    collectGift: function (player, gift) {

     // Removes the star from the screen
        gift.kill();

    }
};


// Add the 'mainState' to Phaser, called 'main', and start the state
game.state.add('main', mainState);
game.state.start('main');