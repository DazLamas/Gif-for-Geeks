function newSimpleGame2() {

    return {

        // Define the 3 default Phaser functions:

        // This function will be executed at the beginning
        // That's where we load the game's assets
        preload: function() {

            game.load.image('gameover', '/assets/game_over2.png');


        },

        // Set up the game, display sprites, etc.
        create: function() {

            // we have to start the physics system running, and then for every
            // sprite or Group that we wish to use physics on we enable them
            // Once done the sprites gain a new body property, which is an instance of
            // ArcadePhysics.Body. This represents the sprite as a physical body in Phasers Arcade Physics engine.
            game.physics.startSystem(Phaser.Physics.ARCADE);


            // MAP ----------
            game.stage.backgroundColor = "#ff0000";
            // game.world.setBounds(0, 0, 800, 2000);


            // PLAYER -------
            // to use the player everywhere in our state, we need to use the this keyword:
            this.player = game.add.sprite(200, 0, 'player');

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


            // YELLOWS -------
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


            // GREENS -------
            greens = game.add.group();
            greens.enableBody = true;

            // Create green squares to collect
            for (var i = 0; i < 5; i++)
            {
                //  Create a green inside of the 'greens' group
                var green = greens.create(Math.random() * 800, Math.random() * 500, 'green');
                // game.physics.arcade.enable(green);
            }


            // SCORE ---&--- TIMER ---- & ---- LIFES
            scoreText = game.add.text(16, 16, customization.score+" " + score, { fontSize: '32px', fill: '#000' });
            lifeText = game.add.text(16, 40, customization.lifes+" " + life, { fontSize: '32px', fill: '#000' });
            // this.timer = game.add.bitmapText(250, 250, '00:00:00', textStyle);

            // Calling createWorld function defined bellow
            this.createWorld();
        },

        update: function() {
            // This function is called 60 times per second

            // Tell Phaser that the player and the platform should collide.
            // This works because we previously enabled Arcade physics for both the player
            // and the platform. Add the collisions at the beginning of the update function
            game.physics.arcade.collide(this.player, this.platform, this.killPlayer, null, this);

            game.physics.arcade.collide(springs, this.platform);

            game.physics.arcade.collide(springs, springs);

            game.physics.arcade.collide(this.player, springs, this.doubleJump, null, this);

            game.physics.arcade.overlap(this.player, greens, this.collectGreens, null, this);
            // Calling movePlayer function
            this.movePlayer();

            // //Calling a different function to update the timer just cleans up the update loop if you have other code.
            // this.updateTimer();

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
            scoreText.text = customization.score+" " + score;
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

        // updateTimer: function() {

        //     minutes = Math.floor(game.time.time / 60000) % 60;

        //     seconds = Math.floor(game.time.time / 1000) % 60;

        //     milliseconds = Math.floor(game.time.time) % 100;

        //     //If any of the digits becomes a single digit number, pad it with a zero
        //     if (milliseconds < 10)
        //         milliseconds = '0' + milliseconds;

        //     if (seconds < 10)
        //         seconds = '0' + seconds;

        //     if (minutes < 10)
        //         minutes = '0' + minutes;

        //     this.timer.setText(minutes + ':'+ seconds + ':' + milliseconds);

        // },

        killPlayer: function (){

            if (life > 0) {
                life -= 1;
                lifeText.text = customization.lifes+" " + life;
                this.player.position.x = 200;
                this.player.position.y = 0;
            }

            else {
                life = 3;
                score = 0;
                this.player.kill()
                game.state.start('main');
            };

        },

    };
}