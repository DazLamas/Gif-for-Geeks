function newSimpleGame(customization) {

    return {

        preload: function() {

            game.load.image('player', '/'+customization.player);

            game.load.image('wallH', '/assets/wallHorizontal.png');

            game.load.image('spring', '/'+customization.spring);

            game.load.image('green', '/'+customization.point);


        },

        // Set up the game, display sprites, etc.
        create: function() {

            // Start physics
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // MAP
            game.stage.backgroundColor = customization.bg;

            // PLAYER
            this.player = game.add.sprite(200, 0, 'player');

            this.player.anchor.setTo(0.5, 0.5);

            game.physics.arcade.enable(this.player);
            // Add vertical gravity to the player, it will allow to use "body" property to:
            this.player.body.gravity.y = 500;
            this.player.body.bounce.y = 0.2; //bote
            this.player.body.collideWorldBounds = true;

            // CURSORS
            this.cursor = game.input.keyboard.createCursorKeys();

            // YELLOWS
            springs = game.add.group();
            springs.enableBody = true;


            for (var i = 0; i < 20; i++) {
                var spring = springs.create(Math.random() * 800, Math.random() * 500, 'spring');

                //  This just gives each spring a slightly random bounce value
                spring.body.bounce.y = 0.7;
                spring.body.bounce.x = 0.7;

                spring.body.collideWorldBounds = true;
                game.physics.arcade.enable(spring);
            }


            // GREENS
            greens = game.add.group();
            greens.enableBody = true;


            for (var i = 0; i < 10; i++) {
                var green = greens.create(Math.random() * 900, Math.random() * 350, 'green');
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
           }

           else if (this.cursor.right.isDown) {
               this.player.body.velocity.x = 200;
           }

           else {
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

            this.platform = game.add.group();
            this.platform.enableBody = true;
            floor = game.add.sprite(0, 470, 'wallH', 0, this.platform);
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
