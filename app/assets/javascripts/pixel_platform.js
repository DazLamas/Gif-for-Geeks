// Create a 500px by 340px game in the 'pixel_platform_Div' element of the index.html
// renderer: how to render the game, Phaser.AUTO automatically choose the best
//option between webGL and canvas
var game = new Phaser.Game(1200, 480, Phaser.AUTO, 'pixel_platform_Div');

var score = 0;

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

        game.load.image('green', 'assets/green.png');


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

       // Create 20 springs spaced apart
        for (var i = 0; i < 20; i++)
        {
            //  Create a spring inside of the 'springs' group
            var spring = springs.create(Math.random() * 800, Math.random() * 500, 'spring');

            //  This just gives each spring a slightly random bounce value
            spring.body.bounce.y = 0.7;
            spring.body.bounce.x = 0.7;

            spring.body.collideWorldBounds = true; //malditos límites
            game.physics.arcade.enable(spring);
        }

        greens = game.add.group();
        greens.enableBody = true;

        // GREENS -------

        // Create green squares to collect
        for (var i = 0; i < 5; i++)
        {
            //  Create a green inside of the 'greens' group
            var green = greens.create(Math.random() * 800, Math.random() * 500, 'green');
            // game.physics.arcade.enable(green);
        }

        // Calling createWorld function defined bellow
        this.createWorld();

        // SCORE -----
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    },

    update: function() {
        //This function is called 60 times per second

        // Tell Phaser that the player and the platform should collide.
        // This works because we previously enabled Arcade physics for both the player
        // and the platform. Add the collisions at the beginning of the update function
        game.physics.arcade.collide(this.player, this.platform);

        game.physics.arcade.collide(springs, this.platform);

        game.physics.arcade.collide(springs, springs);

        game.physics.arcade.collide(this.player, springs, this.doubleJump, null, this);

        game.physics.arcade.overlap(this.player, greens, this.collectGreens, null, this);
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

    collectGreens: function(player, green) {
        green.kill()

        score += 10;
        scoreText.text = 'Score: ' + score;
    },

    createWorld: function() {

        // Create wall group
        this.platform = game.add.group();
        // Add Arcade physics to the wall. This permit player to collide with the flour
        this.platform.enableBody = true;

        // Create and add ground to platform group
        floor = game.add.sprite(0, 470, 'wallH', 0, this.platform); // Floor
        floor.scale.setTo(6, 1);

        //Set all the platform to be immovable
        this.platform.setAll('body.immovable', true);
    },

    doubleJump: function (player, spring) {

         this.player.body.velocity.y = -400

    },

};


// Add the 'mainState' to Phaser, called 'main', and start the state
game.state.add('main', mainState);
game.state.start('main');