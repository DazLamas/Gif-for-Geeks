


// New game inherit from phaser.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');
game.state.add('level1', States.LevelExample);
game.state.start('level1');