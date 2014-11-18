


// New game inherit from haser.js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');
game.state.add('paco', States.LevelExample);
game.state.start('paco');