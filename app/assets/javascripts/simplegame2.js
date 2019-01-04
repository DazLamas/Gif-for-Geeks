function newSimpleGame2() {

    return {

        preload: function() {

            game.load.image('gameover', '/assets/game_over2.png');

        },

        create: function() {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            // MAP
            game.stage.backgroundColor = "#ff0000";

            // PLAYER
            this.player = game.add.sprite(200, 0, 'player');

            this.player.anchor.setTo(0.5, 0.5); //anchor point

            // Tell Phaser that the player will use the Arcade physics engine
            game.physics.arcade.enable(this.player);
            // Add vertical gravity to the player, it will allow to use "body" property to:
            this.player.body.gravity.y = 500;
            this.player.body.bounce.y = 0.2; //bote
            this.player.body.collideWorldBounds = true;


            // CURSOR
            // Enable arrow-keys to move player (instances of Phaser.Key objects)
            this.cursor = game.input.keyboard.createCursorKeys();


            // YELLOWS
            springs = game.add.group();
            springs.enableBody = true;

            // Create 20 springs spaced apart
            for (var i = 0; i < 20; i++)
            {
                var spring = springs.create(Math.random() * 800, Math.random() * 500, 'spring');

                spring.body.bounce.y = 0.7;
                spring.body.bounce.x = 0.7;

                spring.body.collideWorldBounds = true;
                game.physics.arcade.enable(spring);
            };


            // GREENS
            greens = game.add.group();
            greens.enableBody = true;

            for (var i = 0; i < 5; i++) {
                var green = greens.create(Math.random() * 800, Math.random() * 500, 'green');
            };

            // SCORE ---&--- TIMER ---- & ---- LIFES
            scoreText = game.add.text(16, 16, customization.score+" " + score, { fontSize: '32px', fill: '#000' });
            lifeText = game.add.text(16, 40, customization.lifes+" " + life, { fontSize: '32px', fill: '#000' });

            this.createWorld();
        },

        update: function() {

            game.physics.arcade.collide(this.player, this.platform, this.killPlayer, null, this);

            game.physics.arcade.collide(springs, this.platform);

            game.physics.arcade.collide(springs, springs);

            game.physics.arcade.collide(this.player, springs, this.doubleJump, null, this);

            game.physics.arcade.overlap(this.player, greens, this.collectGreens, null, this);

            this.movePlayer();

        },

        movePlayer: function() {

            if (this.cursor.left.isDown) {
              this.player.body.velocity.x = -200;
           } else if (this.cursor.right.isDown) {
              this.player.body.velocity.x = 200;
           } else {
               // Stop the player
              this.player.body.velocity.x = 0;
           }

           if (this.cursor.up.isDown && this.player.body.touching.down) {
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
            // Add Arcade physics to the wall. This permit player to collide with the floor
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
