// New game inherit from phaser.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'platform-game-div');
game.state.add('level1', States.Level01);
game.state.start('level1');