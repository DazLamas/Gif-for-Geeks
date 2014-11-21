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

        game.load.image('wallV', 'assets/wallVertical.png');

        game.load.image('spring', 'assets/gift.png');


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

        // CURSORS --------

        // Enable arrow-keys to move player.That are all instances of Phaser.Key objects
        this.cursor = game.input.keyboard.createCursorKeys();



        // SPRINGS -------

        springs = game.add.group();
        springs.enableBody = true;

       // Create 12 springs spaced apart
        for (var i = 0; i < 5; i++)
        {
            //  Create a spring inside of the 'springs' group
            var spring = springs.create(i * 100, i * 100, 'spring');

            //  Let gravity do its thing
            spring.body.gravity.y = 6;
            spring.body.gravity.x = 6;

            //  This just gives each spring a slightly random bounce value
            spring.body.bounce.y = 0.7 + Math.random() * 2;
            spring.body.bounce.x = 0.7 + Math.random() * 0.1;
        }

        // Calling createWorld function defined bellow
        this.createWorld();
    },

    update: function() {
        //This function is called 60 times per second

        // Tell Phaser that the player and the platform should collide.
        // This works because we previously enabled Arcade physics for both the player
        // and the platform. Add the collisions at the beginning of the update function
        game.physics.arcade.collide(this.player, this.platform);

        game.physics.arcade.collide(springs, this.platform);

// ------ esto es -------
        // Check if player overlaps springs and send info to collectspring function
        // game.physics.arcade.overlap(this.player, springs, this.collectspring, null, this);
// ------ esto es -------
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

        // Create and add ground to platform group
        floor = game.add.sprite(0, 470, 'wallH', 0, this.platform); // Floor
        floor.scale.setTo(6, 1);
        leftWall = game.add.sprite(-20, 0, 'wallV', 0, this.platform); // Left
        leftWall.scale.setTo(1, 2);
        rightWall = game.add.sprite(1200, 0, 'wallV', 0, this.platform); // Right
        rightWall.scale.setTo(1, 2);
        topW = game.add.sprite(0, -20, 'wallH', 0, this.platform); // Top
        topW.scale.setTo(6, 1);

        //Set all the platform to be immovable
        this.platform.setAll('body.immovable', true);
    },

//-------------esto es -------
    // collectspring: function (player, spring) {

    //  // Removes the yellow from the screen
    //     spring.kill();

    // }
};


// Add the 'mainState' to Phaser, called 'main', and start the state
game.state.add('main', mainState);
game.state.start('main');